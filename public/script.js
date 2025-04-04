var type = "";

function showEnroll(){
    document.querySelector(".enrollment").classList.toggle("show");
}

function showGrade(){
    document.querySelector(".grades").classList.toggle("show");
}
function showBill(){
    document.querySelector(".billing").classList.toggle("show");
}
function showStuds(){
    document.querySelector(".manStud").classList.toggle("adShow");
}
function showEmps(){
    document.querySelector(".manFS").classList.toggle("adShow");
}
function showUstype(){
    document.querySelector(".utype").classList.toggle("showUtype");
}
function showStudType(){
    document.querySelector(".chooseType").classList.toggle("showUtype");
}
function highlightuserType(type){
    document.querySelector(".pickStudent").classList.remove("active");
    document.querySelector(".pickTeacher").classList.remove("active");
    if(type == "Student"){
        document.querySelector(".pickStudent").classList.add("active");
    }else if(type == "Teacher"){
        document.querySelector(".pickTeacher").classList.add("active");
        document.querySelector(".pickJunior").classList.remove("actives");
        document.querySelector(".pickSenior").classList.remove("actives");
    }
}
function highlightStudType(type) {
    document.querySelector(".pickJunior").classList.remove("actives");
    document.querySelector(".pickSenior").classList.remove("actives");
    if(type == "Junior High"){
        document.querySelector(".pickStudent").classList.add("active");
        document.querySelector(".pickJunior").classList.add("actives");
        document.querySelector(".pickTeacher").classList.remove("active");
    }else if(type == "Senior High"){
        document.querySelector(".pickStudent").classList.add("active");
        document.querySelector(".pickSenior").classList.add("actives");
        document.querySelector(".pickTeacher").classList.remove("active");
    }
}
const xhr = new XMLHttpRequest();

function submit(){
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const body = `/${firstname} ${lastname}/${email}/${username}/${password}/`;
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
        }
    }
    
    xhr.open("POST", "http://localhost:3000/register", true);
    xhr.setRequestHeader('Acces-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send(body);
}

