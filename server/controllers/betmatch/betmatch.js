const { BetMatch } = require('../../models');
const { create, update, remove } = require('../../services');

const betmatch = create.createBetMatch(BetMatch);
const removeBetmatch = remove.remove(BetMatch);
const updateTip = update.update(BetMatch);

module.exports = {

    betmatch,
    removeBetmatch,
    updateTip

}
