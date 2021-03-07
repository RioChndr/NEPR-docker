import { Sequelize, Model, DataTypes, UUIDV4 } from 'sequelize'
import { db } from '../database'


class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  sequelize: db,
  modelName: 'user'
});


(async () => {
  await db.sync({ force: true })
})()

export { User }