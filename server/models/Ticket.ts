import Sequilize from 'sequelize';
import { sequelize } from '../utils/database';

class Ticket extends Sequilize.Model {}

Ticket.init(
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequilize.STRING,
      defaultValue: Date.now().toString()
    },
    description: {
      type: Sequilize.STRING
    },
    user_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    }
  }, {sequelize, underscored: true, modelName: 'ticket'}
);

export default Ticket;
