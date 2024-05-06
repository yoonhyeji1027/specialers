import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar_main(){
    return (
        <div className='table-container'>
          
          <table>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <a class="logo" href="MainPage.js">
                <img src="/images/logo.png" alt="Logo" width="263" height="66.27" />
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