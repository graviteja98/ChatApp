import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopOptions from "./components/TopOptions";
import SideBar from "./components/SideBar";
import ChatArea from "./components/ChatArea";
import Login from "./components/Auth/Login";
import { useAppContext } from "./Context/ChatContext";

function App() {
  const [isLogged, setISLogged] = useState(false);
  const x = useAppContext();
  return (
    <Box style={{ top: 0 }}>
      {!x?.state.user.isLogged && <Login />}
      {x?.state.user.isLogged && <ChatArea />}
    </Box>
  );
}

export default App;
