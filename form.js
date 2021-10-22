// this function will add a warning to the DOM based on field validation
function addWarning(baseText, coloredText, color) {
    let warning = document.createElement("div")
    warning.classList.add("warning");
    warning.innerHTML = baseText + " ";

    let colorMessage = document.createElement("span");
    colorMessage.style.color = color;
    colorMessage.innerHTML = coloredText;

    warning.appendChild(colorMessage);
    document.signup.appendChild(warning);
}

// helper method to make sure missing fields get red text
function addMissingWarning(baseText, coloredText) {
    addWarning(baseText, coloredText, "red");
}

// helper method to make sure invalid fields get orange text
function addValidateWarning(baseText, coloredText) {
    addWarning(baseText, coloredText, "orange");
}

// validation of username
function validateUsername(x) {
    if (x.length === 0) {
        addMissingWarning("Please Enter", "Username");
        return false;
    }
    else {
        let myRegex = /^[a-z0-9]{4,12}$/
        if (!myRegex.test(x)) {
            addValidateWarning("Please Enter",  "a valid Username");
            return false;
        }
    }
    return true;
}

// validation of email address
function validateEmail(x) {
    if (x.length === 0) {
        addMissingWarning("Please Enter", "Email Address");
        return false;
    }
    else {
        let myRegex = /[@].*(?:.net|.com|.org|.edu)$/;
        if (!myRegex.test(x)) {
            addValidateWarning("Please Enter", "a valid Email Address");
            return false;
        }
    }
    return true;
}

// validation of phone number
function validatePhoneNumber(x) {
    if (x.length === 0) {
        addMissingWarning("Please Enter", "Phone Number");
        return false;
    }
    else {
        let myRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!myRegex.test(x)) {
            addValidateWarning("Please Enter", "a valid Phone Number");
            return false;
        }
    }
    return true;
}

// validation of password. Note had to do multiple regex statements here
function validatePassword(x) {
    if (x.length === 0) {
        addMissingWarning("Please Enter", "Password");
        return false;
    }
    else {
        let lowerCaseRegex = /[a-z]/;
        let upperCaseRegex = /[A-Z]/;
        let numberRegex = /[0-9]/;
        // credit to https://stackoverflow.com/questions/4503542/check-for-special-characters-in-a-string for the special character regex
        let specialRegex = /[^A-Za-z0-9]/;
        if (!(lowerCaseRegex.test(x) && upperCaseRegex.test(x) && numberRegex.test(x) && specialRegex.test(x))) {
            addValidateWarning("Please Enter", "a valid Password");
            return false;
        }
    }
    return true;
}

// verifies the confirm password field
function validateConfirmPassword(password, originalPassword) {
    return password === originalPassword;
}

// ensures a gender has been selected
function validateGender(x) {
    if (x.length === 0) {
        addMissingWarning("Please Select", "Gender");
        return false;
    }
    return true;
}

// validates a month day and year have been selected
function validateBirthDay(month, day, year) {
    if (month.length === 0 || day.length === 0 || year.length === 0) {
        addMissingWarning("Please Select", "Birthday");
        return false;
    }
    return true;
}

// validates at least one music category has been chosen
function validateMusic(music) {
    let checked = false;
    for (let i = 0; i < music.length; i++) {
        if (music[i].checked) {
            checked = true;
        }
    }

    if (!checked) {
        addMissingWarning("Please Select", "at least one Music Genre");
        return false;
    }
    return true;
}

// removes all empty/validation warnings from the dom
function removeWarnings() {
    let warnings = document.signup.getElementsByClassName("warning");
    while (warnings.length !== 0) {
        warnings[0].parentNode.removeChild(warnings[0])
    }
}

function checkInputs() {
    removeWarnings();

    let valid = true;

    let username = document.signup.username.value;
    valid = validateUsername(username) && valid;

    let email = document.signup.email.value;
    valid = validateEmail(email) && valid;

    let phoneNumber = document.signup.phoneNumber.value;
    valid = validatePhoneNumber(phoneNumber) && valid;

    let password = document.signup.password.value;
    valid = validatePassword(password) && valid;

    let gender = document.signup.gender.value;
    valid = validateGender(gender) && valid;

    let birthMonth = document.signup.month.value;
    let birthDay = document.signup.day.value;
    let birthYear = document.signup.year.value;
    valid = validateBirthDay(birthMonth, birthDay, birthYear) && valid;

    let music = document.signup.music;
    valid = validateMusic(music) && valid;

    if (valid) {
        let confirmPassword = document.signup.confirmPassword.value;
        if (validateConfirmPassword(confirmPassword, password)) {
            window.location.replace('index.html');
        }
        else {
            alert("Passwords do not match");
        }
    }
}

window.onload = function() {
    // add days and years to select... easier than typing them out
    document.signup.day.appendChild(document.createElement('option'));
    for (let i = 1; i <= 31; i++) {
        let opt = document.createElement('option');
        opt.value = i.toString();
        opt.innerHTML = i.toString();
        document.signup.day.appendChild(opt)
    }

    document.signup.year.appendChild(document.createElement('option'));
    for (let i = 1970; i <= 2010; i++) {
        let opt = document.createElement('option');
        opt.value = i.toString();
        opt.innerHTML = i.toString();
        document.signup.year.appendChild(opt)
    }
}