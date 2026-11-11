// Login (guarda só nome e e-mail, nunca a senha)

// Usuário salvo: localStorage com "Lembrar de mim", senão sessionStorage
function lerUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuarioLogado") || sessionStorage.getItem("usuarioLogado"));
  } catch (erro) {
    return null;
  }
}

function nomePeloEmail(email) {
  const primeiraParte = email.split("@")[0].split(/[._-]/)[0];
  return primeiraParte.charAt(0).toUpperCase() + primeiraParte.slice(1);
}

const telaLogin = document.getElementById("entrar");
const caixaConectado = document.getElementById("login-conectado");
const botaoConta = document.getElementById("btn-conta");
const formLogin = document.getElementById("form-login");
const cartaoForm = document.getElementById("cartao-form");
const linhaTrocar = document.getElementById("linha-trocar");
let modoCriarConta = false;

function abrirLogin() {
  let primeiroCampo = document.getElementById("login-email");
  if (!caixaConectado.hidden) primeiroCampo = document.getElementById("btn-sair");
  abrirJanela(telaLogin, primeiroCampo);
}

function fecharLogin() {
  if (telaLogin.classList.contains("aberto")) fecharJanela();
}

telaLogin.querySelectorAll("[data-fechar-login]").forEach(function (botao) {
  botao.addEventListener("click", fecharLogin);
});

// Botão de conta no cabeçalho
function atualizarBotaoConta() {
  const usuario = lerUsuario();
  if (usuario) {
    escrever("btn-conta-texto", "Olá, " + usuario.nome);
    botaoConta.classList.add("conectado");
    botaoConta.title = "Minha conta: " + usuario.email;
  } else {
    escrever("btn-conta-texto", "Fazer login");
    botaoConta.classList.remove("conectado");
    botaoConta.title = "Entrar na sua conta";
  }
}

atualizarBotaoConta();
botaoConta.addEventListener("click", function (evento) {
  evento.preventDefault(); // não muda o # (que troca de página)
  abrirLogin();
});

// Formulário
function mensagemLogin(texto, tipo) {
  const caixa = document.getElementById("login-mensagem");
  caixa.textContent = texto;
  caixa.hidden = texto === "";
  caixa.classList.toggle("aviso", tipo === "aviso");
}

function validarEmail() {
  const email = document.getElementById("login-email").value.trim();
  if (email === "") return conferir("login-email", true, "Digite o seu e-mail.");
  return conferir("login-email", !FORMATO_EMAIL.test(email), "Esse e-mail não parece certo. Ex.: nome@exemplo.com");
}

function validarLogin() {
  let nomeOk = true;
  if (modoCriarConta) {
    nomeOk = conferir("login-nome", document.getElementById("login-nome").value.trim().length < 2, "Digite o seu nome (pelo menos 2 letras).");
  }
  const emailOk = validarEmail();
  const senha = document.getElementById("login-senha").value;
  let senhaOk;
  if (senha === "") {
    senhaOk = conferir("login-senha", true, "Digite a sua senha.");
  } else {
    senhaOk = conferir("login-senha", senha.length < 6, "A senha precisa ter pelo menos 6 caracteres.");
  }
  return nomeOk && emailOk && senhaOk;
}

// Troca entre "Entrar" e "Criar conta"
function escreverTextos(comecoTitulo, sub, enviar, pergunta, trocar) {
  const titulo = document.getElementById("titulo-login");
  titulo.textContent = comecoTitulo + " ";
  const destaque = document.createElement("span");
  destaque.className = "destaque";
  destaque.textContent = "conta";
  titulo.appendChild(destaque);
  escrever("sub-login", sub);
  escrever("btn-enviar", enviar);
  escrever("texto-trocar", pergunta);
  escrever("btn-trocar", trocar);
}

