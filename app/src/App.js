import React ,{useEffect,useState} from 'react'
import './App.css'
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts'
// Change 3
function App(socket) {
  const [data,setData] = useState("")
  const [width,setWidth] =useState(800) 

  useEffect(()=>{
    socket.socket.on("message",(data)=>{
      setData(data)
    })
  },[]) // remove the data
  useEffect(() => {
    setWidth(width+100)
  },[data])
  return (
    <div className="App">
      <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
          {/* <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} /> */}
    </LineChart>
    </div>
  );
}

export default App;

// export default class App extends React.Component {
//   const [data,setData] = useState("")
//   useEffect(()=>{
//     const socket = socketIOClient("http://127.0.0.1:4000/")
//     socket.on("message",(data)=>{
//       setData(data)
//       this.render()
//     })
//   },[])
//   render(){
//     return (
//       <div className="App">
//         <LineChart
//               width={800}
//               height={400}
//               data={data}
//               margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//         >
//             <XAxis dataKey="name" />
//             <Tooltip />
//             <CartesianGrid stroke="#f5f5f5" />
//             <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
//             <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
//       </LineChart>
//       </div>
//     );

//   }
// }