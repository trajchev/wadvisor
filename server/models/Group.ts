import Sequilize from 'sequelize';
import { sequelize } from '../utils/database';

class Group extends Sequilize.Model {}

Group.init(
  {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    title: {
        type: Sequilize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
  }, {underscored: true, sequelize, modelName: 'group'}
);

export default Group;
