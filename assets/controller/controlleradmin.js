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
          <td>
            <button class="btn btn-primary" onclick="xoa()">Xóa</button>
          </td>
    </tr>
        `;
  }
  document.getElementById("tableAdminProduct").innerHTML = content;
};
