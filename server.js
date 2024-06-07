import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({     //접속할 mysql 설정
  host: '121.155.34.16',
  port: 33063,
  user: 'sysop',
  password: 'data001!',
  database: 'fms',
  // 유휴 연결 해제를 방지하기 위한 옵션
  keepAliveInitialDelay: 10000, // 10초마다 Keep-Alive 패킷을 보냄
  enableKeepAlive: true
});

const local_connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'test123',
  database: 'fish_database',
  // 유휴 연결 해제를 방지하기 위한 옵션
  keepAliveInitialDelay: 10000, // 10초마다 Keep-Alive 패킷을 보냄
  enableKeepAlive: true
});

connection.connect(err => {     //connection에 설정한 mysql 데이터로 접속
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('생선 데이터 MySQL 연결 성공');
});

local_connection.connect(err => {     //local_connection에 설정한 mysql 데이터로 접속
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('로컬 MySQL 연결 성공');
});

// 수조 정보 조회 API
app.get('/tanks', (req, res) => {       //  /tanks 엔드포인트로 요청이 오면 해당 코드 실행
  connection.query(     //connection에 저장된 mysql 데이터로 접속한 데이터베이스에 작성한 쿼리문을 보내서 데이터를 받아옴
    'select *, row_number() over(order by mea_dt asc, tank_id asc) as idx from (select DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt, mea_dt,farm_id, tank_id,max(if((eq_id = 131),value, null)) as do, max(if((eq_id = 130),value, null)) as ph,max(if((eq_id = 133),value, null)) as temperature,max(if((eq_id = 132),value, null)) as salinity from(select vv.mea_dt, e.farm_id, e.tank_id,vv.eq_id, vv.value from (select eq_id, farm_id, tank_id, sys_type from fms.eq_tb) as e left join (select mea_dt, eq_id, value, value_mod from fms.sensor_value_tb where mea_dt >= (NOW() + INTERVAL -(1) DAY)) as vv on e.eq_id = vv.eq_id) v group by mea_dt, farm_id, tank_id order by v.mea_dt desc limit 10) as A',
    (error, results, fields) => {     //쿼리문 실행 후 에러는 error에, 결과값은 results에 저장
      if (error) {      //에러가 있으면 해당 코드 실행
        console.error('수조 정보 조회 중 에러 발생: ' + error);         //에러 출력
        res.status(500).send({ success: false, message: '데이터베이스 에러' });         //success변수에 false반환,  에러출력
        return;
      }
      res.send({ success: true, tanks: results });      // success에 true저장, tanks에 results저장 후 엔드포인트 요청이 온 곳에 반환.
    }
  );
});
 
//수조환경예측
app.get('/predict', (req, res) => {
  local_connection.query(
    'select *, row_number() over(order by mea_dt) as idx from (select * from (SELECT *, DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt FROM fish_database.data_predict order by mea_dt desc limit 10) A order by mea_dt) B;',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        local_connection.connect();
        return;
      }
      res.send({ success: true, predict: results });
    }
  );
});

//이상치탐지
app.get('/z_score', (req, res) => {
  local_connection.query(
    'SELECT *,DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt FROM fish_database.z_score order by mea_dt',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        return;
      }
      res.send({ success: true, z_score: results });
    }
  );
});

//상관관계
app.get('/correlation_matrix', (req, res) => {
  local_connection.query(
    'SELECT * FROM fish_database.correlation_matrix',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        return;
      }
      res.send({ success: true, correlation_matrix: results });
    }
  );
});

//min, max, avg
app.get('/MMA', (req, res) => {
  connection.query(
    'select min(do) do_min, max(do) do_max, avg(do) do_avg, min(ph) ph_min, max(ph) ph_max, avg(ph) ph_avg, min(temperature) temperature_min, max(temperature) temperature_max, avg(temperature) temperature_avg, min(salinity) salinity_min, max(salinity) salinity_max, avg(salinity) salinity_avg from(select *, row_number() over(order by mea_dt asc, tank_id asc) as idx from (select mea_dt,farm_id, tank_id,max(if((eq_id = 131),value, null)) as do, max(if((eq_id = 130),value, null)) as ph,max(if((eq_id = 133),value, null)) as temperature,max(if((eq_id = 132),value, null)) as salinity from(select vv.mea_dt, e.farm_id, e.tank_id,vv.eq_id, vv.value from (select eq_id, farm_id, tank_id, sys_type from fms.eq_tb) as e left join (select mea_dt, eq_id, value, value_mod from fms.sensor_value_tb where mea_dt >= (NOW() + INTERVAL -(1) HOUR)) as vv on e.eq_id = vv.eq_id) v group by mea_dt, farm_id, tank_id order by v.mea_dt desc) as A order by mea_dt desc) A',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        connection.connect();
        return;
      }
      res.send({ success: true, MMA: results });
    }
  );
});

//문의
app.use(bodyParser.json());     //json데이터 사용하게 해주는 코드
app.post('/inquiry', (req, res) => {    //  /inquiry로 post요청이 오면 받은 데이터 req에 저장. 보낼 데이터는 res
  const inquiryData = req.body;   //req에 저장된 데이터의 body부분을 inquiryData에 저장.
  const { type, name, phoneNumber, email, title, contents } = inquiryData;    //inquiryData를 type, name, phoneNumber, email, title, contents로 쪼개어 저장.

  const query = `
      INSERT INTO inquiry (type, name, phone_number, email, title, contents)
      VALUES (?, ?, ?, ?, ?, ?)
  `;    //mysql에 보낼 쿼리문 작성

  local_connection.query(query, [type, name, phoneNumber, email, title, contents], (err, results) => {    //local_connection에 저장된 mysql 데이터로 접속한 데이터베이스에 작성한 쿼리문을 보내고 데이터 받아옴
                                                                                                          //데이터 보낼때 쿼리문 ?부분에 순서대로 type, name, phoneNumber, email, title, contents 값들을 넣어서 보냄
    if (err) {      //에러 있으면 실행
          console.error('데이터베이스 삽입 오류:', err);
          res.status(500).json({ message: '데이터베이스 삽입 중 오류가 발생했습니다.' });
          return;
      }
      res.status(200).json({ message: '데이터가 성공적으로 제출되었습니다.' });
  });
});

app.listen(port, host, () => {
  console.log(`서버 시작: http://localhost:${port}/tanks`);
  console.log(`서버 시작: http://localhost:${port}/predict`);
  console.log(`서버 시작: http://localhost:${port}/z_score`);
  console.log(`서버 시작: http://localhost:${port}/correlation_matrix`);
  console.log(`서버 시작: http://localhost:${port}/MMA`);
  console.log(`서버 시작: http://localhost:${port}/inquiry`);
});