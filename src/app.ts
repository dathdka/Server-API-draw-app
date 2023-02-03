import cors from "cors"
import  express  from "express"
import http from "http"
import dbconfig from './dbConfig/config'
import router from './routes/router'
import redis from 'redis'
import 'dotenv/config'


var app = express();
app.use(express.json())
app.use(cors({origin: true}))
app.use('/home', router)
const server = http.createServer(app);
  
dbconfig.sync().then(()=>{
    console.log('DB synced successfully') 
    server.listen(1245, () : void =>{ 
        console.log('server listening port 1245') 
    })
}).catch((err : Error) =>{
    throw err 
})
