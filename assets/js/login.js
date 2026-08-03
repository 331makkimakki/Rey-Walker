// =========================
// MATRIX BACKGROUND
// =========================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const fontSize = 16;

const columns = Math.floor(canvas.width / fontSize);

const drops = [];

for(let i=0;i<columns;i++){
    drops[i]=1;
}

function draw(){

    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#006600";

    ctx.font=fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){

        const text=
        letters[Math.floor(Math.random()*letters.length)];

        ctx.fillText(
            text,
            i*fontSize,
            drops[i]*fontSize
        );

        if(
            drops[i]*fontSize>canvas.height &&
            Math.random()>0.975
        ){
            drops[i]=0;
        }

        drops[i]++;

    }

}

setInterval(draw,35);

window.onresize=function(){

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

};

// =========================
// SHOW / HIDE PASSWORD
// =========================

const password =
document.getElementById("password");

const eye =
document.getElementById("togglePassword");

eye.onclick=function(){

    if(password.type==="password"){

        password.type="text";

        eye.classList.remove("fa-eye");

        eye.classList.add("fa-eye-slash");

    }else{

        password.type="password";

        eye.classList.remove("fa-eye-slash");

        eye.classList.add("fa-eye");

    }

};

// =========================
// LOGIN
// =========================

document
.getElementById("loginBtn")
.onclick=function(){

    const user=
    document.getElementById("username").value;

    const pass=
    document.getElementById("password").value;

    if(
        user==="ReyWalker" &&
        pass==="makkimakki331"
){

    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";

    }else{

        document.getElementById("error").innerHTML=
        "Wrong Username or Password.";

    }

};

// ENTER KEY LOGIN
document.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        document.getElementById("loginBtn").click();
    }

});