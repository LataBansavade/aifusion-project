import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../Assests/logo.png';


function Home() {
    const navigate = useNavigate();

    function navigateToRegister() {
        navigate('/loginregister');
    }

    return (
        <div className='home_body'>
            <div className='home_left'>
                <img style={{}} src={logo}/>
                <h1>Ai Fusion</h1>
                <button onClick={navigateToRegister}>Explore</button>
            </div>

            <div className='home_right'>
            <div className="container">
                  <div className="item header">
                  </div>
                  <div className="item sidebar">
                 </div> 
                  <div className="item content-1"></div>
                  <div className="item content-2"></div>
                  <div className="item content-3"></div>
                  <div className="item footer"></div>
            </div>
            </div>
          
        </div>
    );
}

export default Home;
