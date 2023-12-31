function renderList(modelList) {
  var contentHTML = "";
  for (var index = 0; index < modelList.length; index++) {
    var productModel = modelList[index];
    contentHTML += ` 
<li class="product-item">
    <div class="product-card" tabindex="0">

        <figure class="card-banner">
            <img src="${productModel.img}" width="350" height="350" loading="lazy"
                alt="${productModel.name}" class="image-contain">

            <div class="card-badge">New</div>

            <ul class="card-action-list">

                <li class="card-action-item">
                    <button class="card-action-btn" aria-labelledby="card-label-1" onclick ="muaSP('${productModel.id}')">
                        <ion-icon name="cart-outline"></ion-icon>
                    </button>

                    <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
                </li>

                <li class="card-action-item">
                    <button class="card-action-btn" aria-labelledby="card-label-2">
                        <ion-icon name="heart-outline"></ion-icon>
                    </button>

                    <div class="card-action-tooltip" id="card-label-2">Add to Whishlist</div>
                </li>

                <li class="card-action-item">
                    <button class="card-action-btn" aria-labelledby="card-label-3">
                        <ion-icon name="eye-outline"></ion-icon>
                    </button>

                    <div class="card-action-tooltip" id="card-label-3">Quick View</div>
                </li>

                <li class="card-action-item">
                    <button class="card-action-btn" aria-labelledby="card-label-4">
                        <ion-icon name="repeat-outline"></ion-icon>
                    </button>

                    <div class="card-action-tooltip" id="card-label-4">Compare</div>
                </li>

            </ul>
        </figure>

        <div class="card-content">
            <h3 class="h3 card-title">
                <a href="#">${productModel.name}</a>
            </h3>
            <data class="card-price">${productModel.price}$</data>
        </div>
    </div>
</li>
        `;
  }
  document.querySelector(".product-list").innerHTML = contentHTML;
}

function batLoading() {
  document.querySelector("#spinner").style.display = "flex";
}
function tatLoading() {
  document.querySelector("#spinner").style.display = "none";
}
let onSuccess = (message) => {
  Swal.fire(message, "", "success");
};

function locThongtin(arrProduct) {
  var listFilter = [];
  var loaitimkiem = document.getElementById("productType").value;
  for (var index = 0; index < arrProduct.length; index++) {
    var product = arrProduct[index];
    if (product.type == loaitimkiem || loaitimkiem == "all") {
      listFilter.push(product);
    }
  }
  renderList(listFilter);
}
let arrProduct = [];
function renderCart(buyList) {
  var contentHTML = "";
  let totalCart = 0;
  for (var index = 0; index < buyList.length; index++) {
    var Product = buyList[index];
    var cost = costProduct(Product.quantity, Product.price);
    contentHTML += `
    <tr>
        <td class= "text item">${Product.id}</td>
        <td class= "text item">${Product.name}</td>
        <td class= "text item">${Product.price}$</td>
        <td class= "text ">${Product.quantity}</td>
        <td class= "text ">
            <button class="btn but-mua" onclick="muathem('${Product.id}')">Tăng</button>
            <button class="btn but-xem" data-toggle="modal" data-target="#myModal"  onclick="giam('${Product.id}')">giảm</button>
            <button class="btn but-xem" onclick="xoa(${Product.id})">Xóa</button>
        </td>
    </tr>
        `;
    totalCart += cost;
  }
  console.log(arrProduct);
  contentHTML += `
  <tr>
      <td colspan="4" class="text"><strong>Tổng tiền:</strong></td>
      <td class="text"><strong>${totalCart}$</strong></td>
  </tr>
  <tr>
      <td colspan="5" class="text"><button class="btn but-xem text-center" onclick="clearCart()">xóa tất cả </button></td>
  </tr>
  `;
  document.querySelector("#tableProductCart").innerHTML = contentHTML;
}

var arrBuyitem = [];
function buyProduct(item) {
  var existingItem = arrBuyitem.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1;
    arrBuyitem.push(item);
  }
  renderCart(arrBuyitem);
}
function increaseQuantity(id) {
  let existingItem = arrBuyitem.find((i) => i.id === id);
  if (existingItem) {
    existingItem.quantity++;
    renderCart(arrBuyitem);
  }
}

function decreaseQuantity(id) {
  var existingItem = arrBuyitem.find((i) => i.id === id);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
    renderCart(arrBuyitem);
  }
}

function deleteProduct(id) {
  var itemIndex = arrBuyitem.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    arrBuyitem.splice(itemIndex, 1);
    renderCart(arrBuyitem);
  }
}
function clearCart() {
  arrProduct = []; // Assuming arrProduct is your array that holds the cart products
  renderCart(arrProduct); // Update the cart display after clearing
}
