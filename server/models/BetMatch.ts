import Sequilize from 'sequelize';
import { sequelize } from '../utils/database';

class BetMatch extends Sequilize.Model {}

BetMatch.init(
  {
    user_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    ticket_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    match_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    tip: {
      type: Sequilize.STRING(5),
    }
  },
  {sequelize, underscored: true, modelName: 'betmatch'}
);

export default BetMatch;
