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
var typeUser = "";
function highlightuserType(type){
    document.querySelector(".pickStudent").classList.remove("active");
    document.querySelector(".pickTeacher").classList.remove("active");
    if(type == "Student"){
        typeUser = "Student";
        document.querySelector(".pickStudent").classList.add("active");
    }else if(type == "Teacher"){
        typeUser = "Teacher";
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

function submit(){
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const body = JSON.stringify({
        typeUser: typeUser,
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    });
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                location.reload();
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/register");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function studentLogIn(){
    const username = document.getElementById("studUsername").value;
    const password = document.getElementById("studPassword").value;
    const body = JSON.stringify({
        username: username,
        password: password
    });
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText)
            if(this.responseText == "Error"){
                document.querySelector(".sPaneError").classList.toggle("showSPaneError");
            }else{
                window.location.replace("/studentDashboard"); // Kadtong naa sa routes gamita

                localStorage.setItem("username", this.responseText); // Store nato aron mahi baw'an kinsa ni login
                
                console.log(localStorage.getItem("username")); // kuha sa username
                //localStorage.removeItem("username"); // delete sa username inig logout; ibutang sud sa logout nga function
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/studLogin");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}

console.log(localStorage.getItem("username")); // kuha sa username
