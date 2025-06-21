const uuid = "0b51dbb3-9d7b-417d-952f-64c5f529446e";
const menuLateral = document.querySelector(".menu-lateral");
const fundoEscuro = document.getElementById("fundo-escuro");
const menuIconButton = document.getElementById("menu-icon");
const usuariosOnlineDiv = document.querySelector(".contatos");
const visibilidadeOpcoesDiv = document.querySelector(".visibilidade-opcoes");
const textoEnvio = document.querySelector(".texto-envio");
const enviarMensagemButton = document.getElementById("enviar-mensagem");
const inputMensagem = document.getElementById("escrever-mensagem");
let nomeUsuario;
let destinatarioSelecionado = "Todos";
let tipoMensagem = "message";
const mensagensExibidas = new Set();
let primeiraCarga = true;
menuIconButton.addEventListener("click", () => {
  menuLateral.classList.add("aberto");
  fundoEscuro.classList.add("aberto");
});
fundoEscuro.addEventListener("click", () => {
  menuLateral.classList.remove("aberto");
  fundoEscuro.classList.remove("aberto");
});
document.addEventListener("click", (event) => {
  if (
    !menuLateral.contains(event.target) &&
    !menuIconButton.contains(event.target) &&
    menuLateral.classList.contains("aberto")
  ) {
    menuLateral.classList.remove("aberto");
    fundoEscuro.classList.remove("aberto");
  }
});
usuariosOnlineDiv.addEventListener("click", (event) => {
  const contatoDiv = event.target.closest(".usuarios-online, .contato-todos");
  if (contatoDiv) {
    const destinatario =
      contatoDiv.dataset.destinatario ||
      contatoDiv.querySelector("p")?.textContent;
    if (destinatario) {
      selecionarDestinatario(destinatario);
    }
  }
});
visibilidadeOpcoesDiv.addEventListener("click", (event) => {
  const visibilidadeDiv = event.target.closest(
    ".mensagem-publica, .mensagem-privada"
  );
  if (visibilidadeDiv) {
    const visibilidade = visibilidadeDiv.dataset.visibilidade;
    if (visibilidade) {
      selecionarVisibilidade(visibilidade);
    }
  }
});
enviarMensagemButton.addEventListener("click", enviarMensagem);
function atualizarTextoEnvio() {
  let visibilidadeTexto =
    tipoMensagem === "message" ? "público" : "reservadamente";
  let textoDestinatario =
    destinatarioSelecionado === "Todos" ? "Todos" : destinatarioSelecionado;
  textoEnvio.textContent = `Enviando para ${textoDestinatario} (${visibilidadeTexto}) como ${nomeUsuario}`;
}
function obterNomeUsuario() {
  nomeUsuario = prompt("Qual o seu nome?");
  if (nomeUsuario === null || nomeUsuario.trim() === "") {
    alert("Por favor, digite um nome válido.");
    obterNomeUsuario();
    return;
  }
  enviarNomeParaServidor(nomeUsuario);
  atualizarTextoEnvio();
  if (!document.querySelector(".contatos > div.selecionado")) {
    selecionarDestinatario("Todos");
  }
}
function enviarNomeParaServidor(nomeUsuario) {
  axios
    .post(`https://mock-api.driven.com.br/api/v6/uol/participants/${uuid}`, {
      name: nomeUsuario,
    })
    .then((resposta) => {
      console.log("Usuário cadastrado com sucesso:", resposta.data);
      carregarMensagens();
      buscarUsuariosOnline();
    })
    .catch((erro) => {
      if (erro.response && erro.response.status === 400) {
        alert("Nome já em uso. Por favor, escolha outro.");
        obterNomeUsuario();
      } else {
        console.error("Erro ao cadastrar usuário:", erro);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
      }
    });
}
function adicionarUsuarioNaLista(nomeUsuarioParaAdicionar) {
  if (
    nomeUsuarioParaAdicionar === "Todos" ||
    document.querySelector(
      `.usuarios-online[data-destinatario="${nomeUsuarioParaAdicionar}"]`
    )
  ) {
    return;
  }
  const novoContato = document.createElement("div");
  novoContato.classList.add("usuarios-online");
  novoContato.dataset.destinatario = nomeUsuarioParaAdicionar;
  novoContato.innerHTML = ` <img src="imagem/icons/person-circle.svg"> <p>${nomeUsuarioParaAdicionar}</p> <ion-icon name="checkmark-outline" class="check"></ion-icon> `;
  usuariosOnlineDiv.appendChild(novoContato);
}
function carregarMensagens() {
  axios
    .get(`https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`)
    .then((resposta) => {
      const mensagensRecebidas = resposta.data;
      const container = document.getElementById("mensagens-container");
      let novasMensagens = false;
      mensagensRecebidas.forEach((mensagem) => {
        const idMensagem = `${mensagem.time}-${mensagem.from}-${mensagem.to}-${mensagem.text}`;
        if (!mensagensExibidas.has(idMensagem)) {
          mensagensExibidas.add(idMensagem);
          novasMensagens = true;
          const mensagemElemento = document.createElement("div");
          mensagemElemento.classList.add("mensagem");
          let deveAdicionarMensagem = false;
          if (mensagem.type === "private_message") {
            if (mensagem.to === nomeUsuario || mensagem.from === nomeUsuario) {
              mensagemElemento.classList.add("privada");
              mensagemElemento.innerHTML = `<span class="tempo"> (${mensagem.time}) </span>&nbsp;<strong> ${mensagem.from} </strong>&nbsp;reservadamente para&nbsp;<strong> ${mensagem.to} </strong>:&nbsp;${mensagem.text}`;
              deveAdicionarMensagem = true;
            }
          } else if (mensagem.type === "status") {
            mensagemElemento.classList.add("status");
            mensagemElemento.innerHTML = `<span class="tempo"> (${mensagem.time}) </span> <strong> ${mensagem.from}</strong>&nbsp;${mensagem.text}`;
            deveAdicionarMensagem = true;
          } else if (mensagem.type === "message") {
            mensagemElemento.classList.add("publica");
            mensagemElemento.innerHTML = `<span class="tempo"> (${mensagem.time}) </span>&nbsp;<strong> ${mensagem.from} </strong>&nbsp;para&nbsp;<strong> ${mensagem.to} </strong>:&nbsp;${mensagem.text}`;
            deveAdicionarMensagem = true;
          }
          if (deveAdicionarMensagem) {
            container.appendChild(mensagemElemento);
          }
        }
      });
      if (primeiraCarga || novasMensagens) {
        rolarParaBaixo();
        primeiraCarga = false;
      }
    })
    .catch((erro) => {
      console.error("Erro ao carregar mensagens:", erro);
    });
}
function rolarParaBaixo() {
  const container = document.getElementById("mensagens-container");
  if (!container) {
    console.error("Elemento mensagens-container não encontrado!");
    return;
  }
  setTimeout(() => {
    const ultimaMensagem = container.lastElementChild;
    if (ultimaMensagem) {
      ultimaMensagem.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  }, 200);
}
function buscarUsuariosOnline() {
  axios
    .get(`https://mock-api.driven.com.br/api/v6/uol/participants/${uuid}`)
    .then((resposta) => {
      const usuariosAtivos = resposta.data.map((u) => u.name);
      const elementosUsuarios = Array.from(
        usuariosOnlineDiv.querySelectorAll(".usuarios-online")
      );
      elementosUsuarios.forEach((elemento) => {
        const nome = elemento.dataset.destinatario;
        if (nome !== "Todos" && !usuariosAtivos.includes(nome)) {
          elemento.remove();
        }
      });
      usuariosAtivos.forEach((nome) => {
        if (
          !document.querySelector(
            `.usuarios-online[data-destinatario="${nome}"]`
          )
        ) {
          adicionarUsuarioNaLista(nome);
        }
      });
    })
    .catch((erro) => {
      console.error("Erro ao buscar usuários online:", erro);
    });
}
function enviarMensagem() {
  const mensagemTexto = inputMensagem.value.trim();
  if (mensagemTexto === "") {
    return;
  }
  const mensagem = {
    from: nomeUsuario,
    to: destinatarioSelecionado,
    text: mensagemTexto,
    type: tipoMensagem,
  };
  axios
    .post(
      `https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`,
      mensagem
    )
    .then(() => {
      inputMensagem.value = "";
      carregarMensagens();
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem:", erro);
      alert(
        "Erro ao enviar mensagem. Você foi desconectado ou ocorreu um problema no servidor."
      );
      window.location.reload();
    });
}
function manterConexao() {
  axios
    .post(`https://mock-api.driven.com.br/api/v6/uol/status/${uuid}`, {
      name: nomeUsuario,
    })
    .catch(() => {
      alert("Você foi desconectado. Recarregando a página...");
      window.location.reload();
    });
}
function selecionarDestinatario(destinatario) {
  destinatarioSelecionado = destinatario;
  atualizarTextoEnvio();
  const contatos = document.querySelectorAll(".contatos > div");
  contatos.forEach((contato) => {
    if (contato.dataset.destinatario === destinatario) {
      contato.classList.add("selecionado");
    } else {
      contato.classList.remove("selecionado");
    }
  });
  if (destinatarioSelecionado !== "Todos") {
    selecionarVisibilidade("private_message");
  }
}
function selecionarVisibilidade(visibilidade) {
  tipoMensagem = visibilidade;
  atualizarTextoEnvio();
  const visibilidades = document.querySelectorAll(".visibilidade-opcoes > div");
  visibilidades.forEach((opcao) => {
    if (opcao.dataset.visibilidade === visibilidade) {
      opcao.classList.add("selecionado");
    } else {
      opcao.classList.remove("selecionado");
    }
  });
  if (
    tipoMensagem === "private_message" &&
    destinatarioSelecionado === "Todos"
  ) {
    selecionarDestinatario(nomeUsuario);
  }
}
buscarUsuariosOnline();
obterNomeUsuario();
setInterval(manterConexao, 5000);
setInterval(buscarUsuariosOnline, 10000);
setInterval(carregarMensagens, 3000);
