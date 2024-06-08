import AddTask from './Componets/Addtask';
import './App.css';
import Demo from './Componets/demo';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Componets/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddTask />} />
          {/* <Route path="/demo" element={<Demo/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
