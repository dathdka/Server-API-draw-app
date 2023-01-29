import cors from "cors"
import  express  from "express"
import http from "http"
import mongoose from "mongoose"
import 'dotenv/config'

var app = express();
app.use(express.json())
app.use(cors({origin: true}))
const server = http.createServer(app);
mongoose.set('strictQuery',true)
mongoose.connect(`${process.env.MONGO_LOCAL}`).then(()=>{
    server.listen(1245, () =>{
        console.log('server listening port 1245')
    })
})