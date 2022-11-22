const express = require('express');
const route = require('./router/route.js');
const  mongoose  = require('mongoose');
const app = express();


app.use(express.json());

mongoose.connect("mongodb+srv://mahesh999333:mahesh999333@cluster0.tecej.mongodb.net/open-to-intern", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);


app.listen( 3001, function () {
    console.log('Express app running on port ' + 3001)
});