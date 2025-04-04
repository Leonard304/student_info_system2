const express = require("express");
const mysql = require("mysql2");
const indexRouter = require("./routes/index.js");
const cors = require("cors");

const web = express();
web.set("view engine", "ejs");
web.use(express.json());
web.use(cors());


web.locals.message = "";
// web.use(express.urlencoded({extended:true}));

web.use('/', indexRouter);

//Database Connection
const con = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'student_info_system'
}).promise();

web.post('/register', (req, res) => {
    const reqBody = req.body;

    const name = reqBody.firstname + " " +reqBody.lastname;
    const email = reqBody.email;
    const username = reqBody.username;
    const password = reqBody.password;

    async function insertRegister(){
        // Change ra Query !!!!!
        const [result] = await con.query(`INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`, [name, email, username, password]);
        
        if(result){
            web.locals.message = "OK pre Success";
            res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }

        console.log(result.insertId);
    }

    insertRegister();
});

web.use(express.static("public"));

web.listen(3000, () =>{
    console.log('Express is running on port 3000');

});