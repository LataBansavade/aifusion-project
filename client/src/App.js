import './App.css';
import { Routes, Route } from'react-router-dom';
import Summary from '../src/Component/Summary/Summary';
import Code from '../src/Component/Code/Code';
import Pdf from '../src/Component/Pdf/Pdf';
import Dashboard from './Component/Dashboard/Dashboard';

function App() {
  return (
    <div>
     <Routes>
     <Route path='/' element = { <Dashboard/>}></Route>
     <Route path='/summarize' element = {<Summary/>}></Route>
     <Route path='/code' element = {<Code/>}></Route>
     <Route path='/pdf' element = {<Pdf/>}></Route>
     </Routes>
    
    </div>
  );
}
export default App;
