import { Sequelize } from 'sequelize-typescript'
import { items } from '../models/items'
import 'dotenv/config'
const connection = new Sequelize ({
    dialect : 'mysql',
    host: '127.0.0.1',
    username: `${process.env.MYSQL_USERNAME}`,
    password : `${process.env.MYSQL_PASSWORD}`,
    database : 'crawl',
    logging : false,
    models: [items]
})

export default connection