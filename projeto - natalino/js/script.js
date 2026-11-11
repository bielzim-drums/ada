// Ícones SVG (os desenhos ficam no <svg> escondido do index.html)
const SVG_NS = "http://www.w3.org/2000/svg";

function trocarIcone(botao, nome) {
  botao.querySelector("use").setAttribute("href", "#" + nome);
}

// Catálogo
const produtos = [
  // Panetones
  { id: 1, nome: "Panetone Trufado Estrela", categoria: "Panetones", preco: 69.99, imagem: "img/panetone-trufado-estrela.jpg",
    alt: "Panetone com uma fatia cortada num prato branco, diante de uma árvore de Natal iluminada", descricao: "Massa fofinha recheada com creme trufado de chocolate meio amargo.", destaque: true },

  { id: 2, nome: "Panetone Clássico de Frutas", categoria: "Panetones", preco: 44.90, imagem: "img/panetone-classico-frutas.jpg",
    alt: "Panetone de frutas aberto, com uma fatia cheia de frutas cristalizadas e uvas-passas na frente", descricao: "Receita tradicional da vovó, com frutas cristalizadas e uvas-passas.", destaque: false },

  { id: 3, nome: "Chocotone Gotas de Neve", categoria: "Panetones", preco: 49.90, imagem: "img/chocotone-gotas-de-neve.jpg",
    alt: "Panetone cortado mostrando a massa fofinha e amarela por dentro", descricao: "Recheado de gotas de chocolate branco que derretem na boca.", destaque: true },

  { id: 4, nome: "Panetone de Doce de Leite", categoria: "Panetones", preco: 62.90, imagem: "img/panetone-doce-de-leite.jpg",
    alt: "Dois panetones caseiros em forminhas de papel, com luzes de Natal ao fundo", descricao: "Recheio cremoso de doce de leite e cobertura de chocolate ao leite.", destaque: false },

  { id: 5, nome: "Mini Panetone Sininho", categoria: "Panetones", preco: 14.90, imagem: "img/mini-panetone-sininho.jpg",
    alt: "Vários mini panetones em forminhas de papel sobre uma grade", descricao: "Porção individual, perfeita para lembrancinhas de fim de ano.", destaque: false },

  { id: 6, nome: "Panetone de Pistache", categoria: "Panetones", preco: 89.90, imagem: "img/panetone-pistache.jpg",
    alt: "Fatia de bolo coberta de pistaches picados num prato branco", descricao: "Creme de pistache por dentro e pistaches crocantes por cima.", destaque: false },

  { id: 7, nome: "Chocotone Duplo Chocolate", categoria: "Panetones", preco: 54.90, imagem: "img/chocotone-duplo-chocolate.jpg",
    alt: "Pão doce de chocolate escuro e redondo num prato verde", descricao: "Massa de cacau com pedaços generosos de chocolate ao leite.", destaque: false },

  { id: 8, nome: "Panetone de Frutas Vermelhas", categoria: "Panetones", preco: 59.90, imagem: "img/panetone-frutas-vermelhas.jpg",
    alt: "Fatia de panetone com frutas cristalizadas num prato escuro", descricao: "Geleia artesanal de morango, framboesa e amora em cada fatia.", destaque: false },
    
  { id: 9, nome: "Panetone Salgado de Queijo", categoria: "Panetones", preco: 52.90, imagem: "img/panetone-salgado-queijo.jpg",
    alt: "Pão de queijo assado com gergelim, cortado ao meio, num prato", descricao: "Massa com queijo, tomate seco e ervas finas para a ceia.", destaque: false },

  { id: 10, nome: "Panetone Zero Açúcar", categoria: "Panetones", preco: 57.90, imagem: "img/panetone-zero-acucar.jpg",
    alt: "Pão doce italiano alto, em formato de estrela, cortado ao meio num prato", descricao: "Adoçado com xilitol e com gotas de chocolate 70% cacau.", destaque: false },

  // Biscoitos
  { id: 11, nome: "Biscoito Bonequinho de Gengibre", categoria: "Biscoitos", preco: 18.90, imagem: "img/biscoito-bonequinho-gengibre.jpg",
    alt: "Dois bonequinhos de biscoito de gengibre decorados com glacê azul, verde, vermelho e branco", descricao: "Seis bonequinhos de gengibre decorados à mão com glacê real.", destaque: true },

  { id: 12, nome: "Estrelas de Canela", categoria: "Biscoitos", preco: 16.50, imagem: "img/estrelas-de-canela.jpg",
    alt: "Biscoitos em formato de estrela com cobertura branca, lado a lado", descricao: "Amanteigados em formato de estrela, cobertos de açúcar e canela.", destaque: false },

  { id: 13, nome: "Casinha de Gengibre para Montar", categoria: "Biscoitos", preco: 79.90, imagem: "img/casinha-de-gengibre.jpg",
    alt: "Casinha de biscoito de gengibre com telhado de glacê branco e balas coloridas", descricao: "Kit com paredes, telhado e glacê para montar em família.", destaque: true },

  { id: 14, nome: "Bengalinhas de Açúcar", categoria: "Biscoitos", preco: 12.90, imagem: "img/bengalinhas-de-acucar.jpg",
    alt: "Bengalinhas de açúcar listradas de vermelho e branco sobre um fundo escuro", descricao: "Pacote com 10 bengalinhas listradas sabor hortelã.", destaque: false },

  { id: 15, nome: "Lata de Flocos Amanteigados", categoria: "Biscoitos", preco: 34.90, imagem: "img/lata-flocos-amanteigados.jpg",
    alt: "Biscoitos em formato de floco de neve com glacê branco e açúcar cristal", descricao: "Lata decorada com 300 g de biscoitos em formato de floco de neve.", destaque: false },

  { id: 16, nome: "Pinheirinhos de Chocolate Branco", categoria: "Biscoitos", preco: 21.90, imagem: "img/pinheirinhos-chocolate-branco.jpg",
    alt: "Biscoito em forma de pinheiro com cobertura clara e bolinhas vermelhas, sobre uma grade", descricao: "Biscoitos em forma de pinheiro banhados em chocolate branco.", destaque: false },
  { id: 17, nome: "Cookies Natalinos com Gotas", categoria: "Biscoitos", preco: 19.90, imagem: "img/cookies-natalinos-gotas.jpg",
    alt: "Prato branco com uma pilha de cookies com gotas de chocolate", descricao: "Cookies macios com gotas de chocolate vermelhas e verdes.", destaque: false },
  { id: 18, nome: "Corações de Mel com Especiarias", categoria: "Biscoitos", preco: 23.90, imagem: "img/coracoes-de-mel.jpg",
    alt: "Coração de pão de mel decorado com glacê branco e escrita em alemão", descricao: "Receita alemã com mel, cravo, canela e noz-moscada.", destaque: false },
  { id: 19, nome: "Guirlanda de Biscoitos", categoria: "Biscoitos", preco: 49.90, imagem: "img/guirlanda-de-biscoitos.jpg",
    alt: "Biscoitos natalinos sortidos num prato ao lado de uma guirlanda de pinheiro com velas vermelhas acesas", descricao: "Guirlanda comestível com 12 biscoitos decorados e laço de fita.", destaque: false },
  { id: 20, nome: "Biscoitão Bom Velhinho", categoria: "Biscoitos", preco: 9.90, imagem: "img/biscoitao-bom-velhinho.jpg",
    alt: "Biscoito grande com o rosto do Papai Noel desenhado em glacê branco e açúcar vermelho", descricao: "Biscoito grande decorado com o rosto sorridente do Papai Noel.", destaque: false },
  // Bolos e Tortas
  { id: 21, nome: "Bolo Tronco de Natal", categoria: "Bolos e Tortas", preco: 98.90, imagem: "img/bolo-tronco-de-natal.jpg",
    alt: "Bolo tronco de chocolate decorado sobre uma tábua, com luzinhas de Natal ao fundo", descricao: "Rocambole de chocolate em forma de tronco, com ganache e açúcar de neve.", destaque: true },
  { id: 22, nome: "Naked Cake de Frutas Vermelhas", categoria: "Bolos e Tortas", preco: 119.90, imagem: "img/naked-cake-frutas-vermelhas.jpg",
    alt: "Bolo de camadas com recheio de creme e morangos frescos por cima", descricao: "Camadas de pão de ló, creme leve e frutas vermelhas frescas.", destaque: false },
  { id: 23, nome: "Torta de Nozes Caramelizadas", categoria: "Bolos e Tortas", preco: 84.90, imagem: "img/torta-nozes-caramelizadas.jpg",
    alt: "Fatia de torta de nozes-pecã caramelizadas num prato de borda verde", descricao: "Massa crocante com recheio de nozes e caramelo dourado.", destaque: false },
  { id: 24, nome: "Bolo Floresta Branca", categoria: "Bolos e Tortas", preco: 109.90, imagem: "img/bolo-floresta-branca.jpg",
    alt: "Bolo coberto de chantilly com cerejas vermelhas e raspas de chocolate", descricao: "Pão de ló com chantilly, cerejas e raspas de chocolate branco.", destaque: true },
  { id: 25, nome: "Torta Gelada de Panetone", categoria: "Bolos e Tortas", preco: 74.90, imagem: "img/torta-gelada-panetone.jpg",
    alt: "Taça de sobremesa gelada em camadas com creme e frutas vermelhas", descricao: "Camadas de panetone, creme de baunilha e calda de frutas.", destaque: false },
  { id: 26, nome: "Cupcakes Árvore de Natal", categoria: "Bolos e Tortas", preco: 42.90, imagem: "img/cupcakes-arvore-de-natal.jpg",
    alt: "Cupcakes natalinos decorados com folhas de azevinho, laço vermelho e glacê", descricao: "Caixa com 6 cupcakes com cobertura verde e estrela dourada.", destaque: false },
  { id: 27, nome: "Bolo de Especiarias com Laranja", categoria: "Bolos e Tortas", preco: 64.90, imagem: "img/bolo-especiarias-laranja.jpg",
    alt: "Bolinho escuro de especiarias em formato de coroa com cobertura branca escorrendo", descricao: "Bolo úmido de canela e gengibre com calda de laranja.", destaque: false },
  { id: 28, nome: "Torta Holandesa Natalina", categoria: "Bolos e Tortas", preco: 92.90, imagem: "img/torta-holandesa-natalina.jpg",
    alt: "Fatia de torta gelada em camadas de biscoito e creme, com cobertura de manga, num prato branco", descricao: "Creme de baunilha, borda de biscoito e cobertura de chocolate.", destaque: false },
  { id: 29, nome: "Pudim com Calda de Frutas", categoria: "Bolos e Tortas", preco: 54.90, imagem: "img/pudim-calda-de-frutas.jpg",
    alt: "Pudim de leite com calda de caramelo num prato branco", descricao: "Pudim de leite cremoso com calda de frutas cristalizadas.", destaque: false },
  { id: 30, nome: "Bolo Boneco de Neve", categoria: "Bolos e Tortas", preco: 129.90, imagem: "img/bolo-boneco-de-neve.jpg",
    alt: "Boneco de neve com cachecol listrado decorando um bolo branco", descricao: "Bolo branco de coco decorado como um simpático boneco de neve.", destaque: false },
  // Cestas e Kits
  { id: 31, nome: "Cesta Ceia Feliz", categoria: "Cestas e Kits", preco: 189.90, imagem: "img/cesta-ceia-feliz.jpg",
    alt: "Prato com biscoitos natalinos tchecos polvilhados de açúcar sobre uma toalha vermelha", descricao: "Panetone, suco de uva integral, biscoitos e chocolates da casa.", destaque: true },
  { id: 32, nome: "Kit Presente Sininho Dourado", categoria: "Cestas e Kits", preco: 79.90, imagem: "img/kit-presente-sininho-dourado.jpg",
    alt: "Caixa de presente embrulhada em papel claro com fita de cetim vermelha", descricao: "Caixa dourada com mini panetone, cookies e chocolate quente.", destaque: false },
  { id: 33, nome: "Cesta Café da Manhã de Natal", categoria: "Cestas e Kits", preco: 149.90, imagem: "img/cesta-cafe-da-manha.jpg",
    alt: "Mesa de café da manhã com uma cesta de croissants e pães doces, ovos e café", descricao: "Pães doces, geleia, biscoitos, mel e suco de uva.", destaque: false },
  { id: 34, nome: "Caixa Surpresa do Papai Noel", categoria: "Cestas e Kits", preco: 99.90, imagem: "img/caixa-surpresa-papai-noel.jpg",
    alt: "Caixa de presente vermelha com laço dourado sobre confetes de estrelinhas", descricao: "Uma seleção secreta com 8 doces escolhidos pelos nossos elfos.", destaque: false },
  { id: 35, nome: "Kit Decore Seus Biscoitos", categoria: "Cestas e Kits", preco: 59.90, imagem: "img/kit-decore-biscoitos.jpg",
    alt: "Biscoitos natalinos em formatos variados decorados com açúcar colorido vermelho e verde", descricao: "12 biscoitos lisos, glacês coloridos e confeitos para decorar.", destaque: false },
  { id: 36, nome: "Meia de Natal Recheada", categoria: "Cestas e Kits", preco: 44.90, imagem: "img/meia-de-natal-recheada.jpg",
    alt: "Meias de Natal penduradas numa lareira acesa e enfeitada", descricao: "Meia de feltro cheia de chocolates e bengalinhas.", destaque: false },
  { id: 37, nome: "Cesta Premium Estrela Guia", categoria: "Cestas e Kits", preco: 299.90, imagem: "img/cesta-premium-estrela-guia.jpg",
    alt: "Mesa de festa natalina com bolos, cupcakes e doces diante de uma árvore de Natal iluminada", descricao: "Panetone de pistache, torta, chocolates finos e suco de uva.", destaque: false },
  { id: 38, nome: "Kit Chocolate Quente em Família", categoria: "Cestas e Kits", preco: 89.90, imagem: "img/kit-chocolate-quente-familia.jpg",
    alt: "Duas xícaras de chocolate quente sobre a mesa, com marshmallows num pratinho", descricao: "Mistura de cacau, marshmallows e duas canecas temáticas.", destaque: false },
  { id: 39, nome: "Lata Lembrancinha Casa do Doce", categoria: "Cestas e Kits", preco: 39.90, imagem: "img/lata-lembrancinha.jpg",
    alt: "Biscoitos amanteigados sortidos em forminhas de papel, dentro de uma lata", descricao: "Lata colecionável com biscoitos e bombons sortidos.", destaque: false },
  { id: 40, nome: "Calendário do Advento de Doces", categoria: "Cestas e Kits", preco: 119.90, imagem: "img/calendario-do-advento.jpg",
    alt: "Calendário do advento em forma de casas antigas com janelinhas numeradas", descricao: "24 portinhas com um doce surpresa em cada uma.", destaque: false },
  // Chocolates e Bebidas
  { id: 41, nome: "Chocolate Quente Cremoso", categoria: "Chocolates e Bebidas", preco: 29.90, imagem: "img/chocolate-quente-cremoso.jpg",
    alt: "Xícara de chocolate quente com chantilly e canela por cima", descricao: "Mistura em pó para preparar 10 xícaras bem cremosas.", destaque: true },
  { id: 42, nome: "Bombons Bolas de Natal", categoria: "Chocolates e Bebidas", preco: 39.90, imagem: "img/bombons-bolas-de-natal.jpg",
    alt: "Tigela cheia de bombons redondos embrulhados em papel verde e dourado", descricao: "Caixa com 12 bombons coloridos em formato de bola de Natal.", destaque: false },
  { id: 43, nome: "Papai Noel de Chocolate", categoria: "Chocolates e Bebidas", preco: 24.90, imagem: "img/papai-noel-de-chocolate.jpg",
    alt: "Papai Noel de chocolate embrulhado em papel alumínio vermelho, branco e dourado", descricao: "Figura de 150 g de chocolate ao leite embrulhada em papel brilhante.", destaque: false },
  { id: 44, nome: "Trufas de Panetone", categoria: "Chocolates e Bebidas", preco: 32.90, imagem: "img/trufas-de-panetone.jpg",
    alt: "Trufas de chocolate polvilhadas com cacau em pó", descricao: "Seis trufas recheadas com creme de panetone e frutas.", destaque: false },
  { id: 45, nome: "Suco de Uva Natalino", categoria: "Chocolates e Bebidas", preco: 22.90, imagem: "img/suco-de-uva-natalino.jpg",
    alt: "Copo de vidro com suco de uva tinto, sobre fundo branco", descricao: "Garrafa de 1 litro de suco integral de uva tinta.", destaque: false },
  { id: 46, nome: "Barra Estrela de Natal", categoria: "Chocolates e Bebidas", preco: 19.90, imagem: "img/barra-estrela-de-natal.jpg",
    alt: "Barra de chocolate ao leite com castanhas, cortada ao meio mostrando o recheio", descricao: "Chocolate 50% cacau com castanhas e frutas secas.", destaque: false },
  { id: 47, nome: "Pirulitos Floco de Neve", categoria: "Chocolates e Bebidas", preco: 27.90, imagem: "img/pirulitos-floco-de-neve.jpg",
    alt: "Dois pirulitos de chocolate num prato branco", descricao: "Kit com 6 pirulitos de chocolate em formato de floco.", destaque: false },
  { id: 48, nome: "Chá de Especiarias Natalinas", categoria: "Chocolates e Bebidas", preco: 26.90, imagem: "img/cha-especiarias-natalinas.jpg",
    alt: "Xícara de chá avermelhado de canela vista de cima", descricao: "Blend de canela, cravo, laranja e maçã com 20 sachês.", destaque: false },
  { id: 49, nome: "Marshmallows de Hortelã", categoria: "Chocolates e Bebidas", preco: 17.90, imagem: "img/marshmallows-de-hortela.jpg",
    alt: "Tigela de madeira com marshmallows caseiros em tom rosado", descricao: "Pote de marshmallows caseiros com um toque de hortelã.", destaque: false },
  { id: 50, nome: "Chocolate Branco com Cranberry", categoria: "Chocolates e Bebidas", preco: 21.90, imagem: "img/chocolate-branco-cranberry.jpg",
    alt: "Pedaços de chocolate branco com cranberries desidratadas e fios de chocolate escuro", descricao: "Barra artesanal com cranberries desidratadas.", destaque: false }
];

