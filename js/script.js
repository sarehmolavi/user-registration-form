// عناصر فرم
const registerForm = document.getElementById('registerForm');
const username = document.getElementById('username');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = registerForm.querySelector('button[type="submit"]');

const ruleLength = document.getElementById('rule-length');
const ruleNumber = document.getElementById('rule-number');
const ruleNameEmail = document.getElementById('rule-name-email');

// Regex‌ها
const usernameRegex = /^[a-zA-Z0-9]{4,15}$/;
const fullnameRegex = /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberSymbolRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;

// نمایش یا حذف error
function showError(input, message) {
  input.classList.add('error');
  input.classList.remove('success');
  input.nextElementSibling.textContent = message;
}

function showSuccess(input) {
  input.classList.remove('error');
  input.classList.add('success');
  input.nextElementSibling.textContent = '';
}

// Validation Username
function validateUsername() {
  if (!username.value) {
    showError(username, 'Username is required');
    return false;
  } else if (!usernameRegex.test(username.value)) {
    showError(username, 'Username must be 3-15 characters and only letters/numbers');
    return false;
  } else {
    showSuccess(username);
    return true;
  }
}

// Validation Full Name
function validateFullname() {
  if (!fullname.value) {
    showError(fullname, 'Full Name is required');
    return false;
  } else if (!fullnameRegex.test(fullname.value.trim())) {
    showError(fullname, 'Please enter your full name (first and last)');
    return false;
  } else {
    showSuccess(fullname);
    return true;
  }
}

// Validation Email
function validateEmail() {
  if (!email.value) {
    showError(email, 'Email is required');
    return false;
  } else if (!emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email address');
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}

// Validation Password با تیک
function validatePassword() {
  const val = password.value;
  let valid = true;

  // rule 1: length
  if (val.length >= 8) {
    ruleLength.classList.add('valid');
  } else {
    ruleLength.classList.remove('valid');
    valid = false;
  }

  // rule 2: number or symbol
  if (numberSymbolRegex.test(val)) {
    ruleNumber.classList.add('valid');
  } else {
    ruleNumber.classList.remove('valid');
    valid = false;
  }

  // rule 3: cannot contain name or email
  if (val.toLowerCase().includes(fullname.value.toLowerCase()) || val.toLowerCase().includes(email.value.toLowerCase())) {
    ruleNameEmail.classList.remove('valid');
    valid = false;
  } else {
    ruleNameEmail.classList.add('valid');
  }

  if (!val) {
    showError(password, 'Password is required');
    valid = false;
  } else if (valid) {
    showSuccess(password);
  } else {
    showError(password, '');
  }

  return valid;
}

// فعال/غیرفعال کردن دکمه
function toggleSubmitButton() {
  if (validateUsername() && validateFullname() && validateEmail() && validatePassword()) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// event listenerها برای live validation
[username, fullname, email, password].forEach(input => {
  input.addEventListener('input', toggleSubmitButton);
});

// ارسال فرم
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if (validateUsername() && validateFullname() && validateEmail() && validatePassword()) {
    const formData = {
      username: username.value,
      fullName: fullname.value,
      email: email.value,
      password: '********'
    };
    console.log(formData);

    // پاک کردن پیام قبلی اگه هست
    let existingMsg = document.getElementById('successMsgJS');
    if (existingMsg) existingMsg.remove();// ایجاد پیام موفقیت زیر دکمه
    const successMsg = document.createElement('p');
    successMsg.id = 'successMsgJS';
    successMsg.textContent = 'Account created successfully!';
    successMsg.style.color = 'var(--success)';
    successMsg.style.fontSize = '14px';
    successMsg.style.marginTop = '12px';
    successMsg.style.textAlign = 'center';

    submitBtn.insertAdjacentElement('afterend', successMsg);

    registerForm.reset();
    toggleSubmitButton();

    // ریست کردن تیک‌ها
    [ruleLength, ruleNumber, ruleNameEmail].forEach(el => el.classList.remove('valid'));
  }
});