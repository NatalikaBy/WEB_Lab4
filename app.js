const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

const path = __dirname + '/views/';



var students = [{
    "id": 0,
    "firstname": "Vyacheslau",
    "lastname": "Protosovickii",
    "age": 18,
    "score":  8.7
},
    {
        "id": 1,
        "firstname": "Daniil",
        "lastname": "Privalov",
        "age": 19,
        "score":  3.8
    },
    {
        "id": 2,
        "firstname": "Daniil",
        "lastname": "Vorona",
        "age": 21,
        "score":  6.3
    },
    {
        "id": 3,
        "firstname": "Liliya",
        "lastname": "Nguen",
        "age": 18,
        "score": 7.3
    },
    {
        "id": 4,
        "firstname": "Genadiy",
        "lastname": "Malevich",
        "age": 20,
        "score": 8.9
    },
    {
        "id": 5,
        "firstname": "Polina",
        "lastname": "Podrezanova",
        "age": 19,
        "score": 4.85
    },
    {
        "id": 6,
        "firstname": "Ulayna",
        "lastname": "Medved",
        "age": 18,
        "score": 5.1
    },
    {
        "id": 7,
        "firstname": "Katerina",
        "lastname": "Galko",
        "age": 19,
        "score": 9.23
    },
    {
        "id": 8,
        "firstname": "Alexandra",
        "lastname": "Pogonyailo",
        "age": 19,
        "score": 6.4
    },
    {
        "id": 9,
        "firstname": "Alexandr",
        "lastname": "Shima",
        "age": 19,
        "score": 4.83
    },
    {
        "id": 10,
        "firstname": "Dmitry",
        "lastname": "Volodin",
        "age": 20,
        "score": 7.85
    },
    {
        "id": 11,
        "firstname": "Alex",
        "lastname": "Petrov",
        "age": 18,
        "score":  8.5
    }];

router.use(function(req, res, next) {
    console.log('/' + req.method);
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

app.post('/api/students/save', function(req, res) {
    console.log('Post a student: ' + JSON.stringify(req.body));
    var student = {};
    student.firstname = req.body.firstname;
    student.lastname = req.body.lastname;
    student.age = req.body.age;
    student.score = req.body.score;

    students.push(student);

    return res.send(student);
});

app.get('/api/students/all', function(req, res) {
    console.log('Get All students');
    return res.send(students);
});

app.use('/', router);

app.use('*', function(req, res) {
    res.sendFile(path + '404.html');
});

app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
});