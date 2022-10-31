let mongoose = require('mongoose');

module.exports = () => {
    let url = process.env.DATABASE || 'mongodb://localhost:27017/aula';
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    mongoose.connect(url,options);

    mongoose.connection.once('open',()=>{
        console.log("[Mongoose] conectado a: "+url);
    });

    mongoose.connection.on('error',(error)=>{
        console.log("[Mongoose] erro a se conectar: "+error);
    });
}