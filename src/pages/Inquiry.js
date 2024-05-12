import React from 'react';
import "./Inquiry.css";
import NavBar from './NavBar.js';

export default function Inquiry() {
    return (
        <div className='table-container'> {/* 반응형 웹 구현때문에 설정해뒀던 클래스명임 */}
            <table>
            <NavBar /> {/* 메인 페이지랑 텍스트 색이 달라서 각 페이지에 따로 추가 */}
            <div className='Inquiry'> {/* 푸터 제외 문의 페이지 전체 묶음 */}
                <div className='header'> {/* 문의 페이지 설명 타이틀 */}
                    <h3 style={{ color: '#4D606B' }}>고객문의</h3>
                    <p style={{ color: '#515151' }}>고객님이 보내주신 문의에 대한 답변은 기재하신 이메일 혹은 연락처로 발송됩니다.</p>
                </div>
                <hr style={{ border: 'none', borderTop: '2px solid #000' }} />

                <div className='text_box'> {/* 고객이 직접 입력하는 문의사항 관련 text box들 */}
                    <ul className='inquiry_list'> {/* 문의사항의 각 요소를 리스트로 정렬하여 질문별로 묶음 묶은 ul의 클래스명은 동일 */}
                        <li><img src="images/inquiry_1.png" width="25px" height="35px" alt="inquiry1" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>분류</p></li>
                        <select style={{ width: '350px', height: '40px' }}>
                            <option  > {/* 입력받는 텍스트박스가 아닌 선택하는 텍스트 목록 */}
                                분류
                            </option>
                            <option >제품 관련 문의</option>
                            <option >회사 관련 문의</option>
                        </select>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_2.png" width="25px" height="35px" alt="inquiry2" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>성명</p></li>
                        <li><input type="text" style={{ width: '250px', height: '40px', marginLeft:'-5px' }}></input></li>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_3.png" width="25px" height="35px" alt="inquiry3" /></li>;
                        <li><p id='title' style={{ color: '#515151' }}>휴대번호</p></li>
                        <li><input type="text" style={{ width: '100px', height: '40px', marginLeft:'-45px' }}></input></li>
                        <li><p style={{ color: '#515151' }}>-</p></li>
                        <li><input type="text" style={{ width: '100px', height: '40px' }}></input></li>
                        <li><p style={{ color: '#515151' }}>-</p></li>
                        <li><input type="text" style={{ width: '100px', height: '40px' }}></input></li>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_4.png" width="25px" height="25px" alt="inquiry4" style={{marginTop:'10px'}}/></li>
                        <li><p id='title' style={{ color: '#515151' }}>이메일</p></li>
                        <li><input type="text" style={{ width: '200px', height: '40px', marginLeft:'-25px' }}></input></li>
                        <li><p style={{ color: '#515151' }}>@</p></li>
                        <li><input type="text" style={{ width: '150px', height: '40px' }}></input></li>
                        <select style={{ width: '150px', height: '40px' }}>
                            <option  >
                                직접입력
                            </option>
                            <option >naver.com</option>
                            <option >gamil.com</option>
                        </select>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_5.png" width="25px" height="35px" alt="inquiry5" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>제목</p></li>
                        <li><input type="text" style={{ width: '900px', height: '40px', marginLeft:'-5px' }}></input></li>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_6.png" width="25px" height="35px" alt="inquiry6" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>내용</p></li>
                        <li><input type="text" style={{ width: '900px', height: '250px', marginLeft:'-5px' }}></input></li>
                    </ul>

                    <button>제출하기</button>

                </div>

            </div>


            <footer>
                <nav> {/* 푸터에서 각 페이지로 이동할 링크 리스트들 */}
                    <a href="S_info.js" className="footer_link">회사소개</a>
                    <a href="J_info.js" className="footer_link">제품소개</a>
                    <a href="SalmonPage.js" className="footer_link">연어양식</a>
                    <a href="Map.js" className="footer_link">오시는길</a>
                </nav>
                <address> {/* 링크가 필요 없는 주소 */}
                    <p>(주) 아쿠아포닉스</p>
                    <p>주소: 강원특별자치도 강릉시 범일로 579번길 24</p>
                </address>
            </footer>
            </table>
            

        </div>
    );
}