function trocarModo() {
  modoCriarConta = !modoCriarConta;
  document.getElementById("campo-nome").hidden = !modoCriarConta;
  document.getElementById("btn-esqueci").hidden = modoCriarConta;

  const campoSenha = document.getElementById("login-senha");
  let primeiroCampo;
  if (modoCriarConta) {
    campoSenha.autocomplete = "new-password";
    escreverTextos("Criar sua", "Leva menos de um minuto. Depois é só escolher os doces!", "Criar conta", "Já tem conta?", "Entrar");
    primeiroCampo = "login-nome";
  } else {
    campoSenha.autocomplete = "current-password";
    escreverTextos("Entrar na sua", "Bem-vindo(a) de volta! Seus doces de Natal esperam por você.", "Entrar", "Ainda não tem conta?", "Criar conta");
    primeiroCampo = "login-email";
  }
  ["login-nome", "login-email", "login-senha"].forEach(function (id) {
    mostrarErro(id, "");
  });
  mensagemLogin("");
  document.getElementById(primeiroCampo).focus();
}

// Cartão que gira ao trocar de modo
let virando = false;

function virarCartao() {
  if (menosMovimento) {
    trocarModo();
    return;
  }
  if (virando) return;
  virando = true;
  cartaoForm.classList.remove("virar-entrada");
  cartaoForm.classList.add("virar-saida");
  setTimeout(function () {
    trocarModo();
    cartaoForm.classList.remove("virar-saida");
    cartaoForm.classList.add("virar-entrada");
    setTimeout(function () {
      cartaoForm.classList.remove("virar-entrada");
      virando = false;
    }, 450);
  }, 300);
}

// Já conectado e botão Sair
function mostrarConectado(usuario) {
  cartaoForm.hidden = true;
  linhaTrocar.hidden = true;
  caixaConectado.hidden = false;
  escrever("login-ola", "Olá, " + usuario.nome + "!");
  escrever("login-email-salvo", "Você está conectado como " + usuario.email + ".");
}

document.getElementById("btn-trocar").addEventListener("click", virarCartao);

document.getElementById("btn-esqueci").addEventListener("click", function () {
  if (!validarEmail()) {
    document.getElementById("login-email").focus();
    return;
  }
  mensagemLogin("Enviamos um link para redefinir a senha para " + document.getElementById("login-email").value.trim() + ".", "aviso");
});

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!validarLogin()) {
    formLogin.querySelector(".invalido input").focus();
    return;
  }

  const email = document.getElementById("login-email").value.trim();
  let nome = nomePeloEmail(email);
  let saudacao = "Bem-vindo(a), ";
  if (modoCriarConta) {
    nome = document.getElementById("login-nome").value.trim();
    saudacao = "Conta criada! " + saudacao;
  }
  const usuario = { nome: nome, email: email };
  let armazenamento = sessionStorage;
  if (document.getElementById("login-lembrar").checked) armazenamento = localStorage;
  armazenamento.setItem("usuarioLogado", JSON.stringify(usuario));
  mensagemLogin(saudacao + nome + "! Voltando para a loja...");
  atualizarBotaoConta();

  setTimeout(function () {
    mostrarConectado(usuario);
    mensagemLogin("");
    formLogin.reset();
    fecharLogin();
  }, 2000);
});

if (lerUsuario()) mostrarConectado(lerUsuario());

document.getElementById("btn-sair").addEventListener("click", function () {
  localStorage.removeItem("usuarioLogado");
  sessionStorage.removeItem("usuarioLogado");
  atualizarBotaoConta();
  caixaConectado.hidden = true;
  cartaoForm.hidden = false;
  linhaTrocar.hidden = false;
  formLogin.reset();
  mensagemLogin("");
  document.getElementById("login-email").focus();
});

// Dias para o Natal
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);
let natal = new Date(hoje.getFullYear(), 11, 25);
if (hoje > natal) natal = new Date(hoje.getFullYear() + 1, 11, 25);
const faltam = Math.round((natal - hoje) / (24 * 60 * 60 * 1000));
escrever("dias-natal", faltam);
if (faltam === 0) {
  escrever("dias-texto", "Hoje é Natal!");
} else if (faltam === 1) {
  escrever("dias-texto", "dia para o Natal");
} else {
  escrever("dias-texto", "dias para o Natal");
}

// Abrir direto pelo link #entrar
if (window.location.hash === "#entrar") abrirLogin();