// Funções usadas também pelo login.js e pelo checkout.js
function acharPorId(lista, id) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) return lista[i];
  }
  return null;
}

function acharProduto(id) {
  return acharPorId(produtos, id);
}

function escrever(id, texto) {
  document.getElementById(id).textContent = texto;
}

function copiarModelo(id) {
  return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

function rotular(botao, texto) {
  botao.setAttribute("aria-label", texto);
  botao.title = texto;
}

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// O erro de cada campo fica no elemento "erro-" + id do campo
function mostrarErro(idCampo, texto) {
  const campo = document.getElementById(idCampo);
  escrever("erro-" + idCampo, texto);
  campo.closest(".campo, .login-campo").classList.toggle("invalido", texto !== "");
  campo.setAttribute("aria-invalid", texto !== "");
}

// Devolve true se o campo está certo
function conferir(idCampo, temErro, texto) {
  if (temErro) {
    mostrarErro(idCampo, texto);
    return false;
  }
  mostrarErro(idCampo, "");
  return true;
}

const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function doisDigitos(numero) {
  return String(numero).padStart(2, "0");
}

// "Açúcar" vira "acucar"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Passou do último volta para o primeiro, e o contrário
function darAVolta(indice, total) {
  if (indice >= total) return 0;
  if (indice < 0) return total - 1;
  return indice;
}

// Aviso rápido (toast)
const aviso = document.getElementById("toast");
let tempoAviso;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  clearTimeout(tempoAviso);
  tempoAviso = setTimeout(function () {
    aviso.classList.remove("visivel");
  }, 2200);
}

