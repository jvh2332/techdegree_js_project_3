// Select Name Input field and put focus on it

const nameInput = document.querySelector("#name");
nameInput.focus();

const jobRoleSelect = document.querySelector("select[name='user-title']");
const jobRoleInput = document.querySelector ("#other-job-role");

// Hide jobRoleInput by default

jobRoleInput.style.display = 'none';

// If the option "other" is selected in jobRoleSelect, display jobRoleInput

jobRoleSelect.addEventListener("change", (e) => {
    if (e.target.value === "other"){
        jobRoleInput.style.display = 'block';
    } else {
        jobRoleInput.style.display = 'none';
    }
});

const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const colorOptions = colorSelect.children;

// Disable colorSelect by default

colorSelect.disabled = true;

/* When a theme is selected in designSelect, the colorSelect menu is enabled
and the colorOptions are displayed/hidden based on which theme was selected */

designSelect.addEventListener("change", (e) => {
    colorSelect.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const designSelectValue = e.target.value;
        const colorTheme = colorOptions[i].getAttribute("data-theme");

        if (designSelectValue === colorTheme){
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", "true");
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute("selected");
        }
    }
});

// Adjusting the total cost to the selected activities in the "Register for Activities" section

const activitiesFieldset = document.querySelector("#activities");
const total = document.querySelector("#activities-cost");
let totalCost = 0;

activitiesFieldset.addEventListener("change", (e) => {
    const activityCost = e.target.getAttribute("data-cost");
    const activityCostNumber = +activityCost; // Convert to number

    if (e.target.checked){
        totalCost += activityCostNumber;
    } else {
        totalCost -= activityCostNumber;
    }
    total.innerHTML = `Total: $${totalCost}`;
});


const payMethod = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const payPal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
let shownElement = creditCard;

// CreditCard option as default and hide the others

payPal.style.display = 'none';
bitcoin.style.display = 'none';

payMethod.children[1].setAttribute("selected", "true");

// Display the correct payment form sections corresponding to the selected payment method and hide the rest

payMethod.addEventListener("change", (e) => {
    shownElement.style.display = 'none';
    const newElement = document.querySelector(`#${e.target.value}`)
    newElement.style.display = 'block';
    shownElement = newElement
});

const emailInput = document.querySelector("#email");
const cardNumberInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");
const form = document.querySelector("form");
const activitiesCheckboxes = document.querySelectorAll("input[type='checkbox']");

// Validate the input in the field sections before submit

const isValidName = () => /^[a-zA-Z\s]+$/.test(nameInput.value);
const isValidEmail = () => /^[^@]+@[^@]+\.[a-z]+$/i.test(emailInput.value);
const isValidCardNumber = () => /^\d{13,16}$/.test(cardNumberInput.value);
const isValidZipCode = () => /^\d{5}$/.test(zipCodeInput.value);
const isValidCvv = () => /^\d{3}$/.test(cvvInput.value);

form.addEventListener("submit", (e) => {
    function validation (inputElement,isValidElement){
        const label = inputElement.closest('label')
        if (isValidElement()){
            label.classList.add("valid");
            label.classList.remove("not-valid");
            label.lastElementChild.style.display = 'none';
        } else {
            e.preventDefault();
            label.classList.add("not-valid");
            label.classList.remove("valid");
            label.lastElementChild.style.display = 'block';
        }
    };
    validation (nameInput,isValidName);
    validation (emailInput,isValidEmail);
    validation (cardNumberInput,isValidCardNumber);
    validation (zipCodeInput,isValidZipCode);
    validation (cvvInput,isValidCvv);
});

// Add focus and remove focus on the checkboxes in the activities

for (let i =0; i < activitiesCheckboxes.length; i++){
    const label = activitiesCheckboxes[i].closest('label');
    activitiesCheckboxes[i].addEventListener ("focus", (e) => {
        label.classList.add("focus");
    });
    activitiesCheckboxes[i].addEventListener ("blur", (e) => {
        label.classList.remove("focus");
    });
};
