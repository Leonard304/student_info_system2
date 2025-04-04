const express = require("express");
const mysql = require("mysql");
const indexRouter = require("./routes/index.js");
const cors = require("cors");

const web = express();
web.set("views", "views");
web.set("view engine", "ejs");
web.use(express.json());
web.use(cors());
web.use(express.urlencoded({extended:true}));
web.use(express.static("public"));

web.use('/', indexRouter);

//Database Connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_info_system'
});
con.connect(function(err,){
    console.log("Connecting");
    if(err) err;
    console.log("Connection Successful");
});

web.post('/register', (req,res) => {
    const reqBody = JSON.stringify(req.body);
    const info = reqBody.split("/");

    const name = info[1];
    const email = info[2];
    const username = info[3];
    const password = info[4];

    console.log("Name:" +name);
    console.log("Email:" +email);
    console.log("Username:" +username);
    console.log("Password:" +password);

    con.connect(function(err){
        if(err) err;
        var sql = "INSERT INTO students(Student_Name, Email, Username, Password) VALUES('"+name+"','"+email+"','"+username+"','"+password+"')";
        con.query(sql,function(err, result){
            if(err) err;
            res.send('Student Register Successfull');
        })
    })
})



web.listen(3000, () =>{
    console.log('Express is running on port 3000');

});
