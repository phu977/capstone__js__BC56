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
    url: `https://64c62b56c853c26efadb28af.mockapi.io/model`,
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
    url: `https://64c62b56c853c26efadb28af.mockapi.io/model`,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:57 ~ res:", res.data.length)
      locThongtin(res.data);
      tatLoading();
      
    })
    .catch(function (err) {
      tatLoading();
      console.log("🚀 ~ file: main.js:62 ~ filterProducts ~ err:", err)
      
    });
}

function muaSP(id) {
  console.log(id);
}
