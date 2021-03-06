import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:pass123@db:5432/test-rio')

export { sequelize as db }