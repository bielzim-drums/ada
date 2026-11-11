// Tela de pagamento (o cartão nunca é salvo)
const telaCheckout = copiarModelo("tpl-checkout");
document.body.appendChild(telaCheckout);

function ck(id) {
  return document.getElementById(id);
}

// Contas do pedido
const DESCONTO_PIX = 0.05;

const TEXTOS_FORMA = {
  pix: ["Já fiz o Pix", "No Pix você ganha 5% de desconto e o pedido é confirmado na hora."],
  cartao: ["Pagar com cartão", "Ao continuar, conferimos o cartão e confirmamos o pedido. Parcele em até 3x sem juros."],
  boleto: ["Gerar boleto", "O boleto vence em 3 dias úteis. Os doces são preparados depois que o pagamento for confirmado."]
};

function formaEscolhida() {
  return telaCheckout.querySelector('input[name="ck-pagamento"]:checked').value;
}

function calcularPedido() {
  const soma = somarCarrinho();
  const entrega = calcularEntrega(soma.subtotal);

  // o desconto do Pix vale só sobre os doces, não sobre a entrega
  let desconto = 0;
  if (formaEscolhida() === "pix") desconto = soma.subtotal * DESCONTO_PIX;

  return {
    entrega: entrega,
    desconto: desconto,
    itens: soma.quantidade,
    total: soma.subtotal + entrega - desconto
  };
}

function desenharResumo() {
  const conta = calcularPedido();
  const textos = TEXTOS_FORMA[formaEscolhida()];

  const nomes = [];
  carrinho.forEach(function (item) {
    const produto = acharProduto(item.id);
    if (produto) nomes.push(item.qtd + "× " + produto.nome);
  });

  if (conta.itens === 1) {
    escrever("ck-resumo-titulo", "1 doce no pedido");
  } else {
    escrever("ck-resumo-titulo", conta.itens + " doces no pedido");
  }
  escrever("ck-resumo-itens", nomes.join(" · "));

  let textoEntrega = "Entrega grátis";
  if (conta.entrega > 0) textoEntrega = "Entrega " + formatarPreco(conta.entrega);
  if (conta.desconto > 0) textoEntrega = textoEntrega + " · Pix −" + formatarPreco(conta.desconto);
  escrever("ck-resumo-entrega", textoEntrega);

  escrever("ck-total", formatarPreco(conta.total));
  escrever("ck-pix-valor", formatarPreco(conta.total));
  escrever("ck-enviar", textos[0] + " · " + formatarPreco(conta.total));
  escrever("ck-nota", textos[1]);

  // Parcelas (mantém a escolhida ao redesenhar)
  const parcelas = ck("ck-parcelas");
  const escolhida = parcelas.value || "1";
  parcelas.textContent = "";
  for (let n = 1; n <= 3; n++) {
    const opcao = document.createElement("option");
    opcao.value = n;
    opcao.textContent = n + "x de " + formatarPreco(conta.total / n) + " sem juros";
    parcelas.appendChild(opcao);
  }
  parcelas.value = escolhida;
}

// Erros dos campos (devolve true quando o campo está certo)
function marcarErro(campo, mensagem) {
  campo.closest(".ck-campo").querySelector(".ck-erro").textContent = mensagem;
  campo.setAttribute("aria-invalid", mensagem !== "");
  return mensagem === "";
}

function conferirCampo(campo, certo, mensagem) {
  if (certo) mensagem = "";
  return marcarErro(campo, mensagem);
}

function limparErros(area) {
  area.querySelectorAll(".ck-campo input").forEach(function (campo) {
    marcarErro(campo, "");
  });
}

function apagarErroDoCampo(evento) {
  const campo = evento.target;
  if (campo.matches("input") && campo.getAttribute("aria-invalid") === "true") {
    marcarErro(campo, "");
  }
}
ck("ck-form").addEventListener("input", apagarErroDoCampo);
ck("ck-form").addEventListener("change", apagarErroDoCampo);

// Máscaras
function soNumeros(texto) {
  return String(texto || "").replace(/\D/g, "");
}

