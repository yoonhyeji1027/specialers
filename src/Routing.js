import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage  from "./pages/js/MainPage.js";
import S_info from "./pages/js/S_info.js";
import SalmonPage from "./pages/js/SalmonPage.js";
import J_info from "./pages/js/J_info.js";
import Map from "./pages/js/Mapp.js";
import Inquiry from "./pages/js/Inquiry.js";
import Aquarium_p from "./pages/js/Aquarium_p.js";
import Correlation from "./pages/js/Correlation.js";
import Outlier from "./pages/js/Outlier.js";



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
            <Route path='/Aquarium_p.js' element={<Aquarium_p />} />
            <Route path='/Correlation.js' element={<Correlation />} />
            <Route path='/Outlier.js' element={<Outlier />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
