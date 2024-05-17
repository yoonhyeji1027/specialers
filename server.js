import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: '121.155.34.16',
  port: 33063,
  user: 'sysop',
  password: 'data001!',
  database: 'fms'
});

const local_connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'test123',
  database: 'fish_database'
});

connection.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('생선 데이터 MySQL 연결 성공');
});

local_connection.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('로컬 MySQL 연결 성공');
});

// 수조 정보 조회 API
app.get('/tanks', (req, res) => {
  connection.query(
    'select *, row_number() over(order by mea_dt asc, tank_id asc) as idx from (select DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt, mea_dt,farm_id, tank_id,max(if((eq_id = 131),value, null)) as do, max(if((eq_id = 130),value, null)) as ph,max(if((eq_id = 133),value, null)) as temperature,max(if((eq_id = 132),value, null)) as salinity from(select vv.mea_dt, e.farm_id, e.tank_id,vv.eq_id, vv.value from (select eq_id, farm_id, tank_id, sys_type from fms.eq_tb) as e left join (select mea_dt, eq_id, value, value_mod from fms.sensor_value_tb where mea_dt >= (NOW() + INTERVAL -(1) DAY)) as vv on e.eq_id = vv.eq_id) v group by mea_dt, farm_id, tank_id order by v.mea_dt desc limit 10) as A',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        return;
      }
      res.send({ success: true, tanks: results });
    }
  );
});
 
app.get('/predict', (req, res) => {
  local_connection.query(
    'select *, row_number() over(order by mea_dt) as idx from (select * from (SELECT *, DATE_FORMAT(mea_dt, "%Y-%m-%d %H:%i:%s") AS formatted_mea_dt FROM fish_database.data_predict order by mea_dt desc limit 10) A order by mea_dt) B;',
    (error, results, fields) => {
      if (error) {
        console.error('수조 정보 조회 중 에러 발생: ' + error);
        res.status(500).send({ success: false, message: '데이터베이스 에러' });
        return;
      }
      res.send({ success: true, predict: results });
    }
  );
});

app.listen(port, host, () => {
  console.log(`서버 시작: http://localhost:${port}/tanks`);
  console.log(`서버 시작: http://localhost:${port}/local`);
});