// Janelas (modal, lightbox, carrinho, login, checkout)
let janelaAberta = null;
let quemAbriu = null;
let aoFecharJanela = null;

function elementosFocaveis(janela) {
  const visiveis = [];
  janela.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach(function (elemento) {
    if (elemento.getClientRects().length > 0) visiveis.push(elemento);
  });
  return visiveis;
}

function abrirJanela(janela, primeiroFoco, aoFechar) {
  quemAbriu = document.activeElement;
  janelaAberta = janela;
  aoFecharJanela = aoFechar || null;
  janela.classList.add("aberto");
  document.body.style.overflow = "hidden";
  if (primeiroFoco) {
    primeiroFoco.focus();
  } else {
    elementosFocaveis(janela)[0].focus();
  }
}

function fecharJanela() {
  if (!janelaAberta) return;
  janelaAberta.classList.remove("aberto");
  document.body.style.overflow = "";
  if (aoFecharJanela) aoFecharJanela();
  janelaAberta = null;
  if (quemAbriu && document.body.contains(quemAbriu)) quemAbriu.focus();
  quemAbriu = null;
}

function fecharAoClicarFora(janela) {
  janela.addEventListener("click", function (evento) {
    if (evento.target === janela) fecharJanela();
  });
}

// Esc fecha; o Tab fica preso dentro da janela aberta
document.addEventListener("keydown", function (evento) {
  if (!janelaAberta) return;
  if (evento.key === "Escape") {
    fecharJanela();
    return;
  }
  if (evento.key !== "Tab") return;

  const lista = elementosFocaveis(janelaAberta);
  let ponta = lista[lista.length - 1];
  let destino = lista[0];
  if (evento.shiftKey) {
    ponta = lista[0];
    destino = lista[lista.length - 1];
  }
  if (document.activeElement === ponta || !janelaAberta.contains(document.activeElement)) {
    evento.preventDefault();
    destino.focus();
  }
});

