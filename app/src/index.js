import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import socketIOClient from 'socket.io-client'
import SideParams from './components/SideParams';
const root = ReactDOM.createRoot(document.getElementById('root'));
// Change 1
const  socket = socketIOClient("http://127.0.0.1:4000/")
root.render(
  <React.StrictMode>
    {/* Change 2 */}
    <SideParams  socket={socket}/>
    <App socket={socket}  />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
