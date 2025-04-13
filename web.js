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

    const typeUser = reqBody.typeUser;
    const name = reqBody.firstname + " " +reqBody.lastname;
    const email = reqBody.email;
    const username = reqBody.username;
    const password = reqBody.password;

    async function insertRegister(){
        // Change ra Query !!!!!
        try{
            if(typeUser == "Student"){
                const [result] = await con.query(`INSERT INTO students (Student_Name, Email, Username, Password) VALUES (?, ?, ?, ?)`, [name, email, username, password]);
                
                if(result){
                    web.locals.message = "OK pre Success";
                    res.send("OK").status(200);
                }else{
                    web.locals.message = "Error pre";
                    res.send("Error").status(200);
                }
        
                console.log(result.insertId);
            }else if(typeUser == "Teacher"){
                const [result] = await con.query(`INSERT INTO teacher (Teacher_Name, Email, Username, Password) VALUES (?, ?, ?, ?)`, [name, email, username, password]);
                
                if(result){
                    web.locals.message = "OK pre Success";
                    res.send("OK").status(200);
                }else{
                    web.locals.message = "Error pre";
                    res.send("Error").status(200);
                }
        
                console.log(result.insertId);
            }
        }catch(error){
            web.locals.message = "Student Already Exist";
            res.send("Student Already Exist").status(200);
            console.log(error);
        }

    }
    insertRegister();
});
web.post('/studLogin', (req, res) =>{
    const reqBody = req.body;
    const username = reqBody.username;
    const password = reqBody.password;
    async function studEnter(){
        // Change ra Query !!!!!
        const [result] = await con.query(`SELECT * FROM students WHERE Username = ? AND Password = ?`, [username, password]);
        
        console.log(result)
        if(result.length > 0){
            res.send(result[0].Username).status(200);
            web.locals.message = "OK pre";
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
        }
    }
    studEnter();
});

web.use(express.static("public"));

web.listen(3000, () =>{
    console.log('Express is running on port 3000');

});

