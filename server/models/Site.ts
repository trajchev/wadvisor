import Sequilize from 'sequelize';
import { sequelize } from '../utils/database';

class Site extends Sequilize.Model {}

Site.init(
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    },
    logo: {
      type: Sequilize.STRING
    },
    region: {
      type: Sequilize.STRING,
      defaultValue: 'uk'
    }
  }, {underscored: true, sequelize, modelName: 'site'}
);

export default Site;