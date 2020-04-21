let express = require('express');
let app = express();
const driverRouter = require('./routes/driverRouter')();

app.use(express.json());
app.use('/api', driverRouter);

app.get('/', function(req, res){
    res.status(500).send('You are inside route');
    console.log('Inside route..................')
});

app.listen(8080, function(){
    console.log('App is running');
});