const setCategoryChange = (input) => {
    const tr = input.closest("tr"); // Lấy thẻ tr cha gần nhất của input
    tr.setAttribute("hasCategoryChange", "true"); // Gán giá trị hasChange thành true (hoặc có thể sử dụng tr.hasChange = true;)

    // Cập nhật lại giá trị của thẻ input bằng giá trị hiện tại
    input.value = input.value;
};
const submitCategoryForm = () => {
    const tbody = document.getElementById("category-tbody");
    const trList = tbody.querySelectorAll('tr[hasCategoryChange="true"]');
    let categories = [];

    trList.forEach((tr) => {
        const id = tr.querySelector("td").innerText;
        const Name = tr.querySelector('input[data-property="category-name"]').value;
        const product = {
            id: id,
            Name: Name
        };

        categories.push(product);
    });

    // Mảng users chứa thông tin của các user cần submit
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "changedCategories";
    hiddenInput.value = JSON.stringify(categories); // Chuyển mảng users thành chuỗi JSON
    // Thêm thẻ input ẩn vào form
    const form = document.getElementById("categoryForm");
    form.appendChild(hiddenInput);

    // Mảng users chứa thông tin của các user cần submit
    // Gửi form
    // form.submit();
};