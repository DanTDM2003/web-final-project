const setProductChange = (input) => {
    const tr = input.closest("tr"); // Lấy thẻ tr cha gần nhất của input
    tr.setAttribute("hasProductChange", "true"); // Gán giá trị hasChange thành true (hoặc có thể sử dụng tr.hasChange = true;)

    // Cập nhật lại giá trị của thẻ input bằng giá trị hiện tại
    input.value = input.value;
};

const submitProductForm = () => {
    const tbody = document.getElementById("product-tbody");
    const trList = tbody.querySelectorAll('tr[hasProductChange="true"]');
    let products = [];

    trList.forEach((tr) => {
        const id = tr.querySelector("th").innerText;
        const Name = tr.querySelector('input[data-property="product-name"]').value;
        const Price = tr.querySelector('input[data-property="product-price"]').value;
        const Short_Description = tr.querySelector('input[data-property="short-description"]').value;
        const Quantity = tr.querySelector('input[data-property="quantity"]').value;
        const Full_Description = tr.querySelector('input[data-property="full-description"]').value;
        const Category_id = 2;
        const product = {
            id: id,
            Name: Name,
            Price: Price,
            Short_Description: Short_Description,
            Quantity: Quantity,
            Full_Description: Full_Description,
            Category_id: Category_id
        };

        products.push(product);
    });

    // Mảng users chứa thông tin của các user cần submit
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "changedProducts";
    hiddenInput.value = JSON.stringify(products); // Chuyển mảng users thành chuỗi JSON

    // Thêm thẻ input ẩn vào form
    const form = document.getElementById("productForm");
    form.appendChild(hiddenInput);

    // Mảng users chứa thông tin của các user cần submit
    console.log(products);
    // Gửi form
    form.submit();
};