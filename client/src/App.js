import './App.css';
import { Routes, Route } from'react-router-dom';
import Summary from '../src/Component/Summary/Summary';
import Code from '../src/Component/Code/Code';
import Pdf from '../src/Component/Pdf/Pdf';
import Dashboard from './Component/Dashboard/Dashboard';
import Chat from './Component/Chat/Chat';
import Home from './Component/Home/Home';
import LoginRegister from './Component/LoginRegister/LoginRegister';
import ImagePage from './Component/Page/ImagePage';

function App() {
  return (
    <div>
     <Routes>
     <Route path='/' element = { <Home/>}></Route>
     <Route path='/loginregister' element = {<LoginRegister/>}></Route>
     <Route path='/dashboard' element = { <Dashboard/>}></Route>
     <Route path='/summarize' element = {<Summary/>}></Route>
     <Route path='/code' element = {<Code/>}></Route>
     <Route path='/pdf' element = {<Pdf/>}></Route>
     <Route path='/chat' element = {<Chat/>}></Route>
     <Route path='/image' element = {<ImagePage/>}></Route>
     </Routes>
    
    </div>
  );
}
export default App;
