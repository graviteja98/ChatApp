import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useRef, useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import { useAppContext } from "../Context/ChatContext";
import { useContext } from "react";
const socket = io.connect("http://localhost:5001");
function ChatArea() {
  const msgRef = useRef();
  const roomRef = useRef();
  const btnRef = useRef();
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [msg, setMsg] = useState([]);
  const x = useAppContext();
  useEffect(() => {
    joinRoom();
  }, [x]);
  const Send = async () => {
    console.log(msgRef.current.value);
    console.log('you see this is ',x.state.user.Name)
    const messageData = {
      room: x.state.user.Name,
      name,
      message: msgRef.current.value,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    setMsg((prev) => [...prev, messageData]);
    await socket.emit("send_message", messageData);
    msgRef.current.value = "";
  };
  const joinRoom = () => {
    socket.emit("join_room", x.state.user.Name);
    console.log('Joining room',x.state.user.Name)
  };
  const scrollRef = useRef();
  useEffect(() => {
    socket.on("getID", (data) => {
      console.log("your ID is ", data);
      setName(data);
    });
    socket.on("roomName", (data) => {
      console.log(data);
    });
    socket.on("receive_message", (data) => {
      setMsg((prev) => [...prev, data]);
    });
  }, [socket]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log("Key pressed:", event.key);
    };

    // Attach event listener when the component mounts
    btnRef.current.addEventListener("keypress", handleKeyPress);

    // Detach event listener when the component unmounts
    return () => {
      btnRef.current.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msg]);
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: " #CCCCFF" }}>
            {/* Avatar on the leftmost side */}
            <Avatar
              alt={x.state.user.Name}
              src={x.state.user.Avatar} // Replace with your avatar image URL
              sx={{ marginRight: 2 }}
            />
            <Typography variant="h4" fontWeight={600} color="black">
              {x.state.user.Name}
            </Typography>
            {/* Spacer to push options button to the rightmost side */}
            <div style={{ flexGrow: 1 }}></div>

            {/* Options button on the rightmost side */}
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <TextField inputRef={roomRef} sx={{ mr: 5 }} />
        <Button variant="contained" onClick={joinRoom}>
          Join Room
        </Button> */}
      </Box>
      {/* <Typography variant="body1">Welcome {name}</Typography> */}
      <Paper sx={{ backgroundColor: " #CCCCFF", maxWidth: "100%" }}>
        <Container
          sx={{
            overflow: "auto",
            backgroundColor: " #76448a",
            minHeight: "76vh",
            maxHeight: 200,
          }}
          ref={scrollRef}
        >
          {msg.length == 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color={"white"}>
                No Messages
              </Typography>
            </Box>
          ) : (
            msg.map((m, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor:
                    m.name == name ? "primary.main" : "success.main",
                  my: 1,
                  borderRadius: 2,
                  p: 2,
                  ml: m.name == name ? 60 : 0,
                  mr: m.name !== name ? 60 : 0,
                  color: "white",
                }}
              >
                <Typography variant="body1">{m.message}</Typography>
                <Typography color="black" variant="subtitle2" fontWeight={600}>
                  {m.time}
                </Typography>
              </Box>
            ))
          )}
        </Container>
        <Stack direction={"row"} spacing={1} sx={{ p :1 }}>
          {" "}
          <Button>
            <TagFacesIcon />
          </Button>
          <TextField
            fullWidth
            inputRef={msgRef}
            sx={{ backgroundColor: "white", my: 2 }}
          />
          <Button variant="contained" size='small' ref={btnRef} onClick={Send}>
            <SendIcon/>
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

export default ChatArea;
