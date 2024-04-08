import React from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios'; // Add this line for Axios
import './style.css';
import logo from '../Assests/logo.png';
import { useNavigate } from 'react-router-dom';



import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SummaryIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate()

  async function logoutFromApp(){
   
    try {
      const res = await axios.get('https://aifusion-project-2.onrender.com/logout');
      console.log(res.data);
      if(res.data.logoutSuccess){
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const icons = [<SummaryIcon />, <CodeIcon />, <ChatIcon />, <PdfIcon />, <ImageIcon />, <LogoutIcon />];
  

    
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Summary', 'Code', 'Chat', 'PDF', 'Image', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerItemClick(text)}>
              <ListItemIcon>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderBottom: '1px solid #1d2026', marginTop: '12px', marginBottom: '12px' }}/>
     
    </Box>
  );


  const handleDrawerItemClick =  (text) => {
    switch (text) {
      case 'Summary':
        navigate('/summarize');
        break;
      case 'Code':
        navigate('/code');
        break;
      case 'Chat':
        navigate('/chat');
        break;
      case 'PDF':
        navigate('/pdf');
        break;
      case 'Image':
        navigate('/image');
        break;
      case 'Logout':
         logoutFromApp();
        break;
      default:
        break;
    }
  };


  
  return (
    <div className='NavBar'>
      <NavLink className= 'webname' to='/'><img style={{width:'3.5rem' , height:'3.5rem' , borderRadius: '50%',marginRight : '0.8rem'}} src={logo} alt='logo'/>AiFusion</NavLink>
      <ul className='navlist'>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/summarize">Summary</NavLink>
        <NavLink to="/code">Code</NavLink>
        <NavLink to="/pdf">Pdf</NavLink>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/image">Image</NavLink>
        <button className='NavBtn' onClick={logoutFromApp}>Logout</button>
        
      </ul>
      <div className='muiDrawer'>
                    <Button onClick={toggleDrawer(true)}><MenuIcon style={{fontSize: '2rem',color:"black"}}/></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                    </Drawer>
                </div>
                <ToastContainer />
    </div>
  );
}

export default Navbar;
