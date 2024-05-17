import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage  from "./pages/MainPage.js";
import S_info from "./pages/S_info.js";
import SalmonPage from "./pages/SalmonPage.js";
import J_info from "./pages/J_info.js";
import Map from "./pages/Mapp.js";
import Inquiry from "./pages/Inquiry.js";
import Aquarium_p from "./pages/aquarium_p.js";
import Correlation from "./pages/correlation.js";
import Outlier from "./pages/Outlier.js";



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
