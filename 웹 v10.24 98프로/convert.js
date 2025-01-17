var express = require('express');
var multer = require('multer');
var router = express.Router();
var {PythonShell} =  require('python-shell');
var mysql = require('mysql');
var date;
var realresults;
var y1;
var m1;
var d1;
var pnum;
var holiday;
var temperature;
var rain;
var yoil;
var resultin;
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'tkfka123',
    database: 'mysqltest',
    debug: false
});

router.route('/').get(function(req,res){
    res.render('start.html');
});
router.route('/select1').get(function(req,res){
    res.render('select1.html');
});
router.route('/calender').get(function(req,res){
    res.render('calender3.html');
});
router.route('/help').get(function(req,res){
    res.render('help.html');
});
router.route('/amusementpark').get(function(req,res){
    res.render('amusementpark.html');
});
router.route('/allamusementpark').get(function(req,res){
    res.render('allamusementpark.html');
});
router.route('/pastinfo').get(function(req,res){
    res.render('pastinfo.html');
});

router.route('/everland').get(function(req,res){
    res.render('everlandfee.html');
});
router.route('/lotteworld').get(function(req,res){
    res.render('lotteworldfee.html');
});
router.route('/seoulgrandpark').get(function(req,res){
    res.render('seoulgrandparkfee.html');
});
router.route('/eworld').get(function(req,res){
    res.render('eworldfee.html');
});
router.route('/weather').get(function(req,res){
    res.render('weatherrealtime.html');
});
router.route('/date').get(function(req,res){
    res.render('selectDate.html');
});
router.route('/complete').get(function(req,res){
    res.render('complete.html');
});
router.route('/datareceive').get(function(req,res){
    res.render('complete.html');
});
router.get('/send_data', function(req, res, next){
    res.render('selectDate.html', { title: '' });
});


router.post('/complete', function(req, res, next){
  date = req.body.date;  
  yoil = req.body.day;
  console.log(req.body.date);
  console.log(req.body.day);
  var options = {
    mode: 'text',
    pythonPath: 'C:\\Users\\kwakms123\\Anaconda3\\python.exe',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '',
    args: [date]
};

PythonShell.run('pythonfile.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('%j', results);
    realresults = results;
    resultin = results[results.length-1];
    console.log(resultin);
    res.render('complete.html', {realresults : realresults, yoil:yoil});
    });


/*connection.query('INSERT INTO people (date, peoplenum) VALUES(?, ?)',[date,resultin], function(err, rows, field){
    if(!err){
        console.log("insert가 성공하였습니다");
        }
    else{
        console.log('error');
    }
});*/
});


router.route('/pastinfores').get(function(req,res){
    res.render('pastinfores.html');
});


router.post('/pastinfores', function(req, res, next){
  y1 = req.body.year;
  m1 = req.body.month;
  d1 = req.body.day;
  console.log(y1+m1+d1);
  connection.query('select * from informationlist', function(err, rows, field){
  for(var i=0; i<rows.length;i++){
    if(!err){
        if(y1==rows[i].year&&m1==rows[i].month&&d1==rows[i].day){
            console.log(rows[i].num);
            pnum = rows[i].num;
            holiday = rows[i].holiday;
            temperature = rows[i].temperature;
            rain = rows[i].rain;
        }
    }
    else{
        console.log('error');
    }
}
res.render('pastinfores.html',{ year:y1,month:m1,day:d1,pnum:pnum,holiday:holiday,temperature:temperature,rain:rain});
});   
});


module.exports = router;