// 52998224725 vira 529.982.247-25
ck("ck-cpf").addEventListener("input", function (e) {
  e.target.value = soNumeros(e.target.value).slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

// 11999998888 vira (11) 99999-8888
ck("ck-telefone").addEventListener("input", function (e) {
  const d = soNumeros(e.target.value).slice(0, 11);
  if (d.length === 0) {
    e.target.value = "";
  } else if (d.length <= 2) {
    e.target.value = "(" + d;
  } else if (d.length <= 6) {
    e.target.value = "(" + d.slice(0, 2) + ") " + d.slice(2);
  } else {
    e.target.value = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
  }
});

// CPF: os 2 últimos dígitos são calculados a partir dos anteriores
function digitoDoCpf(cpf, tamanho) {
  let soma = 0;
  for (let i = 0; i < tamanho; i++) {
    soma = soma + Number(cpf[i]) * (tamanho + 1 - i);
  }
  const resto = (soma * 10) % 11;
  if (resto === 10) return 0;
  return resto;
}

function cpfValido(cpf) {
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; // todos os dígitos iguais
  return digitoDoCpf(cpf, 9) === Number(cpf[9]) && digitoDoCpf(cpf, 10) === Number(cpf[10]);
}

// Cartão desenhado
const cartao = ck("ck-cartao");
const cc = {
  nome: ck("ck-cc-nome"),
  numero: ck("ck-cc-numero"),
  validade: ck("ck-cc-validade"),
  cvv: ck("ck-cc-cvv")
};

const BANDEIRAS = [
  ["elo", "ELO", /^(4011(78|79)|43(1274|8935)|45(1416|7393|763[12])|50(4175|6699|67[0-7][0-9]|9\d{3})|627780|63(6297|6368)|650(0|4|5|9)|65(16|50))/],
  ["hiper", "HIPERCARD", /^(606282|3841)/],
  ["amex", "AMEX", /^3[47]/],
  ["visa", "VISA", /^4/],
  ["master", "MASTERCARD", /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/]
];

// Devolve ["visa", "VISA"]... ou ["", ""]
function bandeiraDe(numero) {
  for (let i = 0; i < BANDEIRAS.length; i++) {
    if (BANDEIRAS[i][2].test(numero)) return BANDEIRAS[i];
  }
  return ["", ""];
}

function ehAmex() {
  return bandeiraDe(soNumeros(cc.numero.value))[0] === "amex";
}

function tamanhoCvv() {
  if (ehAmex()) return 4;
  return 3;
}

// Algoritmo de Luhn (confere o número do cartão)
function luhn(numero) {
  let soma = 0;
  for (let i = 0; i < numero.length; i++) {
    let d = Number(numero[numero.length - 1 - i]);
    if (i % 2 === 1) {
      d = d * 2;
      if (d > 9) d = d - 9;
    }
    soma = soma + d;
  }
  return numero.length >= 13 && soma % 10 === 0;
}

// Grupos de 4 (Amex é 4-6-5)
function agrupar(numero) {
  let grupos = [];
  if (bandeiraDe(numero)[0] === "amex") {
    grupos = [numero.slice(0, 4), numero.slice(4, 10), numero.slice(10, 15)];
  } else {
    for (let i = 0; i < numero.length; i = i + 4) {
      grupos.push(numero.slice(i, i + 4));
    }
  }
  return grupos.filter(function (grupo) {
    return grupo !== "";
  }).join(" ");
}

function validadeOk() {
  const d = soNumeros(cc.validade.value);
  if (d.length !== 4) return false;
  const mes = Number(d.slice(0, 2));
  const ano = 2000 + Number(d.slice(2));
  if (mes < 1 || mes > 12) return false;

  const hoje = new Date();
  if (ano > hoje.getFullYear()) return true;
  return ano === hoje.getFullYear() && mes >= hoje.getMonth() + 1;
}

function virarCartaoCredito(deCostas) {
  cartao.classList.toggle("de-costas", deCostas);
  if (deCostas) {
    escrever("ck-virar-texto", "Ver frente");
  } else {
    escrever("ck-virar-texto", "Ver verso");
  }
}

function desenharCartao() {
  const numero = soNumeros(cc.numero.value);
  const cvv = tamanhoCvv();
  let tamanho = 16;
  if (ehAmex()) tamanho = 15;
  // completa com bolinhas o que falta digitar
  escrever("ck-ver-numero", agrupar(numero.padEnd(tamanho, "•")));
  escrever("ck-ver-nome", cc.nome.value.trim().toUpperCase() || "SEU NOME");
  escrever("ck-ver-validade", cc.validade.value || "MM/AA");
  escrever("ck-ver-cvv", "•".repeat(cc.cvv.value.length) || "•".repeat(cvv));
  escrever("ck-ver-bandeira", bandeiraDe(numero)[1]);

  cc.cvv.maxLength = cvv;
  cc.cvv.placeholder = "•".repeat(cvv);
}

cc.numero.addEventListener("input", function () {
  cc.numero.value = agrupar(soNumeros(cc.numero.value).slice(0, 16));
  desenharCartao();
});

cc.validade.addEventListener("input", function (e) {
  let d = soNumeros(cc.validade.value).slice(0, 4);
  if (d.length === 1 && Number(d) > 1) d = "0" + d;
  // a barra aparece depois do mês, mas não atrapalha quem está apagando
  const apagando = e.inputType === "deleteContentBackward";
  if (d.length > 2 || (d.length === 2 && !apagando)) {
    cc.validade.value = d.slice(0, 2) + "/" + d.slice(2);
  } else {
    cc.validade.value = d;
  }
  desenharCartao();
});

cc.cvv.addEventListener("input", function () {
  cc.cvv.value = soNumeros(cc.cvv.value).slice(0, tamanhoCvv());
  desenharCartao();
});

cc.nome.addEventListener("input", function () {
  cc.nome.value = cc.nome.value.replace(/[^A-Za-zÀ-ÿ' .-]/g, "");
  desenharCartao();
});

cc.cvv.addEventListener("focus", function () {
  virarCartaoCredito(true);
});
cc.cvv.addEventListener("blur", function () {
  virarCartaoCredito(false);
});
ck("ck-virar").addEventListener("click", function () {
  virarCartaoCredito(!cartao.classList.contains("de-costas"));
});

// Confere todos os campos (todos mostram o erro) e diz se nenhum falhou
function validarCartao() {
  const cvv = tamanhoCvv();
  const resultados = [
    conferirCampo(cc.nome, cc.nome.value.trim().length >= 3, "Digite o nome como está no cartão."),
    conferirCampo(cc.numero, luhn(soNumeros(cc.numero.value)), "Número do cartão inválido. Confira os dígitos."),
    conferirCampo(cc.validade, validadeOk(), "Validade inválida ou vencida."),
    conferirCampo(cc.cvv, cc.cvv.value.length === cvv, "O CVV tem " + cvv + " dígitos.")
  ];
  return !resultados.includes(false);
}

function apagarCartao() {
  cc.nome.value = "";
  cc.numero.value = "";
  cc.validade.value = "";
  cc.cvv.value = "";
  virarCartaoCredito(false);
  desenharCartao();
}

// Trocar a forma de pagamento
ck("ck-form").addEventListener("change", function (evento) {
  if (evento.target.name !== "ck-pagamento") return;
  const forma = evento.target.value;

  ck("ck-pagcartao").hidden = forma !== "cartao";
  mostrarPix(forma === "pix");

  if (forma === "cartao") {
    setTimeout(function () {
      cc.nome.focus({ preventScroll: true });
    }, 50);
  } else {
    limparErros(ck("ck-pagcartao"));
  }
  desenharResumo();
});

// Pix (QR Code com os 3 "olhos" dos cantos)
function criarQuadrado(svg, x, y, lado) {
  const quadrado = document.createElementNS(SVG_NS, "rect");
  quadrado.setAttribute("x", x);
  quadrado.setAttribute("y", y);
  quadrado.setAttribute("width", lado);
  quadrado.setAttribute("height", lado);
  svg.appendChild(quadrado);
  return quadrado;
}

function ehCanto(x, y, t) {
  if (x < 7 && y < 7) return true;
  if (x >= t - 7 && y < 7) return true;
  return x < 7 && y >= t - 7;
}

function criarQr() {
  const t = 25;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "-1 -1 " + (t + 2) + " " + (t + 2));
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");

  for (let y = 0; y < t; y++) {
    for (let x = 0; x < t; x++) {
      if (!ehCanto(x, y, t) && Math.random() > 0.5) {
        criarQuadrado(svg, x, y, 1);
      }
    }
  }

  const cantos = [[0, 0], [t - 7, 0], [0, t - 7]];
  cantos.forEach(function (canto) {
    const borda = criarQuadrado(svg, canto[0] + 0.5, canto[1] + 0.5, 6);
    borda.setAttribute("fill", "none");
    borda.setAttribute("stroke", "currentColor");
    criarQuadrado(svg, canto[0] + 2, canto[1] + 2, 3);
  });

  return svg;
}

const MINUTOS_PIX = 10;
let cronometroPix = null;

function gerarPix() {
  ck("ck-qr").textContent = "";
  ck("ck-qr").appendChild(criarQr());
  ck("ck-pix-codigo").value =
    "00020126580014BR.GOV.BCB.PIX0115natal-2512-doce" + soNumeros(numeroPedido) +
    "5204000053039865802BR5912CASADODOCE6009SAOPAULO" + Date.now().toString().slice(-4);
  escrever("ck-pix-copiar", "Copiar");
}

// Cronômetro de 10 minutos: quando acaba, gera outro QR Code
function mostrarPix(ligar) {
  ck("ck-pagpix").hidden = !ligar;
  clearInterval(cronometroPix);
  if (!ligar) return;

  gerarPix();
  let segundos = MINUTOS_PIX * 60;

  function mostrarRelogio() {
    escrever("ck-pix-tempo", doisDigitos(Math.floor(segundos / 60)) + ":" + doisDigitos(segundos % 60));
  }

  mostrarRelogio();
  cronometroPix = setInterval(function () {
    segundos--;
    if (segundos <= 0) {
      gerarPix();
      segundos = MINUTOS_PIX * 60;
    }
    mostrarRelogio();
  }, 1000);
}

ck("ck-pix-copiar").addEventListener("click", function () {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(ck("ck-pix-codigo").value).catch(function () {});
  }
  escrever("ck-pix-copiar", "Copiado! ✓");
});

// Enviar
let numeroPedido = "";
let esperaPagamento = null;

function validarDados() {
  const nome = ck("ck-nome").value.trim();
  const telefone = soNumeros(ck("ck-telefone").value);
  const resultados = [
    conferirCampo(ck("ck-nome"), nome.length >= 3 && nome.includes(" "), "Informe seu nome completo."),
    conferirCampo(ck("ck-email"), FORMATO_EMAIL.test(ck("ck-email").value.trim()), "Informe um e-mail válido."),
    conferirCampo(ck("ck-cpf"), cpfValido(soNumeros(ck("ck-cpf").value)), "Informe um CPF válido."),
    // telefone é opcional, mas se escreveu precisa estar completo
    conferirCampo(ck("ck-telefone"), telefone === "" || telefone.length >= 10, "Telefone incompleto. Use DDD + número."),
    conferirCampo(ck("ck-endereco"), ck("ck-endereco").value.trim().length >= 5, "Informe o endereço de entrega."),
    conferirCampo(ck("ck-termos"), ck("ck-termos").checked, "É preciso aceitar as condições para continuar.")
  ];
  return !resultados.includes(false);
}

ck("ck-form").addEventListener("submit", function (evento) {
  evento.preventDefault();

  const forma = formaEscolhida();
  const dadosOk = validarDados();
  let cartaoOk = true;
  if (forma === "cartao") cartaoOk = validarCartao();

  if (!dadosOk || !cartaoOk) {
    const primeiroErro = telaCheckout.querySelector('[aria-invalid="true"]');
    if (primeiroErro) primeiroErro.focus();
    return;
  }

  const conta = calcularPedido();
  const primeiroNome = ck("ck-nome").value.trim().split(" ")[0];
  const fimDoTexto = "Pedido " + numeroPedido + " · enviamos os detalhes para " + ck("ck-email").value.trim() + ".";

  if (forma === "cartao") {
    processarCartao(conta, primeiroNome, fimDoTexto);
  } else if (forma === "pix") {
    processarPix(conta, primeiroNome, fimDoTexto);
  } else {
    mostrarBoleto(conta, primeiroNome, ck("ck-email").value.trim());
  }
});

// Põe um elemento na área do cartão/QR Code flutuando
function mostrarNoEstado(elemento) {
  ck("ck-estado-cartao").textContent = "";
  ck("ck-estado-cartao").appendChild(elemento);
}

function processarCartao(conta, primeiroNome, fimDoTexto) {
  const final4 = soNumeros(cc.numero.value).slice(-4);
  const bandeira = ck("ck-ver-bandeira").textContent || "Cartão";
  const parcelas = Number(ck("ck-parcelas").value);
  virarCartaoCredito(false);

  // cópia da frente do cartão, sem ids repetidos e só com os 4 últimos números
  const copia = cartao.querySelector(".ck-frente").cloneNode(true);
  copia.querySelectorAll("[id]").forEach(function (elemento) {
    elemento.removeAttribute("id");
  });
  copia.querySelector(".ck-numero").textContent = "•••• •••• •••• " + final4;
  mostrarNoEstado(copia);
  apagarCartao();

  const texto = "Obrigado, " + primeiroNome + "! " + bandeira + " final " + final4 +
    " aprovado em " + parcelas + "x de " + formatarPreco(conta.total / parcelas) + ". " + fimDoTexto;
  mostrarProcessando("Processando pagamento seguro…", "Pedido confirmado! Ho ho ho!", texto);
}

function processarPix(conta, primeiroNome, fimDoTexto) {
  mostrarPix(false);

  const comprovante = copiarModelo("tpl-pix-comprovante");
  comprovante.querySelector(".ck-qr").appendChild(ck("ck-qr").firstElementChild.cloneNode(true));
  comprovante.querySelector("[data-valor]").textContent = formatarPreco(conta.total);
  mostrarNoEstado(comprovante);

  const texto = "Obrigado, " + primeiroNome + "! Recebemos " + formatarPreco(conta.total) +
    " no Pix (com 5% de desconto). " + fimDoTexto;
  mostrarProcessando("Confirmando seu Pix…", "Pix recebido! Ho ho ho!", texto);
}

// Espera 2,2 segundos e confirma o pagamento
function mostrarProcessando(tituloEspera, tituloPronto, textoPronto) {
  const estado = ck("ck-estado");
  estado.classList.remove("pronto");
  escrever("ck-estado-titulo", tituloEspera);
  escrever("ck-estado-texto", "");
  ck("ck-estado-fechar").hidden = true;
  ck("ck-form").hidden = true;
  estado.hidden = false;

  esperaPagamento = setTimeout(function () {
    estado.classList.add("pronto");
    escrever("ck-estado-titulo", tituloPronto);
    escrever("ck-estado-texto", textoPronto);
    ck("ck-estado-fechar").hidden = false;
    setTimeout(function () {
      ck("ck-estado-fechar").focus({ preventScroll: true });
    }, 50);
    esvaziarCarrinho();
  }, 2200);
}

function mostrarBoleto(conta, primeiroNome, email) {
  const caixaTexto = ck("ck-pronto-texto");
  caixaTexto.textContent = "";
  const titulo = document.createElement("strong");
  titulo.textContent = "Boleto gerado! ";
  caixaTexto.appendChild(titulo);
  caixaTexto.append(
    "Obrigado, " + primeiroNome + "! Pedido " + numeroPedido + " de " + formatarPreco(conta.total) + ". " +
    "Os doces são preparados quando o boleto for pago. Enviamos o boleto para " + email + "."
  );

  // o fim do código é o valor em centavos
  const centavos = String(Math.round(conta.total * 100)).padStart(10, "0");
  const codigo = document.createElement("p");
  codigo.className = "ck-boleto-codigo";
  codigo.textContent = "34191.79001 01043.510047 91020.150008 1 " + centavos;

  const barras = document.createElement("div");
  barras.className = "ck-barras";
  barras.setAttribute("aria-hidden", "true");

  ck("ck-pronto-extra").textContent = "";
  ck("ck-pronto-extra").appendChild(codigo);
  ck("ck-pronto-extra").appendChild(barras);

  ck("ck-form").hidden = true;
  ck("ck-pronto").hidden = false;
  ck("ck-pronto").querySelector("[data-fechar]").focus({ preventScroll: true });
  esvaziarCarrinho();
}

// Fechar
telaCheckout.querySelectorAll("[data-fechar]").forEach(function (botao) {
  botao.addEventListener("click", fecharJanela);
});
fecharAoClicarFora(telaCheckout);

// Abrir (chamada pelo "Finalizar pedido" do script.js)
function abrirCheckout() {
  fecharJanela(); // só uma janela aberta por vez

  numeroPedido = "#CD-" + Math.floor(10000 + Math.random() * 90000);
  const form = ck("ck-form");
  form.reset();
  limparErros(form);
  apagarCartao();
  ck("ck-pagcartao").hidden = true;
  form.hidden = false;
  ck("ck-estado").hidden = true;
  ck("ck-pronto").hidden = true;

  const usuario = lerUsuario();
  if (usuario && usuario.nome) ck("ck-nome").value = usuario.nome;
  if (usuario && usuario.email) ck("ck-email").value = usuario.email;

  desenharResumo();
  mostrarPix(true);
  abrirJanela(telaCheckout, ck("ck-nome"), function () {
    clearTimeout(esperaPagamento);
    clearInterval(cronometroPix);
    apagarCartao();
  });
}