import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/Home";
import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" exact = {true} element={<Home/>} /> 
    </Routes>    
    </BrowserRouter>
  );
}

export default App;
