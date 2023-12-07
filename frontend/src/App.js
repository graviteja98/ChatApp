
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
  const Send = () => {
    console.log(msgRef.current.value)
    setMsg((prev) => [...prev, msgRef.current.value])
    console.log(msg)
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
  }, [socket])
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
      <TextField inputRef={roomRef} />
        <Button variant="contained" onClick={joinRoom}>Join Room</Button>
      </Box>
      <Typography variant="body1">Welcome {name}</Typography>
      <Paper sx={{ p: 2, backgroundColor: '#eeaa' }}>
        <Typography variant="h6">you are chatting in {room}</Typography>
        <Container sx={{overflow : 'auto',backgroundColor : 'whitesmoke', minHeight : 500, maxHeight : 500}}>
        {msg.length == 0 ? <Box><Typography>No Messages</Typography></Box> : msg.map((m,i) => <Typography align="right" key={i}>{m}</Typography>)}
        </Container>
        
        <TextField fullWidth inputRef={msgRef} sx={{backgroundColor : 'white',my:2}} />
        <Button variant="contained" onClick={Send}>Send</Button>
      </Paper>
    </>
  );
}

export default App;
