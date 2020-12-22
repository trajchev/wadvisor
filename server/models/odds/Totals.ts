import Sequilize from 'sequelize';
import { sequelize } from '../../utils/database';

class Total extends Sequilize.Model {}

Total.init(
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    position_over: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    position_under: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    odds_home: {
      type: Sequilize.DOUBLE(10, 2),
      allowNull: false,
    },
    odds_away: {
      type: Sequilize.DOUBLE(10, 2),
      allowNull: false,
    },
    points_home: {
      type: Sequilize.DOUBLE(10, 2),
      allowNull: false,
    },
    points_away: {
      type: Sequilize.DOUBLE(10, 2),
      allowNull: false,
    },
    match_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    },
    site_id: {
      type: Sequilize.INTEGER,
      allowNull: false
    }
  },
{underscored: true, sequelize, modelName: 'total'});

export default Total;