// Menu hambúrguer
const botaoMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

botaoMenu.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  if (aberto) {
    botaoMenu.setAttribute("aria-label", "Fechar menu");
    trocarIcone(botaoMenu, "ic-fechar");
  } else {
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    trocarIcone(botaoMenu, "ic-menu");
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menu.classList.contains("aberto") && !janelaAberta) {
    botaoMenu.click();
    botaoMenu.focus();
  }
});

// Modo Noite de Natal (o tema salvo é aplicado no começo do <body>)
const botaoTema = document.getElementById("btn-tema");

function atualizarBotaoTema() {
  if (document.body.classList.contains("noite")) {
    trocarIcone(botaoTema, "ic-sol");
    rotular(botaoTema, "Voltar ao modo claro");
  } else {
    trocarIcone(botaoTema, "ic-lua");
    rotular(botaoTema, "Ativar modo Noite de Natal");
  }
}

atualizarBotaoTema();
botaoTema.addEventListener("click", function () {
  if (document.body.classList.toggle("noite")) {
    localStorage.setItem("tema", "noite");
  } else {
    localStorage.setItem("tema", "dia");
  }
  atualizarBotaoTema();
});

// Música e sininho
const musica = new Audio("sons/dingo-bell.mp3");
musica.loop = true;
musica.volume = 0.3;
const botaoMusica = document.getElementById("btn-musica");

