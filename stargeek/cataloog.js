const botaomodal = document.getElementById("botao");
const cards = document.querySelector(".cards");
const cadmodal = document.querySelector(".media");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("idname");
const snopse = document.getElementById("idsnop");
const foto = document.getElementById("idmg");
const autor = document.getElementById("idth");
const select = document.getElementById("id");
const botaocadastrar = document.querySelector(".btncadastrar");
const botaoeditar = document.querySelector(".btneditar");
const idelemento = document.getElementById("idalterar");
const btnm = document.getElementById("botaot");

carregarCatalogo();

botaomodal.onclick = () => {
  nome.value = "";
  snopse.value = "";
  autor.value = "";
  select.value = null;
  cadmodal.style.display = "flex";
  botaoeditar.style.display = "none";
  botaocadastrar.style.display = "block";
};
btnm.onclick = () => {
  nome.value = "";
  snopse.value = "";
  autor.value = "";
  select.value = null;
  cadmodal.style.display = "flex";
  botaoeditar.style.display = "none";
  botaocadastrar.style.display = "block";
};

function fechar() {
  cadmodal.style.display = "none";
}

botaocadastrar.onclick = (evento) => {
  evento.preventDefault();
  fenvio()
    .then((result) => {
      if (result) {
        let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
        dados.push({
          nome: nome.value,
          snopse: snopse.value,
          autor: autor.value,
          midia: select.value,
          foto: nomeArq,
        });
        localStorage.setItem("catalogo", JSON.stringify(dados));
        window.location.reload();
      } else {
        alert("Houve um erro no envio do arquivo.");
      }
    });
};

function carregarCatalogo() {
  let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
  // console.log(dados);

  dados.forEach((elemento, indice) => {
    let divcard = document.createElement("div"); // Added "div" to fix the variable name
    divcard.classList.add('card');
    divcard.innerHTML = `
      <div class="cardimagem">
        <img src="img/${elemento.foto}">
      </div>
      <div class="cardinfo">
        <div class="editar">
          <i class="bi bi-pencil-fill" onclick="editar(${indice})"></i>
        </div>
        <div class="excluir">
          <i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i>
        </div>
      </div>`;
    cards.appendChild(divcard);
  });
  if(dados == ""){
    botaomodal.style.display = 'flex';
    btnm.style.display = 'none';


  }
  else{
    botaomodal.style.display = 'none';
    btnm.style.display = 'flex';
  }
}

function editar(indice) {
  nome.value = "";
  snopse.value = "";
  cadmodal.style.display = "flex";
  botaocadastrar.style.display = "none";
  botaoeditar.style.display = "block";
  let dados = JSON.parse(localStorage.getItem("catalogo"));

  nome.value = dados[indice].nome;
  snopse.value = dados[indice].snopse;
  select.value = dados[indice].midia
  autor.value = dados[indice].midia
  fotoa = dados[indice].foto;
  idelemento.value = indice;
}

var fotoa;
botaoeditar.onclick = (evento) => {
  if (fotoa !== foto.value && foto.value !== "") {
    evento.preventDefault();
    fenvio()
      .then((result) => {
        if (result) {
          salvarEdicao(nomeArq);
        } else {
          alert("Houve um erro no envio do arquivo.");
        }
      });
  } else {
    salvarEdicao(fotoa);
  }
};

function salvarEdicao(pfoto) {
  let dados = JSON.parse(localStorage.getItem("catalogo"));
  dados[idelemento.value].nome = nome.value;
  dados[idelemento.value].snopse = snopse.value;
  dados[idelemento.value].foto = pfoto;
  localStorage.setItem("catalogo", JSON.stringify(dados));
}

function excluir(indice) {
  if (confirm("Tem certeza de que deseja excluir?")) {
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados.splice(indice, 1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();
  }
}

var nomeArq;
async function fenvio() {
  const url = 'http://localhost:3005/upload';
  const arquivo = document.getElementById("idmg").files[0];
  const formData = new FormData();
  formData.append('arquivo', arquivo);
  console.log(JSON.stringify(formData));
  try {
    var resp = await fetch(url, {
      method: 'POST',
      body: formData
    });
    if (resp.ok) {
      let respText = await resp.text();
      nomeArq = respText;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}