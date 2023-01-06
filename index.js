const express = require('express');
const app = express();
const dontenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const serviceRoute = require('./routes/services');
const categoryRoute = require('./routes/categories');
const projectRoute = require('./routes/projects');



const multer = require('multer');

require('dotenv').config({path: `${__dirname}/.env` });

const cors = require('cors');


mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}
).catch((err) => {
    console.log(err);
}
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin",  "https://goadway.netlify.app/");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/services', serviceRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/projects', projectRoute);


// app.listen(process.env.PORT || 3000 , () => {
//     console.log("Backend server is running!");
// }
// );

app.listen( 3000 , () => {
    console.log("Backend server is running!");
}
);