function atualizarBotaoMusica() {
  const tocando = !musica.paused;
  botaoMusica.classList.toggle("tocando", tocando);
  document.querySelector(".hero").classList.toggle("com-musica", tocando);
  if (tocando) {
    rotular(botaoMusica, "Pausar música de Natal");
  } else {
    rotular(botaoMusica, "Tocar música de Natal");
  }
}

// O navegador bloqueia som automático: tenta de novo no primeiro clique
function tocarMusica() {
  musica.play().catch(function () {
    document.addEventListener("click", tocarMusica, { once: true });
  });
}

atualizarBotaoMusica();
musica.addEventListener("play", atualizarBotaoMusica);
musica.addEventListener("pause", atualizarBotaoMusica);

botaoMusica.addEventListener("click", function () {
  if (musica.paused) {
    musica.play().catch(function () {});
    localStorage.setItem("musicaTocando", "sim");
  } else {
    musica.pause();
    localStorage.setItem("musicaTocando", "nao");
  }
});

// Continua de onde parou (se o tempo salvo passar do fim, começa do zero)
if (localStorage.getItem("musicaTocando") === "sim") {
  const tempoSalvo = Number(localStorage.getItem("musicaTempo")) || 0;
  musica.addEventListener("loadedmetadata", function () {
    if (tempoSalvo < musica.duration) {
      musica.currentTime = tempoSalvo;
    } else {
      musica.currentTime = 0;
    }
  }, { once: true });
  tocarMusica();
}

window.addEventListener("pagehide", function () {
  localStorage.setItem("musicaTempo", musica.currentTime);
});

function tocarSino() {
  const som = new Audio("sons/sino.mp3");
  som.volume = 0.4;
  som.play().catch(function () {});
}

// Voltar ao topo
const botaoTopo = document.getElementById("topo");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    botaoTopo.style.display = "flex";
  } else {
    botaoTopo.style.display = "none";
  }
}, { passive: true });

botaoTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animação ao rolar
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".revelar").forEach(function (elemento) {
  observador.observe(elemento);
});

// Slideshow
const slides = document.querySelectorAll(".slide");
const areaSlideshow = document.querySelector(".slideshow");
const areaIndicadores = document.getElementById("indicadores");
let slideAtual = 0;
let temporizador = null;
let pausado = false;

for (let i = 0; i < slides.length; i++) {
  const bolinha = document.createElement("button");
  bolinha.setAttribute("aria-label", "Ir para o slide " + (i + 1));
  bolinha.addEventListener("click", function () {
    irParaSlide(i);
  });
  areaIndicadores.appendChild(bolinha);
}
const bolinhas = areaIndicadores.querySelectorAll("button");

function mostrarSlide(indice) {
  slideAtual = darAVolta(indice, slides.length);
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.toggle("ativo", i === slideAtual);
    bolinhas[i].classList.toggle("ativo", i === slideAtual);
    if (i === slideAtual) {
      bolinhas[i].setAttribute("aria-current", "true");
    } else {
      bolinhas[i].removeAttribute("aria-current");
    }
  }
}

function irParaSlide(indice) {
  mostrarSlide(indice);
  clearInterval(temporizador);
  if (!pausado) {
    temporizador = setInterval(function () {
      mostrarSlide(slideAtual + 1);
    }, 5000);
  }
}

// Pausa enquanto o mouse ou o foco do teclado está no slideshow
function pausar() {
  pausado = true;
  clearInterval(temporizador);
}

function retomar(evento) {
  if (areaSlideshow.matches(":hover")) return;
  let focoDentro;
  if (evento.type === "focusout") {
    focoDentro = areaSlideshow.contains(evento.relatedTarget);
  } else {
    focoDentro = areaSlideshow.querySelector(":focus-visible") !== null;
  }
  if (focoDentro) return;
  pausado = false;
  irParaSlide(slideAtual);
}

