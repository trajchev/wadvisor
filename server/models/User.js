const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Sequilize = require('sequelize');

const BAError = require('../utils/BAError');
const sequelize = require('../utils/database');

class User extends Sequilize.Model {}

User.init({
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: {
                    args: [[4, 24]],
                    msg: 'The username must be between 4 and 24 characters long'
                }
            }
        },
        stripe_customer_id: {
            type: Sequilize.STRING
        },
        stripe_subscription_id: {
            type: Sequilize.STRING
        },
        current_period_end: {
            type: Sequilize.INTEGER
        },
        price_id: {
            type: Sequilize.STRING
        },
        price_object: {
            type: Sequilize.STRING
        },
        last_four: {
            type: Sequilize.STRING
        },
        email: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255]
            },
            set(val) {
                this.setDataValue('email', val.toLowerCase())
            }
        },
        photo: {
            type: Sequilize.STRING,
            defaultValue: 'image.jpeg'
        },
        role: {
            type: Sequilize.ENUM,
            allowNull: false,
            values: ['unconfirmed', 'beginner', 'pro', 'admin'],
            defaultValue: 'unconfirmed'
        },
        password: {
            type: Sequilize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [[8, 255]],
                    msg: 'Password must be between 8 and 255 characters long'
                }
            }
        },
        recruits: {
            type: Sequilize.INTEGER
        },
        recruiter_id: {
            type: Sequilize.INTEGER
        },
        passwordConfirm: {
            type: Sequilize.STRING
        },
        passwordResetToken: {
            type: Sequilize.STRING
        },
        passwordResetExpires: {
            type: Sequilize.DATE
        },
        userConfirmToken: {
            type: Sequilize.STRING,
        },
        active: {
            type: Sequilize.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true,
        sequelize,
        modelName: 'user'
    }
);

User.addHook('beforeSave', async (user, options) => {

    if (user.password === user.passwordConfirm) {
        user.password = await bcrypt.hash(user.password, 10);
        user.passwordConfirm = true;
    } else {
        return new BAError('Password and password confirm do not match', 401);
    }

});

User.addHook('beforeSave', async function(user, options) {

    const confirmationToken = crypto.randomBytes(32).toString('hex');
    this.userConfirmToken = crypto.createHash('sha256').update(confirmationToken).digest('hex');
    user.userConfirmToken = confirmationToken;

});

User.addHook('beforeSave', user => {

    user.passwordChangedAt = Date.now() - 1000;

});

User.prototype.correctPassword = async (candidatePass, userPass) => {
    return await bcrypt.compare(candidatePass, userPass);
}

User.prototype.changedPassAfter = function(JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // Not changed
    return false;
}

User.prototype.createPasswordResetToken = function() {

    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + process.env.PASSWORD_RESET_EXPIRES_IN * 1;
    return resetToken;

}

module.exports = User;
