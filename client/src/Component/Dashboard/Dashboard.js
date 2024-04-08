import React from 'react'
import Navbar from '../Navbar/Navbar';
import "./style.css"
import robo1 from '../Assests/robo1.png'
import {motion} from "framer-motion";

function Dashboard() {
  return (
    <div className='dash_body'>
        <Navbar/>
        <div className='dash_main'>
        <div className='dash_right'>
            <motion.h1 className='dash_title'  
              initial={{opacity:0, y:50}}
              animate={{opacity:1, y:1}}
              transition={{duration : 0.3}}>AI Fusion</motion.h1>
            <p className='dash_info'> Whether you seek knowledge, creativity, or connection, our AI project is here to serve. Across languages, across mediums, across the vast expanse of human experience, our AI stands ready to illuminate, to inspire, and to touch your soul. </p>
            <button className='dash_btn'>Explore</button>
            
        </div>

        <div className='dash_Image'>
            {/* <img  src={robo1} alt='Dashboard' /> */}

            <motion.img 
                initial={{x:-100}}
                animate={{x:50}}
                transition={{type:"smooth",repeatType:"mirror", duration : 2 , repeat:Infinity}}

           src={robo1}/>
            {/* <div class="scrollable-container">
            <div className='dash_card'>
            </div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            </div> */}
           

        </div>

        </div>
    </div>
  )
}

export default Dashboard