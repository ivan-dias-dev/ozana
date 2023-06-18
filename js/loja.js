var totalAmount = "0,00";

var marginTop = 0; // variável para armazenar o estado atual

function changeMargin() {
  if (marginTop == 0) {
    document.getElementById("container").style.marginTop = "5em";
    marginTop = 10; // atualiza o valor da variável
  } else {
    document.getElementById("container").style.marginTop = "3em";
    marginTop = 0; // atualiza o valor da variável
  }
}

function typeWriter(elemento) {
  const textoArray = elemento.innerHTML.split(""); //o split divide em um array
  elemento.innerHTML = ""; //serve para limpar para que a animacao ocorra
  textoArray.forEach((letra, i) => {
    setTimeout(function () {
      elemento.innerHTML += letra; //para cada letra add uma + outra
    }, 100 * i); //tempo para adicionar algo setTimeout(funcao, tempo)
  });
}

const zaninha = document.querySelector(".zaninha");
typeWriter(zaninha);

//tamanho da lojinha
var widthCaixinha = 0;

function caixinha() {
  var cardCompas = document.querySelector(".card-compas");

  if (widthCaixinha === 0) {
    widthCaixinha++;
    cardCompas.style.width = "22em";
  } else {
    widthCaixinha--;
    cardCompas.style.width = "0";
  }
}

//ready da lojinha--------------------------------------------------------------------------

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeProductButton = document.getElementsByClassName("cart-remove");
  for (i = 0; i < removeProductButton.length; i++) {
    removeProductButton[i].addEventListener("click", RemoveProducts);
  }

  const addToDiv = document.getElementsByClassName("botao-item");
  for (var i = 0; i < addToDiv.length; i++) {
    addToDiv[i].addEventListener("click", addProductToCard);
  }

  const quantytiInputs = document.getElementsByClassName("intput-mini");
  for (var i = 0; i < quantytiInputs.length; i++) {
    quantytiInputs[i].addEventListener("change", checkInputIsNull);
  }
  const purchaseButton = document.getElementsByClassName("Finalizar-pedido")[0];
  purchaseButton.addEventListener("click", makePurchase);
  updateTotal();
}

//ckeck  carrinho da lojinha--------------------------------------------------------------------------
//este ramove ao ficar 0 na lojinha
function checkInputIsNull(event) {
  if (event.target.value === "0") {
    event.target.parentElement.parentElement.remove();
  }

  updateTotal();
}

//remover  carrinho da lojinha--------------------------------------------------------------------------

function RemoveProducts(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
}

//adicionar  carrinho da lojinha--------------------------------------------------------------------------
function addProductToCard(event) {
  const button = event.target;
  const producInfos = button.parentElement.parentElement;
  const productImage =
    producInfos.getElementsByClassName("card-img-top")[0].src;
  const productTitle =
    producInfos.getElementsByClassName("card-title")[0].innerText;
  const productPrice = producInfos.getElementsByClassName("valor")[0].innerText;

  const productsCardName = document.getElementsByClassName("cart-product-name");
  for (var i = 0; i < productsCardName.length; i++) {
    if (productsCardName[i].innerText === productTitle) {
      productsCardName[i].parentElement.parentElement.getElementsByClassName(
        "intput-mini"
      )[0].value++;
      updateTotal();
      return;
    }
  }
  let newCard = document.createElement("tr");
  newCard.classList.add("card-product");
  newCard.innerHTML = `
             
            <td>
              <strong class="cart-product-name">${productTitle}</strong>

            </td>
            <td>
              <span class="cart-product-price">${productPrice}</span>
            </td>
            <td>
              <input class="cart-input intput-mini text-center" type="number" value="1" min="0" placeholder='quantas?' 
                id='intput-mini-coxinha' style="width: 2em;">
              </input>
            </td>
            <td>
              <button class="cart-remove  btn btn-danger">remover</button>
            </td>
            `;
  const tableBody = document.querySelector("table tbody");
  tableBody.append(newCard);

  newCard
    .getElementsByClassName("intput-mini")[0]
    .addEventListener("change", checkInputIsNull);

  newCard
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", RemoveProducts);
  updateTotal();
  if (widthCaixinha === 0) {
    caixinha();
  }
}

//preco total  carrinho da lojinha--------------------------------------------------------------------------

function updateTotal() {
  totalAmount = 0;

  const cartProducts = document.getElementsByClassName("card-product");
  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i]
      .getElementsByClassName("cart-product-price")[0]
      .innerText.replace("R$", "")
      .replace(",", ".");
    const productQuantyty =
      cartProducts[i].getElementsByClassName("intput-mini")[0].value;

    totalAmount += productPrice * productQuantyty;
  }

  totalAmount = totalAmount.toFixed(2).replace(".", ",");

  document.querySelector(".botao span").innerText = "R$" + totalAmount;
}

function makePurchase() {
  if (totalAmount === "0,00") {
    updateTotal();
    alert("Seu carrinho está vazio");
  } else {
    updateTotal();
    alert(
      `
    Obrigado pela compra!
    Valor do pedido: R$${totalAmount}
    Volte sempre!  :)
    `
    );

    make();
    //document.querySelector("table tbody").innerHTML = ""
  }
}

function make() {
  var carrinho = [];

  // Recupere os elementos da tabela que contêm os itens do carrinho
  var itens = document.querySelectorAll(".table tbody .card-product");
  var total = document.querySelector(".botao span ").innerText;

  // Itere sobre cada item da lista
  itens.forEach(function (itemElement) {
    var names = itemElement.querySelector("strong").innerText;
    var quantidade = itemElement.querySelector(".cart-input").value;
    var valores = itemElement.querySelector(".cart-product-price ").innerText;

    var item = {
      nome: names,
      quantidade: quantidade,
      valor: valores,
    };

    // Adicione o objeto 'item' ao array 'carrinho'
    carrinho.push(item);
  });

  // Converta o array 'carrinho' em formato JSON
  var carrinhoJSON = carrinho;

  // Faça algo com o JSON retornado, como exibi-lo ou enviá-lo para um servidor
  console.log(carrinhoJSON);

  var linha = "%0A";
  var espaco = `%20`;

  let mensagem =
    "Produtos: ==>                                                                                                    ,";
  mensagem =
    mensagem +
    `      Valor total:    ${total}                                                                                                            `;

  carrinhoJSON.forEach((item, index) => {
    mensagem += `tem ${index + 1}: ${item.nome} - Quantidade: ${
      item.quantidade
    } - Valor: ${
      item.valor
    } +                                                         `;
  });

  // Crie o link do WhatsApp com a mensagem pré-preenchida
  const numeroTelefone = "41984204961";
  const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(
    mensagem
  )}`;

  //  const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(
  //   mensagem
  // )}`;

  var novaGuia = window.open(linkWhatsApp, "_blank");
  novaGuia.focus();
}

function selecionaProduto() {
  const valorDoProduto = document
    .getElementsByClassName("valor")[0]
    .addEventListener("change", function (event) {});
  const opcaoNaoSelecionada = event.target;
  const opcaoSelecionada = event.target.parentElement.parentElement;
  const opcaoValor = opcaoSelecionada.getElementsByClassName("valor")[0];
  const opcaoSelection = opcaoNaoSelecionada.value;

  if (opcaoSelection == "congelado") {
    opcaoValor.innerText = "R$44,90";
  } else {
    opcaoValor.innerText = "R$54,90";
  }
  updateTotal();
}
