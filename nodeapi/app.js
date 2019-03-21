const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require ('cookie-parser');



dotenv.config();

//

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
        .then(()=>console.log('DB connected'))

mongoose.connection.on('error', err=>console.log(`${err.message}`));
//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//bring in routs
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

//api docs
app.get('/', (req, res)=>{
  fs.readFile('docs/apiDocs.json', (err, data)=>{
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const docs =JSON.parse(data);
    res.json(docs);
  })
})



app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: 'You are not authorized...'});
    }
  });


const port = process.env.PORT||8080;

app.listen(port, ()=>{
    console.log(`A NodeJS API on port: ${port}`)

});