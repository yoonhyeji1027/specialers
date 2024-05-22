import React, { useState, useEffect } from 'react';
import "../css/Inquiry.css";
import NavBar from './NavBar.js';

export default function Inquiry() {
    //변수설정
    const [typeData, setTypeData] = useState('');
    const [nameData, setNameData] = useState('');
    const [phoneNumberData, setPhoneNumberData] = useState('');
    const [emailData, setEmailData] = useState('');
    const [emailAddressData, setEmailAddressData] = useState('');
    const [titleData, setTitleData] = useState('');
    const [contentsData, setContentsData] = useState('');

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);      //setSelectedOption함수로 event.target.value값 저장
        setTypeData(event.target.value);
    };
    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
    };

    const saveData = () => {
        const inquiryData = {       //각 키에 맞는 데이터 저장
            type: typeData,
            name: nameData,
            phoneNumber: phoneNumberData,
            email: emailData + '@' + (selectedEmail === '직접입력' ? emailAddressData : selectedEmail),
            title: titleData,
            contents: contentsData
        };

        fetch('http://localhost:3001/inquiry', { // 데이터를 보낼 엔드포인트 지정
            method: 'POST',                      //요청 메서드를 POST로 지정(서버에 데이터를 생성하거나 제출할 때 사용하는 메서드)
            headers: {                           //헤더 설정
                'Content-Type': 'application/json',     //Content헤더는 데이터 타입 설정하는 헤더,       json데이터로 서버에 보냄
            },
            body: JSON.stringify(inquiryData),   //inquiryData를 json 문자열로 변환 후 서버에 보냄
        })          //fetch요청 완료되면 Promise를 반환함
                    //.then과 .catch가 Promise 처리함
        .then(response => response.json())       //서버로부터 응답이 오면 json으로 파싱. 파싱 완료 후 다음 .then으로 넘어감
        .then(data => {             //json으로 파싱된 응답데이터 data에 저장. data를 콘솔에 출력 후 사용자에게 성공메시지 출력.
            console.log('Success:', data);
            alert('문의가 성공적으로 제출되었습니다.');
        })
        .catch((error) => {             //에러 출력
            console.error('Error:', error);
            alert('문의 제출 중 오류가 발생했습니다.');
        });
    }

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
                        <select style={{ width: '350px', height: '40px' }}
                                value={selectedOption}
                                onChange={handleSelectChange}>
                            <option value = '분류'> 분류</option>{/* 입력받는 텍스트박스가 아닌 선택하는 텍스트 목록 */}
                            <option value = '제품 관련 문의'>제품 관련 문의</option>
                            <option value = '회사 관련 문의'>회사 관련 문의</option>
                        </select>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_2.png" width="25px" height="35px" alt="inquiry2" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>name</p></li>
                        <li><input type="text" style={{ width: '250px', height: '40px', marginLeft:'-5px' }}
                                    onChange={(n) => setNameData(n.target.value)}></input></li>         {/*}텍스트가 바뀔때마다 setNameData함수를 통해서 n.target.value값을 nameData에 저장{*/}
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_3.png" width="25px" height="35px" alt="inquiry3" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>휴대번호</p></li>
                        <li><input type="text" style={{ width: '300px', height: '40px', marginLeft:'-45px' }}
                                    onChange={(pn) => setPhoneNumberData(pn.target.value)}></input></li>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_4.png" width="25px" height="25px" alt="inquiry4" style={{marginTop:'10px'}}/></li>
                        <li><p id='title' style={{ color: '#515151' }}>이메일</p></li>
                        <li><input type="text" style={{ width: '200px', height: '40px', marginLeft:'-25px' }}
                                    onChange={(e) => setEmailData(e.target.value)}></input></li>
                        <li><p style={{ color: '#515151' }}>@</p></li>
                        <li><input type="text" style={{ width: '150px', height: '40px' }} placeholder={selectedEmail}
                                    onChange={(e_address) => setEmailAddressData(e_address.target.value)}></input></li>
                        <select style={{ width: '150px', height: '40px' }}
                                value={selectedEmail}
                                onChange={handleEmailChange}>
                            <option value ='직접입력'>직접입력</option>
                            <option value ='naver.com'>naver.com</option>
                            <option value ='gmail.com'>gamil.com</option>
                        </select>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_5.png" width="25px" height="35px" alt="inquiry5" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>제목</p></li>
                        <li><input type="text" style={{ width: '900px', height: '40px', marginLeft:'-5px' }}
                                    onChange={(t) => setTitleData(t.target.value)}></input></li>
                    </ul>
                    <hr style={{ border: 'none', borderTop: '2px dotted #000' }} />
                    <ul className='inquiry_list'>
                        <li><img src="images/inquiry_6.png" width="25px" height="35px" alt="inquiry6" /></li>
                        <li><p id='title' style={{ color: '#515151' }}>내용</p></li>
                        <li><input type="text" style={{ width: '900px', height: '250px', marginLeft:'-5px' }}
                                    onChange={(c) => setContentsData(c.target.value)}></input></li>
                    </ul>

                    <button onClick={() => saveData()}>제출하기</button>        {/*}버튼 클릭하면 saveData함수 실행{*/}

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