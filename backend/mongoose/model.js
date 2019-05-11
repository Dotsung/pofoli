module.exports = (function(){
    import mongoose from 'mongoose';
    require('dotenv').config();
    const URI = process.env.MONGO_URI;
  
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongodb server");
    });
  
    mongoose.connect( URI, { useNewUrlParser: true });
  
    const schema = {};
    const model = {};
  
    schema.Post = require('./schema/post')(mongoose);
    schema.User = require('./schema/user')(mongoose);
  
    for(let k in schema){
      model[k] = mongoose.model(k, schema[k]);
    }
  
    return model;
})();