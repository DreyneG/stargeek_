const lform = document.getElementById("formulariol")
const lemail = document.getElementById("eemail");
const lsenha = document.getElementById("senhad");
const lcheck = document.getElementById("lcheck")
function verifylogin(lemailv, evento, lsenhav){
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
    var emailinv = dados.find(elemento => elemento.emailcliente === lemailv);
    var index = dados.findIndex(i => i.emailcliente == lemailv);
    var senhainv = dados[index]?  dados[index].senhacliente === lsenhav : false
    if(emailinv && senhainv){
        evento.preventDefault()
        alert("Usuário logado:" + dados[index].nomeclientes);
        window.location.href = "catalog.html"
    }
    else{
        evento.preventDefault()
        alert("Usuário ou senha inválidos");
    }
}
function verifyToken() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        let dados = JSON.parse(localStorage.getItem("bd")) || [];
        const user = dados.find(elemento => elemento.token === storedToken);
        if (user) {
          
            alert("Usuário logado") 
            window.location.href = "catalog.html"
        } else {
           
            localStorage.removeItem("token");
        }
    }
}
function generateToken() {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return token;
}
function lembrar(){
    const token = generateToken()
    
    if(lcheck.checked){
        let dados = JSON.parse(localStorage.getItem("bd")) || [];
        var index = dados.findIndex(i => i.emailcliente == lemail.value)
        dados.push(
            {
                token : token
            }
        )
        localStorage.setItem("token", token);
        localStorage.setItem("bd", JSON.stringify(dados));
    }

}

verifyToken();
lform.onsubmit = (evento) =>{
    evento.preventDefault(); 
    verifylogin(lemail.value, evento, lsenha.value);
    lembrar();
}
