import AddTask from './Componets/Addtask';
import './App.css';
import Demo from './Componets/demo';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Componets/Navbar';
import About from './Componets/About';
import Contact from './Componets/Contact';
import Login from './Componets/Login';
import Signup from './Componets/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          {/* <Route path="/demo" element={<Demo/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
