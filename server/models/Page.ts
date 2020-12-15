import Sequilize from 'sequelize';
import { sequelize } from '../utils/database';

class Page extends Sequilize.Model {}

Page.init(
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    slug: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: Sequilize.TEXT
    },
    user_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
    }
  }, {underscored: true, sequelize, modelName: 'page'}
);

export default Page;
