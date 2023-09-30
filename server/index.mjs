
import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'
import axios from 'axios'

const PORT = 4000

const app = express()
const httpServer = http.createServer(app)

const server = new socketio.Server(httpServer,{
    cors: {
        origin: '*'
    }
})
let timeChange
const data = []
// const data = [
//     { name: 1, x:Math.random() *10 ,y:Math.random()*10 },
//     { name :2, x:Math.random() *10 ,y:Math.random()*10},
//     { name :3, x:Math.random() *10 ,y:Math.random()*10},
//     { name :4, x:Math.random() *10 ,y:Math.random()*10},
//     { name :5, x:Math.random() *10 ,y:Math.random()*10},
//   ];
var u=1;
server.on("connection",(socket)=> {
    console.log("connected");
    if(timeChange) clearInterval(timeChange)
    // if(data.length > 5){
    //     data.reverse().pop()
    //     data.reverse()
    // }
    // data.push({name: data[data.length-1] +1, x:Math.random() *10 ,y:Math.random()*10})
    setInterval(async ()=>{
        let param=[[21.5,1017.3,76.0,7.0,12.0,31.0,5.0,7.0,0.0,2.0],[21.5,1000.3,70,0,17.0,1.0,27.0,5.0,17.0,0.0,5.0]]
    const [Temp,Pressure,Humidity,WindSpeed,WindDir,WindGustSpeed,WindGustDir,Cloud,Sunshine,Rainfall]=param[u]
        let result = await axios.post("http://localhost:8000/", 
        {
        Temp,
        Pressure,
        Humidity,
        WindSpeed ,
        WindDir,
        WindGustSpeed,
        WindGustDir,
        Cloud,
        Sunshine,
        Rainfall
    })
    console.log(result['data']);
    const p1=param[u]
    p1.push(result['data'].res[0]);
    p1.push(result['data'].res[1]);
    if (u==1)u=0;
    else u=1
    data.push({name: (new Date()).toLocaleTimeString(), x: result['data'].res[0]})
        socket.emit("message", data)
        socket.emit("values", p1)
    },5000)
})

httpServer.listen(PORT)