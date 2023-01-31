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
    host: '127.0.0.1',
    database: 'crawl',
    user: `${process.env.MYSQL_USERNAME}`,
    password : `${process.env.MYSQL_PASSWORD}`
})
try{
    connection.connect(() : void=>{
        server.listen(1245, () : void =>{
            connection.query(`select * from test`,(err : Error,result : Array<object> ) =>{
                console.log(result)
            })
            console.log('server listening port 1245')
            return ;
        })
    });

}catch(err){
    console.log(err)
}
// mongoose.set('strictQuery',true)
// mongoose.connect(`${process.env.MONGO_LOCAL}`).then(()=>{
// })