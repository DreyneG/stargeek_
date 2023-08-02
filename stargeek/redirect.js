const cat = document.getElementById("cat");
const modal = document.querySelector("dialog");
const login = document.getElementById("lo")
const cad = document.getElementById("ca")
const fechar = document.getElementById("fe")
cat.onclick = () =>{
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
    if (dados == ""){
        modal.showModal();
    }
    else{
        window.location.href = "catalog.html"
    }
}
cad.onclick = () => {
    window.location.href = "cadastro.html"
}
login.onclick = () =>{
    window.location.href = "login.html"
}
fechar.onclick = () =>{
    modal.close();
}