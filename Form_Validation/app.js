// handle show/hide password
(function () {
    const password = document.getElementById("password");
    const c_password = document.getElementById("confirm-password");
    const tglPwd = document.getElementById("toggle-pwd");
    const tglCfmPwd = document.getElementById("toggle-cfmpwd");

    function togglestyle(el, btn) {
        btn.style.opacity = el.value ? "1" : "0";
        btn.style.cursor = el.value ? "pointer" : "default";
    }
    function toggleHandler(el, btn) {
        el.type = el.type === "password" ? "text" : "password";
        btn.textContent = el.type === "password" ? "Show" : "Hide";
    }

    password.addEventListener("input", () => togglestyle(password, tglPwd));
    c_password.addEventListener("input", () =>
        togglestyle(c_password, tglCfmPwd)
    );

    tglPwd.addEventListener("click", () => toggleHandler(password, tglPwd));
    tglCfmPwd.addEventListener("click", () =>
        toggleHandler(c_password, tglCfmPwd)
    );
})();

// form-validation
document.querySelector(".formSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const c_password = document.getElementById("confirm-password").value;

    //regex expression
    const fullnameRegex = /^[A-Za-z ]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^[6-9][\d]{9}$/;

    //clear previous error msg
    document.querySelectorAll(".error").forEach((curError) => {
        curError.textContent = "";
    });
    let isValid = true;

    //validate inputs
    if (!fullnameRegex.test(fullName)) {
        document.getElementById("fullnameError").textContent =
            "Please Enter a valid name.";
        isValid = false;
    }
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent =
            "Please Enter a valid email address.";
        isValid = false;
    }
    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent =
            "Please Enter a valid phone number.";
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").textContent =
            'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number and one special character. Please try again.';
        isValid = false;
    }
    if (c_password !== password) {
        document.getElementById("c_passwordError").textContent =
            'Password is not matching.'
        isValid = false;
    } else {
        document.getElementById("c_passwordError").textContent = ''
    }

    //log success msg

    if (isValid) {

        document.querySelector('.reg-succesMsg').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.reg-succesMsg').style.display = 'none'
        }, 2000)
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });

        // saving data to console
        console.log({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password
        });
    }
});


