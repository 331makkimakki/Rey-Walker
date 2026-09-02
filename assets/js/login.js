import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyD640tg70IDxtLekY6Cntma78P5o62_uIY",
    authDomain: "rey-walker-nmax.firebaseapp.com",
    projectId: "rey-walker-nmax",
    storageBucket: "rey-walker-nmax.firebasestorage.app",
    messagingSenderId: "793511355795",
    appId: "1:793511355795:web:7365c52e01dccafe36f466"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
.onclick = async function(){

    const user =
    document.getElementById("username").value.trim();

    const pass =
    document.getElementById("password").value;

    const error =
    document.getElementById("error");

    try {

        await signInWithEmailAndPassword(
            auth,
            user,
            pass
        );

        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";

    } catch(errorFirebase) {

        console.error("Firebase Login Error:", errorFirebase);

        error.innerHTML =
        "Wrong Username or Password.";

    }

};

// ENTER KEY LOGIN
document.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        document.getElementById("loginBtn").click();
    }

});