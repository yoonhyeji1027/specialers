import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage  from "./pages/MainPage";
import S_info from "./pages/S_info";
import SalmonPage from "./pages/SalmonPage";
import J_info from "./pages/J_info";
import Map from "./pages/Mapp";
import Inquiry from "./pages/Inquiry";


function Routing() {
  return (
    <div className='App'>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='SalmonPage.js' element={<SalmonPage />} />
            <Route path='/J_info.js' element={<J_info />} />
            <Route path='/MainPage.js' element={<MainPage />} />
            <Route path='/S_info.js' element={<S_info />} />
            <Route path='/Mapp.js' element={<Map />} />
            <Route path='/Inquiry.js' element={<Inquiry />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
