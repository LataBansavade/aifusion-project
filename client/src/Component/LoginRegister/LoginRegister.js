import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username :'',
    password: ''
})


  const [loginformData, setLoginFormData] = useState({
        
    username :'',
    password : ''
})



  useEffect(() => {
    const switchers = [...document.querySelectorAll('.switcher')];

    switchers.forEach(item => {
      item.addEventListener('click', function() {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'));
        this.parentElement.classList.add('is-active');
      });
    });

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      switchers.forEach(item => {
        item.removeEventListener('click', function() {
          switchers.forEach(item => item.parentElement.classList.remove('is-active'));
          this.parentElement.classList.add('is-active');
        });
      });
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render


  
 
const navigate = useNavigate()
axios.defaults.withCredentials = true

function handlelogChange(e){
    const {name , value} = e. target;
    setLoginFormData((prevState)=>({
        ...prevState,
        [name]: value
    }))
}

// ///////////////////////////////////////////////////////////////////////////////////////////////
async function handleLoginSubmit(e){
    e.preventDefault();
    try {
        const res = await axios.post('https://aifusion-project-2.onrender.com/login',loginformData)
        console.log(res.data);

        //user not found
        if(res.data.noUser){
            // alert(res.data.message);
            toast.error(`${res.data.message} Please Register` );
        }

        // password is wrong
        if(res.data.wrongPassword){
            // alert(res.data.message);
            toast.error(res.data.message)
        }

        //data base error
        if(res.data.dataBaseError){
            // alert(res.data.message);
            toast.error(res.data.message)
        }

        //login Successful
        if(res.data.loginSuccess){
            // alert(res.data.message);
            toast.success(res.data.message)
            navigate('/dashboard')
        }

    } catch (error) {
        console.log(error);
    }
    
}
// ///////////////////////////////////////////////////////////////////////////////////////////////


function handleChange(e){
  const {name , value} = e. target;
  setFormData((prevState)=>({
      ...prevState,
      [name]: value
  }))
}

async function handleSubmit(e){
  e.preventDefault();
  console.log(formData);
  try {
        const res = await axios.post('https://aifusion-project-2.onrender.com/register',formData)
        console.log(res);
        if(res.data.alreadyUser){
            toast.error(res.data.message)
          // alert(res.data.message)
          
        }
        if(res.data.successful){
          // alert(res.data.message);
          // alert('Please Login')
          toast.success(`${res.data.message} Please Login`)
          window.location.reload();
        }
       
  } catch (error) {
      console.log(error);
      toast.error(error)
  }
  
}

  return (
    <div className='loginRegister'>
      <section className="forms-section">
        <div className="forms">
          <div className="form-wrapper is-active">
            <button type="button" className="switcher switcher-login">
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login" onSubmit={handleLoginSubmit}>
              <fieldset>
                <legend>Please, enter your email and password for login.</legend>
                <div className="input-block">
                  {/* <label htmlFor="login-email">E-mail</label> */}
                  <input id="login-email" type="text" name='username' placeholder="username" value={loginformData.username} onChange={handlelogChange} required />
                </div>
                <div className="input-block">
                  {/* <label htmlFor="login-password">Password</label> */}
                  <input id="login-password" type="password" name='password' placeholder="Password" value={loginformData.password} onChange={handlelogChange} required />
                </div>
              </fieldset>
              <button type="submit" className="btn-login">Login</button>
            </form>

          </div>

          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

          <div className="form-wrapper">
            <button type="button" className="switcher switcher-signup">
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
                <div className="input-block">
                  {/* <label htmlFor="signup-email">E-mail</label> */}
                  <input id="signup-email" type="text" name='name' placeholder="Name" value={formData.name} onChange={handleChange}  required />
                </div>
                <div className="input-block">
                  {/* <label htmlFor="signup-email">E-mail</label> */}
                  <input id="signup-email" type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange}   required />
                </div>
                <div className="input-block">
                  {/* <label htmlFor="signup-password">Password</label> */}
                  <input id="signup-password" type="text"  name='username' placeholder="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="input-block">
                  {/* <label htmlFor="signup-password">Password</label> */}
                  <input id="signup-password" type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup">Continue</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LoginRegister;
