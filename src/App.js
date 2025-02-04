import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/Home";
import Header from './Components/Header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyContext = React.createContext();
function App() {
  const [cityList, setcityList] = useState([]);

  useEffect(() => {
    getCityList("https://provinces.open-api.vn/api/p/");
  }, []);

  const getCityList = async (url) => {
    const response = await axios.get(url).then((res) => {
      setcityList(res.data);
    })
  };

  const values = {
    cityList
  } ;

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MyContext.Provider>  
    </BrowserRouter>
  );
}

export default App;
export { MyContext };