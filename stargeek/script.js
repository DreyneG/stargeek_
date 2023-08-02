const formulario = document.getElementById("formulario");
// const msg = document.querySelector(".mensagem");
// const nome = document.getElementById("nome");
const email = document.getElementById("emaild");
const senha = document.getElementById("senhad");
const confirmarSenha = document.getElementById("csenhad");
const Confirmaemail = document.getElementById("cemaild")
const tell = document.getElementById("tell")
var btn = document.getElementById("btn");
var check = document.getElementById("check");
const TOKENSTORAGE = "token";



function verificarEmail(emailv, evento) {
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
    var emailrep = dados.find(elemento => elemento.emailcliente == emailv);     
    if (emailrep){
        evento.preventDefault();
        alert("E-mail já existente!")
        
    }
    else{
        criarUser(evento);

    }
}
function generateToken() {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return token;
}

function verifcacamp(evento){

    if (email.value == ""){
        evento.preventDefault();
        alert("Preencha o campo e-mail!")
        email.focus();
        return true;
    }
    if(Confirmaemail.value == ""){
        evento.preventDefault();
        alert("Confirme seu e-mail")
        Confirmaemail.focus();
        return true;
    }
    if(email.value != Confirmaemail.value){
        evento.preventDefault();
        alert("E-mails não conferem")
        Confirmaemail.focus();
        return true;
    }
     
    if (senha.value == ""){
        evento.preventDefault();
        alert ("Digite sua senha")
        senha.focus();
        return true;
    }
    if (confirmarSenha.value == ""){
        evento.preventDefault();
        alert("Confirme sua senha")
        confirmarSenha.focus();
        return true;
    }
    if (senha.value != confirmarSenha.value){
        evento.preventDefault();
        alert("Senhas não conferem")
        confirmarSenha.focus();
        return true;
    }
    return false;
}

function criarUser(evento) {
    
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
   
    dados.push(
        {
            emailcliente : email.value,
            senhacliente : senha.value,
            tellcliente : tell.value
        }
        
    )
    const token = generateToken()
    if(check.checked){
        
        dados.push(
            {
                token : token
            }
        )
        localStorage.setItem("token", token); 
    }
     
    localStorage.setItem("bd", JSON.stringify(dados));
    alert("Usuario Cadastrado com Sucesso")
    evento.preventDefault();
    formulario.reset();
    
}

function redirect(){
    setTimeout(()=> {window.location.href = "login.html";}, 300);
    

}

formulario.onsubmit = (evento) =>{
    evento.preventDefault();
    if (verifcacamp(evento)){
        return;
    }
    
    verificarEmail(email.value, evento);
    redirect();
}






