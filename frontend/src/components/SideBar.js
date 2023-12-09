import React, { useContext, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupsIcon from "@mui/icons-material/Groups";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SampleChats from "./SampleChats";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { useAppContext } from "../Context/ChatContext";
const SmallIcon = ({ icon }) => {
  return React.cloneElement(icon, { fontSize: "small" });
};

const SimpleTabs = () => {
  const [value, setValue] = useState(0);
  const [selectedButton, setSelectedButton] = useState("avatar");
 const x = useAppContext()
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const rippleRef = React.useRef(null);
  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: " #CCCCFF" }}>
          {/* Avatar */}
          {/* Avatar on the leftmost side */}

          {/* Tabs with buttons */}

          <Stack direction="row" spacing={0}>
            {/* Avatar button */}
            <Button
              onClick={() => handleButtonClick("avatar")}
              sx={{
                backgroundColor:
                  selectedButton === "avatar" ? "white" : "transparent",
              }}
            >
              <Avatar
                alt="User Avatar"
                src="https://example.com/your-avatar-image.jpg" // Replace with your avatar image URL
                sizes="small"
              />
            </Button>

            {/* Other buttons */}
            <Button
              onClick={() => handleButtonClick("questionAnswer")}
              sx={{
                backgroundColor:
                  selectedButton === "questionAnswer" ? "white" : "transparent",
                color: "#76448a",
              }}
            >
              <QuestionAnswerIcon fontSize="small" />
            </Button>

            <Button
              onClick={() => handleButtonClick("groups")}
              sx={{
                backgroundColor:
                  selectedButton === "groups" ? "white" : "transparent",
                color: "#76448a",
              }}
            >
              <GroupsIcon fontSize="small" />
            </Button>

            <Button
              onClick={() => handleButtonClick("diversity2")}
              sx={{
                backgroundColor:
                  selectedButton === "diversity2" ? "white" : "transparent",
                color: "#76448a",
              }}
            >
              <Diversity2Icon fontSize="small" />
            </Button>

            <Button
              onClick={() => handleButtonClick("contacts")}
              sx={{
                backgroundColor:
                  selectedButton === "contacts" ? "white" : "transparent",
                color: "#76448a",
              }}
            >
              <ContactsIcon fontSize="small" />
            </Button>
          </Stack>
          {/* Spacer to push options button to the rightmost side */}
          <div style={{ flexGrow: 1 }}></div>

          {/* Options button on the rightmost side */}
          <Button color="inherit">
            <LogoutIcon sx={{ color: "red" }} fontSize="small" />
          </Button>

          {/* Logout button */}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          overflow: "auto",
          backgroundColor: " #CCCCFF",
          maxHeight: "87vh",
        }}
      >
        {SampleChats.map((chat, i) => {
          return (
            <Box>
              <Divider />
              <Stack 
              onClick={()=>{
                x.dispatch({type : 'addRoom', payload : chat })
              }}
                direction={"row"}
                display="flex"
                justifyContent={"space-between"}
                spacing={2}
                component={Button}
                sx={{ p: 2, color: "black" }}
              >
                <Avatar src={chat.Avatar} alt={chat.Name} />
                <Stack direction={"column"}>
                  <Typography variant="body1" fontWeight={600}>
                    {chat.Name}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body1">
                      {" "}
                      {chat.seen === 0 && (
                        <HourglassBottomIcon fontSize="small" />
                      )}
                      {chat.seen === 1 && <DoneIcon fontSize="small" />}
                      {chat.seen === 2 && <DoneAllIcon fontSize="small" />}
                      {chat.seen === 3 && (
                        <DoneAllIcon sx={{ color: "blue" }} fontSize="small" />
                      )}
                    </Typography>
                    <Typography variant="body1">{chat.lastMsg}</Typography>
                  </Stack>
                </Stack>
                <Typography variant="body1" display={"block"}>
                  {chat.timeStamp.split("T")[1]}
                </Typography>
              </Stack>
              <Divider />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SimpleTabs;
