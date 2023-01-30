import cors from "cors"
import  express  from "express"
import http from "http"
import mongoose from "mongoose"
import mysql from "mysql"
import 'dotenv/config'

var app = express();
app.use(express.json())
app.use(cors({origin: true}))
const server = http.createServer(app);

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'crawl'
})

connection.connect(() : void=>{
    server.listen(1245, () : void =>{
        connection.query(`create table test ( 
            id      int
            name    string 
            )`)
        console.log('server listening port 1246')
        return ;
    })
});
// mongoose.set('strictQuery',true)
// mongoose.connect(`${process.env.MONGO_LOCAL}`).then(()=>{
// })