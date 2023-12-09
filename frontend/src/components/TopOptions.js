import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity2Icon from '@mui/icons-material/Diversity2';
const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Avatar */}
        <Avatar
          alt="User Avatar"
          src="https://example.com/your-avatar-image.jpg" // Replace with your avatar image URL
          sx={{ marginRight: 2 }}
        />

        {/* Buttons */}
        <Button color="inherit"><QuestionAnswerIcon/></Button>
        <Button color="inherit"><GroupsIcon/></Button>
        <Button color="inherit"><Diversity2Icon/></Button>
        <Button color="inherit"><ContactsIcon/></Button>

        {/* Logout button */}
        <Button color="inherit"><LogoutIcon/></Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
