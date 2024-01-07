const setChange = (input) => {
    const tr = input.closest("tr"); // Lấy thẻ tr cha gần nhất của input
    tr.setAttribute("hasChange", "true"); // Gán giá trị hasChange thành true (hoặc có thể sử dụng tr.hasChange = true;)

    // Cập nhật lại giá trị của thẻ input bằng giá trị hiện tại
    input.value = input.value;
};

const submitForm = () => {
    const tbody = document.querySelector("table tbody");
    const trList = tbody.querySelectorAll('tr[hasChange="true"]');
    const users = [];

    trList.forEach((tr) => {
        const id = tr.querySelector("th").innerText;
        const fullname = tr.querySelector(
            'input[data-property="Fullname"]'
        ).value;
        const username = tr.querySelector(
            'input[data-property="Username"]'
        ).value;
        const email = tr.querySelector('input[data-property="Email"]').value;

        const user = {
            id: id,
            Fullname: fullname,
            Username: username,
            Email: email,
        };

        users.push(user);
    });

    // Mảng users chứa thông tin của các user cần submit
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "changedUsers";
    hiddenInput.value = JSON.stringify(users); // Chuyển mảng users thành chuỗi JSON

    // Thêm thẻ input ẩn vào form
    const form = document.getElementById("userForm");
    form.appendChild(hiddenInput);

    // Mảng users chứa thông tin của các user cần submit
    console.log(users);

    // Gửi form
    form.submit();
};