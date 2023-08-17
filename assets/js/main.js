const BASE_URL = "https://64dd73ab825d19d9bfb12b12.mockapi.io/productPhone";
const BASE_CART = "https://64dd73ab825d19d9bfb12b12.mockapi.io/Product_cart";

var ovelay = document.querySelector(".overlay");
var navOpenBtn = document.querySelector(".nav-open-btn");
var navbar = document.querySelector(".navbar");
var navCloseBtn = document.querySelector(".nav-close-btn");

var navlist = [ovelay, navOpenBtn, navCloseBtn];
for (var index = 0; index < navlist.length; index++) {
  navlist[index].addEventListener("click", function () {
    navbar.classList.toggle("active");
    ovelay.classList.toggle("active");
  });
}

/**
 * header & go top btn active on page scroll
 */

var header = document.querySelector(".header");
var backToTop = document.querySelector(".go-top-btn");
var activeElementScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backToTop.classList.add("active");
  } else {
    header.classList.remove("active");
    backToTop.classList.remove("active");
  }
};
window.addEventListener("scroll", activeElementScroll);

// lấy dữ liệu từ server mockAPI

function fetchProductList() {
  batLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:37 ~ res:", res.data.length);
      renderList(res.data);
      tatLoading();
    })
    .catch(function (err) {
      tatLoading();
      console.log("🚀 ~ file: main.js:42 ~ err:", err);
    });
}
fetchProductList();

// lọc thông tin

function filterProducts() {
  batLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:57 ~ res:", res.data.length);
      locThongtin(res.data);
      tatLoading();
    })
    .catch(function (err) {
      tatLoading();
      console.log("🚀 ~ file: main.js:62 ~ filterProducts ~ err:", err);
    });
}

function muaSP(id) {
  console.log(id);
  axios({
    url: `${BASE_CART}/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:79 ~ res:", res.data);
      onSuccess("sản phẩm đã được mua")
      buyProduct(res.data);
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:83 ~ muaSP ~ err:", err);
    });
}

function muathem(id) {
  axios({
    url: `${BASE_CART}/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("🚀 ~ file: main.js:94 ~ .then ~ res:", res.data);
      onSuccess("sản phẩm đã được mua thêm")
      increaseQuantity(res.data.id);
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:98 ~ muathem ~ err:", err);
    });
}

function giam(id) {
  axios({
    url: `${BASE_CART}/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("🚀 ~ file: main.js:108 ~ .then ~ res:", res.data);
      decreaseQuantity(res.data.id);
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:112 ~ giam ~ err:", err);
    });
}

function xoa(id) {
  axios({
    url: `${BASE_CART}/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("🚀 ~ file: main.js:122 ~ .then ~ res:", res);
      onSuccess("Xóa thành công");
      deleteProduct(res.data.id);
      
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:127 ~ xoa ~ err:", err);
      
    });
}
