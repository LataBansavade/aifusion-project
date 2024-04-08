import React, { useState } from 'react'
import axios from 'axios';
import'./style.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import logo from '../Assests/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import ClearIcon from '@mui/icons-material/Clear';



const Chat = () => {
    const [message, setMessage] = useState('') //the msg we type
    const [allMessages, setAllMessages] = useState([]) //saving all the msg of you and chatGPT
    const [isLoader, setIsLoader] = useState(false)
    
    // MUI
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


  const icons = [<SummaryIcon />, <CodeIcon />, <ChatIcon />, <PdfIcon />, <ImageIcon />, <LogoutIcon />];
  const icons2 = [<SaveIcon />, <UndoIcon />, <ClearIcon />];

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
      <List>
        {['Save-Chat', 'Previous-Chat', 'Clear-Chat'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerItemClick(text)}>
              <ListItemIcon>
                {icons2[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const navigate = useNavigate();

  const handleDrawerItemClick = (text) => {
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
        logoutFun();
        break;
      case 'Save-Chat':
        handleSaveChat();
        break;
      case 'Previous-Chat':
        handlePreviousChat();
        break;
      case 'Clear-Chat':
        handleClearChat();
        break;
      default:
        break;
    }
  };

  const logoutFun = async () => {
    try {
      const response = await axios.get('https://aifusion-project-2.onrender.com/logout');
      console.log(response.data);
      if(response.data.logoutSuccess){
        navigate('/loginregister')
      }
    } catch (error) {
      console.error('Error or NoToken:', error);
      
    }
  }

  console.log("token in chat is>>>>" , process.env.REACT_APP_OPENAI_API_KEY);

    const sendMessage = async () => {

       
        

        setIsLoader(true)
       
        let url = "https://api.openai.com/v1/chat/completions"

       
        let token = `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
       
        
        let model = 'gpt-3.5-turbo'
  
        // adding old msg to new msg list
        let messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ]

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messagesToSend
            })
        })
        
        let resjson = await res.json()
        if (resjson) {
            console.log(resjson)

            // console.log(resjson.choices[0].message)

            // appending new msg to old msg
            let newAllMessages = [
                ...messagesToSend,
                resjson.choices[0].message
            ]


            // console.log(newAllMessages)

            setAllMessages(newAllMessages)
            setIsLoader(false)
            setMessage('')
        }
    }
    // console.log('allMessages > ',allMessages);

    async function handleSaveChat(){
        try {
            await axios.post('https://aifusion-project-2.onrender.com/saveChat', { allMessages });
            console.log('Chat saved to MongoDB');
            if(allMessages.length > 0){
             toast.success('Chat Saved')
            }
            else{
              toast.error('No chat to save')
            }
        } catch (error) {
            console.log('Error saving chat to Database:', error);

        }
    }

    const handlePreviousChat = async () => {
        try {
            const response = await axios.get('https://aifusion-project-2.onrender.com/getAllChats');
            setAllMessages(response.data);
            console.log(response.data);
           
        } catch (error) {
            console.error('Error fetching previous chats:', error);
        }
    };

    const handleClearChat = ()=>{
        setAllMessages([])
        toast.success('cleared chat')
    }

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            console.log('you press enter');
            sendMessage()
        }
      };

    return (
        <div className='rightSection'>
          
            <div className='top'>
                <div className='logoNtitle'>
                    <img onClick={()=>navigate('/dashboard')} src={logo} style={{ width: '60px', height: '60px' }} alt="" className="logo" />
                    <h1 onClick={()=>navigate('/dashboard')} style={{fontSize:'28px'}}>Ai Fusion</h1>
                </div>
                <ul className='linksToNavigate'>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to='/summarize'>Summary</NavLink>
                    <NavLink to='/code'>Code</NavLink>
                    <NavLink to='/pdf'>PDF</NavLink>
                    <NavLink to='/chat'>Chat</NavLink>
                    <NavLink to='/image'>Image</NavLink>
                </ul>
                
                <div className='btns'>
                    <button className='aiBtn' onClick={handleSaveChat}>Save chat</button>
                    <button className='aiBtn' onClick={handlePreviousChat}>Previous chats</button>
                    <button className='aiBtn' onClick={handleClearChat}>Clear chats</button>
                </div>

                <div className='muiDrawer'>
                    <Button onClick={toggleDrawer(true)}><MenuIcon style={{fontSize: '5rem', marginBottom: '1rem',color:"black"}}/></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                    </Drawer>
                </div>
            </div>

            {
                allMessages.length > 0 ?
                    <div className='messages'>
                        {allMessages.map((msg, index) => (
                            <div key={index} className='message'>
                               {msg.role === 'user' ? <AccountCircleIcon style={{ width: '50px', height: '50px' }} /> : <img src={logo} style={{ width: '50px', height: '50px' }} alt="" />}

                                <div className='details'>
                                    <h2 style={{fontWeight:'900' , marginTop:'0.8rem'}}>{msg.role === 'user' ? 'You' : 'AI'}</h2>
                                    <p style={{fontSize:'18px'}}>{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='nochat'>
                        <div className='s1'>
                            <img src={logo} style={{width:'60px', height:'60px'}}/>
                            <h1>How can I help you today?</h1>
                        </div>
                    </div>
            }

            <div className='bottomsection'>
                <div className='messagebar'>
                    <input type='text' placeholder='Lets Chat'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={handleEnter} 
                       
                    />
                    {
                        isLoader ? 
  
                        <div >
                            <div className="preloder">
                            <div className="loder">
                            </div>
                            </div>
                        </div>
                        :
                        <SendIcon 
                            onClick={sendMessage} 
                            id ='sendIcon' 
                            style={{
                                color: 'black',
                                cursor: 'pointer',
                            }}
                        />
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Chat