areaSlideshow.addEventListener("mouseenter", pausar);
areaSlideshow.addEventListener("focusin", pausar);
areaSlideshow.addEventListener("mouseleave", retomar);
areaSlideshow.addEventListener("focusout", retomar);
document.getElementById("proximo").addEventListener("click", function () {
  irParaSlide(slideAtual + 1);
});
document.getElementById("anterior").addEventListener("click", function () {
  irParaSlide(slideAtual - 1);
});
irParaSlide(0);

// Parallax do banner (no máximo uma vez por quadro da tela)
const camadas = document.querySelectorAll("[data-velocidade]");
let agendado = false;

function moverCamadas() {
  agendado = false;
  const rolagem = window.scrollY;
  if (rolagem > window.innerHeight) return;
  camadas.forEach(function (camada) {
    camada.style.transform = "translateY(" + rolagem * Number(camada.dataset.velocidade) + "px)";
  });
}

if (!menosMovimento) {
  window.addEventListener("scroll", function () {
    if (!agendado) {
      agendado = true;
      requestAnimationFrame(moverCamadas);
    }
  }, { passive: true });
}

// Cards de produto (do <template id="tpl-card">)
function criarCard(produto, indice) {
  const card = copiarModelo("tpl-card");
  card.style.animationDelay = Math.min(indice, 12) * 50 + "ms";
  card.querySelector(".selo").hidden = !produto.destaque;

  const imagem = card.querySelector("img");
  imagem.src = produto.imagem;
  imagem.alt = produto.alt;
  card.querySelector(".card-categoria").textContent = produto.categoria;
  card.querySelector("h3").textContent = produto.nome;
  card.querySelector("p").textContent = produto.descricao;
  card.querySelector(".preco").textContent = formatarPreco(produto.preco);
  card.querySelector(".parcelas").textContent = "ou 3x de " + formatarPreco(produto.preco / 3) + " sem juros";
  card.querySelector(".btn-comprar").dataset.id = produto.id;
  card.querySelectorAll(".btn-detalhes").forEach(function (botao) {
    botao.dataset.id = produto.id;
    botao.setAttribute("aria-label", "Ver detalhes de " + produto.nome);
  });
  return card;
}

function mostrarProdutos(lista, area) {
  area.textContent = "";
  if (lista.length === 0) {
    area.appendChild(document.getElementById("tpl-vazio").content.cloneNode(true));
  }
  for (let i = 0; i < lista.length; i++) {
    area.appendChild(criarCard(lista[i], i));
  }
}

mostrarProdutos(produtos.filter(function (produto) {
  return produto.destaque;
}), document.getElementById("lista-destaques"));

// Filtro, busca e ordenação
const listaProdutos = document.getElementById("lista-produtos");
const campoBusca = document.getElementById("busca");
const seletorCategoria = document.getElementById("categoria");
const seletorOrdem = document.getElementById("ordem");

function filtrar() {
  const texto = normalizar(campoBusca.value.trim());
  const categoria = seletorCategoria.value;
  const ordem = seletorOrdem.value;

  const resultado = produtos.filter(function (produto) {
    return normalizar(produto.nome).includes(texto) && (categoria === "todas" || produto.categoria === categoria);
  });
  resultado.sort(function (a, b) {
    if (ordem === "menor-preco") return a.preco - b.preco;
    if (ordem === "maior-preco") return b.preco - a.preco;
    if (ordem === "nome") return a.nome.localeCompare(b.nome);
    return 0;
  });

  mostrarProdutos(resultado, listaProdutos);
  escrever("contador", "Mostrando " + resultado.length + " de " + produtos.length + " produtos");
}

campoBusca.addEventListener("input", filtrar);
seletorCategoria.addEventListener("change", filtrar);
seletorOrdem.addEventListener("change", filtrar);
filtrar();

// Modal de detalhes
const modal = document.getElementById("modal-produto");

function abrirModal(id) {
  const produto = acharProduto(id);
  const imagem = document.getElementById("modal-imagem");
  imagem.src = produto.imagem;
  imagem.alt = produto.alt;
  escrever("modal-categoria", produto.categoria);
  escrever("modal-nome", produto.nome);
  escrever("modal-descricao", produto.descricao);
  escrever("modal-preco", formatarPreco(produto.preco));
  document.getElementById("modal-comprar").dataset.id = produto.id;
  abrirJanela(modal, modal.querySelector(".btn-fechar"));
}

modal.querySelector(".btn-fechar").addEventListener("click", fecharJanela);
fecharAoClicarFora(modal);

// Carrinho (no localStorage, cada item é { id, qtd })
function lerCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem("carrinho"));
    if (Array.isArray(salvo)) return salvo;
  } catch (erro) {}
  return [];
}

let carrinho = lerCarrinho();
const painelCarrinho = document.getElementById("carrinho");
const fundoEscuro = document.getElementById("fundo-escuro");
const listaCarrinho = document.getElementById("lista-carrinho");
const avisoPedido = document.getElementById("aviso-pedido");
const FRETE_GRATIS_A_PARTIR = 150;

function calcularEntrega(subtotal) {
  if (subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR) return 0;
  return 12;
}

// Soma o preço e a quantidade de tudo que está no carrinho
function somarCarrinho() {
  let subtotal = 0;
  let quantidade = 0;
  carrinho.forEach(function (item) {
    const produto = acharProduto(item.id);
    if (produto) {
      subtotal = subtotal + produto.preco * item.qtd;
      quantidade = quantidade + item.qtd;
    }
  });
  return { subtotal: subtotal, quantidade: quantidade };
}

function mudouCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function esvaziarCarrinho() {
  tocarSino();
  carrinho = [];
  mudouCarrinho();
}

