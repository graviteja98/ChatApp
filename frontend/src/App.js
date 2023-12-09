import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import TopOptions from "./components/TopOptions";
import SideBar from "./components/SideBar";
import ChatArea from "./components/ChatArea";

function App() {
  return (
    <Box style={{top : 0}} >
      <Stack direction={"row"}>
        {/* ///////////// contacts and chats //////////////// */}
        <Grid container spacing={0}>
        <Grid item xs={4}>
            <SideBar />
          </Grid>
          {/* ////////////////// chat box ///////////////// */}
          <Grid item xs={8}>
            <ChatArea />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default App;
