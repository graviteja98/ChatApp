
import './App.css';
import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')
function App() {
  const msgRef = useRef()
  const roomRef = useRef()
  const [name, setName] = useState(null)
  const [room, setRoom] = useState(null)
  const [msg, setMsg] = useState([])
  const Send =async  () => {
    console.log(msgRef.current.value)
   // setMsg((prev) => [...prev, msgRef.current.value])
  //  console.log(msg)
 
    const messageData = {
      room,
      name,
      message : msgRef.current.value,
      time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    setMsg((prev) => [...prev, messageData])
    await socket.emit('send_message',messageData)
    msgRef.current.value = ""
  }
  const joinRoom = () => {
   socket.emit('join_room', roomRef.current.value)
   setRoom(roomRef.current.value)
   roomRef.current.value=""
    console.log(`you joined ${roomRef.current.value}`)
  }

  useEffect(() => {
    socket.on('getID', (data) => {
      console.log('your ID is ', data)
      setName(data)
    })
    socket.on('roomName', (data)=>{
      console.log(data)
    })
    socket.on('receive_message', (data) =>{
      setMsg((prev) => [...prev, data])
    })
  }, [socket])
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
      <TextField inputRef={roomRef} sx={{mr : 5}}/>
        <Button variant="contained" onClick={joinRoom}>Join Room</Button>
      </Box>
      <Typography variant="body1">Welcome {name}</Typography>
      <Paper sx={{ p: 2, backgroundColor: '#eeaa', maxWidth : '60%' }}>
        <Typography variant="h6">you are chatting in {room}</Typography>
        <Container sx={{overflow : 'auto',backgroundColor : 'whitesmoke', minHeight : 500, maxHeight : 500}}>
        {msg.length == 0 ? <Box><Typography>No Messages</Typography></Box> : msg.map((m,i) => <Box key={i} sx={{backgroundColor : m.name==name ? "primary.main" : "success.main" , my:1, borderRadius : 2, p :2 , ml : m.name==name ? 10 : 0, mr : m.name!==name ? 10 : 0 , color : 'white'}}><Typography variant='body1'>{m.message}</Typography>
        <Typography color="black" variant='subtitle2' fontWeight={600}>{m.time}</Typography></Box>)}
        </Container>
        
        <TextField fullWidth inputRef={msgRef} sx={{backgroundColor : 'white',my:2}} />
        <Button variant="contained" onKeyPress={(event)=>{event.key == "Enter" && Send()}} onClick={Send}>Send</Button>
      </Paper>
    </>
  );
}

export default App;
