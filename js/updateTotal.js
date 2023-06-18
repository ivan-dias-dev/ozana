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