function adicionarAoCarrinho(id) {
  const item = acharPorId(carrinho, id);
  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ id: id, qtd: 1 });
  }
  mudouCarrinho();
  mostrarAviso(acharProduto(id).nome + " foi para o carrinho!");
  tocarSino();

  const contadorTopo = document.getElementById("qtd-carrinho");
  contadorTopo.classList.remove("pulo");
  void contadorTopo.offsetWidth; // reinicia a animação
  contadorTopo.classList.add("pulo");
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(function (item) {
    return item.id !== id;
  });
  mudouCarrinho();
}

function alterarQuantidade(id, mudanca) {
  const item = acharPorId(carrinho, id);
  item.qtd = item.qtd + mudanca;
  if (item.qtd <= 0) {
    removerDoCarrinho(id);
  } else {
    mudouCarrinho();
  }
}

function criarItemCarrinho(produto, qtd) {
  const li = copiarModelo("tpl-item-carrinho");
  li.querySelector("img").src = produto.imagem;
  li.querySelector("h3").textContent = produto.nome;
  li.querySelector("small").textContent = formatarPreco(produto.preco) + " cada";
  li.querySelector(".quantidade strong").textContent = qtd;
  li.querySelectorAll("button").forEach(function (botao) {
    botao.dataset.id = produto.id;
  });
  li.querySelector(".btn-remover").setAttribute("aria-label", "Remover " + produto.nome);
  return li;
}

function atualizarCarrinho() {
  listaCarrinho.textContent = "";
  carrinho.forEach(function (item) {
    const produto = acharProduto(item.id);
    if (produto) listaCarrinho.appendChild(criarItemCarrinho(produto, item.qtd));
  });
  if (carrinho.length === 0) {
    listaCarrinho.appendChild(document.getElementById("tpl-carrinho-vazio").content.cloneNode(true));
  }

  const soma = somarCarrinho();
  const subtotal = soma.subtotal;
  const entrega = calcularEntrega(subtotal);
  escrever("qtd-carrinho", soma.quantidade);
  escrever("subtotal-carrinho", formatarPreco(subtotal));
  if (entrega > 0) {
    escrever("entrega-carrinho", formatarPreco(entrega));
  } else {
    escrever("entrega-carrinho", "Grátis");
  }
  escrever("total-carrinho", formatarPreco(subtotal + entrega));

  // Barrinha do frete grátis
  document.getElementById("frete-progresso").style.width = Math.min((subtotal / FRETE_GRATIS_A_PARTIR) * 100, 100) + "%";
  if (subtotal < FRETE_GRATIS_A_PARTIR) {
    escrever("frete-texto", "Faltam " + formatarPreco(FRETE_GRATIS_A_PARTIR - subtotal) + " para ganhar entrega grátis");
  } else {
    escrever("frete-texto", "Oba! Você ganhou entrega grátis!");
  }
}

document.getElementById("btn-carrinho").addEventListener("click", function () {
  fundoEscuro.classList.add("aberto");
  avisoPedido.textContent = "";
  abrirJanela(painelCarrinho, document.getElementById("fechar-carrinho"), function () {
    fundoEscuro.classList.remove("aberto");
  });
});
document.getElementById("fechar-carrinho").addEventListener("click", fecharJanela);
fundoEscuro.addEventListener("click", fecharJanela);

listaCarrinho.addEventListener("click", function (evento) {
  const botao = evento.target.closest("button");
  if (!botao) return;
  const id = Number(botao.dataset.id);
  if (botao.dataset.acao === "mais") {
    alterarQuantidade(id, 1);
  } else if (botao.dataset.acao === "menos") {
    alterarQuantidade(id, -1);
  } else {
    removerDoCarrinho(id);
  }
  // a lista foi redesenhada e o botão sumiu: o foco vai para o ✕
  if (!document.body.contains(botao)) {
    document.getElementById("fechar-carrinho").focus();
  }
});

document.getElementById("finalizar-pedido").addEventListener("click", function () {
  if (carrinho.length === 0) {
    avisoPedido.textContent = "Adicione algum doce antes de finalizar.";
  } else {
    abrirCheckout();
  }
});

atualizarCarrinho();

// Botões dos cards (criados pelo JS, por isso o clique é ouvido no documento)
document.addEventListener("click", function (evento) {
  const botaoComprar = evento.target.closest(".btn-comprar");
  const botaoDetalhes = evento.target.closest(".btn-detalhes");
  if (botaoComprar) {
    adicionarAoCarrinho(Number(botaoComprar.dataset.id));
  } else if (botaoDetalhes) {
    abrirModal(Number(botaoDetalhes.dataset.id));
  }
});

// Contagem regressiva
function atualizarContagem() {
  const agora = new Date();
  const ehNatal = agora.getMonth() === 11 && agora.getDate() === 25;
  let natal = new Date(agora.getFullYear(), 11, 25);
  if (agora > natal && !ehNatal) {
    natal = new Date(agora.getFullYear() + 1, 11, 25);
  }
  let falta = natal - agora;
  if (ehNatal) falta = 0;
  const dias = Math.floor(falta / (1000 * 60 * 60 * 24));

  escrever("dias", dias);
  escrever("horas", doisDigitos(Math.floor(falta / (1000 * 60 * 60)) % 24));
  escrever("minutos", doisDigitos(Math.floor(falta / (1000 * 60)) % 60));
  escrever("segundos", doisDigitos(Math.floor(falta / 1000) % 60));
  if (ehNatal) {
    escrever("mensagem-natal", "Hoje é Natal! Feliz Natal para você e sua família!");
    escrever("faltam-dias", "Hoje é Natal!");
  } else {
    escrever("mensagem-natal", "Ainda dá tempo de encomendar os doces da sua ceia!");
    escrever("faltam-dias", "Faltam " + dias + " dias para o Natal");
  }
}

