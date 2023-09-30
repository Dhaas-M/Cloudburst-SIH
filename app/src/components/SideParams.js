import React, { useEffect, useState } from 'react'

export default function SideParams(socket) {
    const [value,setValue] = useState([])
    useEffect(()=>{
        socket.socket.on("values",(data)=>{
            setValue(data);
        })
    },[])
    // console.log(value);
  return (
    <>
    <div class="sidebar">
        <h2>Weather Parameters</h2>
        <ul>
            <li>Tmeperature: {value[0]}</li>
            <li>Pressure: {value[1]}</li>
            <li>Humidity: {value[2]}</li>
            <li>Pressure: {value[3]}</li>
            <li>WindSpeed: {value[4]}</li>
            <li>WindDirection: {value[5]}</li>
            <li>WindGustSpeed: {value[6]}</li>
            <li>WindGustDirection: {value[7]}</li>
            <li>Rainfall: {value[8]}</li>
            <li>Sunshine: {value[9]}</li>
            <li>DewPoint: {value[11]}</li>
            <li>CloudBrust Probality: {value[10]==1 ? value[10] :0}</li>
        </ul> 
    </div>
    </>
  )
}
