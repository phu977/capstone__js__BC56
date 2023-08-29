let renderListAdminProduct = (dataList) => {
  let content = "";
  for (let index = 0; index < dataList.length; index++) {
    let product = dataList[index];
    content += `
        <tr>
          <td>
            <img
                src="${product.img}">
            <p>${product.id}</p>
          </td>
          <td>
            <p>${product.name}</p>
          </td>
          <td>
            <p>${product.price}$</p>
          </td>
          <td>
            <p>${product.type}</p>
          </td>
          <td>
            <p>${product.desc}</p>
          </td>
          <td class = " d-flex">
            <button class="btn btn-danger mx-2" onclick="edit(${product.id})">Chỉnh sửa</button>
            <button class="btn btn-primary mx-2" onclick="xoa(${product.id})">Xóa</button>
          </td>
    </tr>
        `;
  }
  document.getElementById("tableAdminProduct").innerHTML = content;
};

let layThongTin = () => {
  // lấy thông tin
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("image").value;
  let desc = document.getElementById("Description").value;
  let type = document.getElementById("type").value;
  return {
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  };
};

let onSuccess = (message) => {
  Swal.fire(message, "", "success");
};

let showThongTin = (data) => {
  let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    data;
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("screen").value = screen;
  document.getElementById("backCamera").value = backCamera;
  document.getElementById("frontCamera").value = frontCamera;
  document.getElementById("image").value = img;
  document.getElementById("Description").value = desc;
  document.getElementById("type").value = type;
};

let deleteThongTinTrenForm = () => {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backCamera").value = "";
  document.getElementById("frontCamera").value = "";
  document.getElementById("image").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("type").value = "";
};

let filterProduct = (arrItem) => {
  var listProductFilter = [];
  var tuKhoa = document.querySelector("#keyword").value;
  if (tuKhoa == "") {
    renderListAdminProduct(arrItem);
    return;
  } else {
    for (var index = 0; index < arrItem.length; index++) {
      var item = arrItem[index].name;
      item = stringToSlug(item);
      console.log(
        "🚀 ~ file: controlleradmin.js:99 ~ filterProduct ~ item:",
        item
      );

      tuKhoa = stringToSlug(tuKhoa);
      console.log(
        "🚀 ~ file: controlleradmin.js:100 ~ filterProduct ~ tuKhoa:",
        tuKhoa
      );

      if (item == tuKhoa) {
        listProductFilter.push(arrItem[index]);
      }
    }
  }

  renderListAdminProduct(listProductFilter);
};
