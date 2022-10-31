var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let bodyParser = require('body-parser');

let animalRouter = require('./routes/animal');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/animals', animalRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);//

//TODO: Entender essa parte antes de enviar a atividade
app.use(function(req,res,next){
    let err = new Error("NOT FOUND");
    err.status = 404;
    next(err);
})

function errorHandler(err, req,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500);
    res.render('error', {error: err});
}

if(app.get('env') === 'development'){
    app.use(function(err,req,res,next){
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}
//Até aqui pra entender

module.exports = app;