atualizarContagem();
setInterval(atualizarContagem, 1000);

// Lightbox da galeria
const lightbox = document.getElementById("lightbox");
const fotos = document.querySelectorAll(".foto");
const imagemGrande = document.getElementById("lightbox-imagem");
let fotoAtual = 0;

function mostrarFoto(indice) {
  fotoAtual = darAVolta(indice, fotos.length);
  const img = fotos[fotoAtual].querySelector("img");
  imagemGrande.src = img.src;
  imagemGrande.alt = img.alt;
  escrever("lightbox-legenda", (fotoAtual + 1) + "/" + fotos.length + " · " + fotos[fotoAtual].querySelector("figcaption").textContent);
}

for (let i = 0; i < fotos.length; i++) {
  fotos[i].querySelector("button").addEventListener("click", function () {
    mostrarFoto(i);
    abrirJanela(lightbox, lightbox.querySelector(".btn-fechar"));
  });
}

lightbox.querySelector(".btn-fechar").addEventListener("click", fecharJanela);
fecharAoClicarFora(lightbox);
document.getElementById("foto-anterior").addEventListener("click", function () {
  mostrarFoto(fotoAtual - 1);
});
document.getElementById("foto-proxima").addEventListener("click", function () {
  mostrarFoto(fotoAtual + 1);
});

document.addEventListener("keydown", function (evento) {
  if (!lightbox.classList.contains("aberto")) return;
  if (evento.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
  if (evento.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
});

// Formulário de contato
const formulario = document.getElementById("form-contato");
const mensagemForm = document.getElementById("mensagem-form");

function validar() {
  const email = document.getElementById("email").value.trim();
  const nomeOk = conferir("nome", document.getElementById("nome").value.trim().length < 3, "Digite seu nome (pelo menos 3 letras).");
  let emailOk;
  if (email === "") {
    emailOk = conferir("email", true, "O e-mail é obrigatório.");
  } else {
    emailOk = conferir("email", !FORMATO_EMAIL.test(email), "Digite um e-mail válido, como nome@exemplo.com.");
  }
  const assuntoOk = conferir("assunto", document.getElementById("assunto").value === "", "Escolha um assunto.");
  const mensagemOk = conferir("mensagem", document.getElementById("mensagem").value.trim().length < 10, "Escreva uma mensagem com pelo menos 10 caracteres.");
  return nomeOk && emailOk && assuntoOk && mensagemOk;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (validar()) {
    const primeiroNome = document.getElementById("nome").value.trim().split(" ")[0];
    mensagemForm.className = "mensagem-form sucesso";
    mensagemForm.textContent = "Obrigado, " + primeiroNome + "! Sua mensagem chegou à fábrica do Papai Noel. Responderemos em breve.";
    tocarSino();
    formulario.reset();
  } else {
    mensagemForm.className = "mensagem-form falha";
    mensagemForm.textContent = "Ops! Confira os campos destacados em vermelho.";
    formulario.querySelector('[aria-invalid="true"]').focus();
  }
});

formulario.querySelectorAll("input, select, textarea").forEach(function (campo) {
  campo.addEventListener("input", function () {
    mostrarErro(campo.id, "");
  });
});

// Navegação entre as páginas (cada <section class="pagina"> é escolhida pelo #)
const paginas = document.querySelectorAll(".pagina");
paginas.forEach(function (pagina) {
  pagina.tabIndex = -1;
});
const linksMenu = document.querySelectorAll(".menu a");
const nomesPaginas = { inicio: "Home", produtos: "Produtos", sobre: "Sobre nós", galeria: "Galeria", contato: "Contato" };

function mostrarPagina(evento) {
  // "#produtos?categoria=Biscoitos" → alvo "produtos", consulta "categoria=Biscoitos"
  const partes = window.location.hash.slice(1).split("?");
  let pagina = null;
  let destino = null;
  if (partes[0]) pagina = document.getElementById(partes[0]);
  // o # aponta para algo dentro de uma página (ex.: #ofertas)
  if (pagina && !pagina.classList.contains("pagina")) {
    destino = pagina;
    pagina = pagina.closest(".pagina");
  }
  if (!pagina) pagina = document.getElementById("inicio");

  paginas.forEach(function (p) {
    p.hidden = p !== pagina;
  });
  linksMenu.forEach(function (link) {
    const ativo = link.getAttribute("href") === "#" + pagina.id;
    link.classList.toggle("ativo", ativo);
    if (ativo) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  document.title = "Casa do Doce | " + nomesPaginas[pagina.id];

  if (pagina.id === "produtos" && partes[1]) {
    const categoria = new URLSearchParams(partes[1]).get("categoria");
    if (categoria) {
      seletorCategoria.value = categoria;
      filtrar();
    }
  }
  if (menu.classList.contains("aberto")) botaoMenu.click();
  if (destino) {
    destino.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
  }
  // só move o foco quando a pessoa troca de página (não ao carregar)
  if (evento) pagina.focus({ preventScroll: true });
}

document.querySelector(".pular").addEventListener("click", function (evento) {
  evento.preventDefault();
  document.querySelector(".pagina:not([hidden])").focus();
});

window.addEventListener("hashchange", mostrarPagina);
mostrarPagina();