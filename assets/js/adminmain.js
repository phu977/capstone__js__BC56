const BASE_URL = "https://64dd73ab825d19d9bfb12b12.mockapi.io/productPhone";
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// lấy dữ liệu từ mockAPI

function fetchProductListAdmin() {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then((res) => {
      console.log("🚀 ~ file: adminmain.js:75 ~ .then ~ res:", res.data);
      renderListAdminProduct(res.data);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: adminmain.js:79 ~ fetchProductListAdmin ~ err:",
        err
      );
    });
}

fetchProductListAdmin();

// thêm sản phẩm  vào server
window.themSP = () => {
  let product = layThongTin();
  console.log("🚀 ~ file: adminmain.js:92 ~ product:", product);
  axios({
    url: BASE_URL,
    method: "POST",
    data: product,
  })
    .then((res) => {
      console.log("🚀 ~ file: adminmain.js:98 ~ .then ~ res:", res);
      onSuccess("thêm sản phẩm thành công");
      fetchProductListAdmin();
      deleteThongTinTrenForm();
    })
    .catch((err) => {
      console.log("🚀 ~ file: adminmain.js:102 ~ err:", err);
    });
};

// xóa sản phẩm trên server

window.xoa = (id) => {
  console.log("🚀 ~ file: adminmain.js:110 ~ id:", id);
  axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log("🚀 ~ file: adminmain.js:116 ~ .then ~ res:", res);
      onSuccess("xóa sản phẩm thành công");
      fetchProductListAdmin();
    })
    .catch((err) => {
      console.log("🚀 ~ file: adminmain.js:120 ~ err:", err);
    });
};

// chình sửa sản phẩm

window.edit = (id) => {
  $("#exampleModal").modal("show");
  console.log("🚀 ~ file: adminmain.js:128 ~ id:", id);
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("🚀 ~ file: adminmain.js:135 ~ .then ~ res:", res.data);
      showThongTin(res.data);
    })
    .catch((err) => {
      console.log("🚀 ~ file: adminmain.js:139 ~ err:", err);
    });
};

// update sản phẩm

window.updateProduct = () => {
  $("#exampleModal").modal("hide");
  let product = layThongTin();
  axios({
    url: `${BASE_URL}/${product.id}`,
    method: "PUT",
    data: product,
  })
    .then((res) => {
      console.log("🚀 ~ file: adminmain.js:153 ~ .then ~ res:", res);
      onSuccess("chỉnh sửa thành công");
      fetchProductListAdmin();
      deleteThongTinTrenForm();
    })
    .catch((err) => {
      console.log("🚀 ~ file: adminmain.js:157 ~ err:", err);
    });
};
