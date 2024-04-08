import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Loader from '@mui/material/CircularProgress';

function Summary() {
    const [value ,setValue] = useState('');
    const [effectSummary,setEffectSummary] = useState('')
    const[textInput , setTextInput] = useState('')
    const [loading, setLoading] = useState(); // State to track loading status
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    async function handleSummary(){
        try {
            if(textInput === ''){
                toast.error('Please add Paragraph');
                return
            }
            else{
                setLoading(true);
                const res = await axios.post('https://aifusion-project-2.onrender.com/aiSummrize',{textInput})
                console.log(res.data);
                setValue(res.data.summary.content);
                setLoading(false); 
            }
            // console.log(res);
           
           
           // Set loading to false when data fetching is complete (whether successful or not)
        } catch (error) {
            console.log(error);
          
        }
    }

    useEffect(() => {
        if (value) {
          const typingEffectInterval = setInterval(() => {
            if (value.length > effectSummary.length) {
                setEffectSummary((prevContent) => value.slice(0, prevContent.length + 1));
            } else {
              clearInterval(typingEffectInterval);
            }
          }, 30); // Adjust typing speed as needed
          return () => clearInterval(typingEffectInterval);
        }
      }, [value, effectSummary])

  return (

    <div className='summ_body'>
        <Navbar/>
        <div className='summ_main'>
            <div className='summ_right'>
                <h3 className='summ_Title'>Put your Paragraph here </h3>
                <textarea className='summ_para' onChange={(e)=>setTextInput(e.target.value)}/>
            </div>

            <button className='summ_Btn' onClick={handleSummary}>Get Summary</button>
          
            <div className='summ_left'>
                <h3 className='summ_Title'>Get Your summary here</h3>
                <div className='summ_api'>
                {loading ? ( // Render the loader if loading is true
                            <Loader color="secondary" className='loader' />
                            // <p>Loading....</p>
                        ) : (
                            effectSummary // Render the summary when loading is false
                        )}
                    
                </div>
            </div>
           
        </div>
        <ToastContainer />
    </div>
  )
}

export default Summary