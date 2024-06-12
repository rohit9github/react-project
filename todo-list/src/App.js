import AddTask from './Componets/Addtask';
import './App.css';
import Demo from './Componets/demo';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Componets/Navbar';
import Contact from './Componets/Contact';
import Login from './Componets/Login';
import Signup from './Componets/Signup';
import ViewCompletedTask from './Componets/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path='/view' element={<ViewCompletedTask/>}/>
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
