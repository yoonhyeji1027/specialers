import "./style_main.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';

function NavBar_main(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navigationRef.current && !navigationRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

    return (
        <div className='table-container'>
          
          <table>
          <nav ref={navigationRef} class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="logo" href="MainPage.js">
                <img src="/images/logo_main.png" alt="Logo" width="210" height="40" style={{marginLeft:"20px"}} />
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="S_info.js" style={{color:'#FFF', fontSize:'20px'}}>회사소개</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="J_info.js" style={{color:'#FFF', fontSize:'20px'}}>제품소개</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{color:'#FFF', fontSize:'20px'}}>데이터분석</a>
                    {isMenuOpen && (
                      <ul id='sub_menu'>
                        <li><a href="Correlation.js" style={{color:'#FFF', fontSize:'20px'}}>상관관계분석</a></li>
                        <li><a href="Aquarium_p.js" style={{color:'#FFF', fontSize:'20px'}}>수조환경예측</a></li>
                        <li><a href="Growth_p.js" style={{color:'#FFF', fontSize:'20px'}}>생장예측</a></li>
                      </ul>
                    )}
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="SalmonPage.js" style={{color:'#FFF', fontSize:'20px'}}>연어양식</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="Mapp.js" style={{color:'#FFF', fontSize:'20px'}}>오시는길</a>
                  </li>
                  <li>
                    <a class="nav-link" href="Inquiry.js" style={{color:'#FFF', fontSize:'20px'}}>문의하기</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </table>
          
    
        </div>
      );
    }

export default NavBar_main;