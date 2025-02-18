// Put focus on the name input field

const nameInput = document.querySelector("#name");
nameInput.focus();

const jobRoleSelect = document.querySelector("select[name='user-title']");
const jobRoleInput = document.querySelector ("#other-job-role");

// Hide jobRoleInput by default

jobRoleInput.style.display = 'none';

// Display jobRoleInput only if the option "other" is selected in jobRoleSelect 

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

// Show creditCard option as default and hide the others

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
const nameLabel = document.querySelector("label[for='name']");
const emailLabel = document.querySelector("label[for='email']");
const cardNumberLabel = document.querySelector("label[for='cc-num']");
const zipCodeLabel = document.querySelector("label[for='zip']");
const cvvLabel = document.querySelector("label[for='cvv']");
const form = document.querySelector("form");
const activitiesCheckboxes = document.querySelectorAll("input[type='checkbox']");


// Validate the input in the field sections and the activity section before submit

const isValidName = () => /^[a-zA-Z\s]+$/.test(nameInput.value);
const isValidEmail = () => /^[^@]+@[^@]+\.[a-z]+$/i.test(emailLabel.querySelector('input').value);
const isValidCardNumber = () => /^\d{13,16}$/.test(cardNumberLabel.querySelector('input').value);
const isValidZipCode = () => /^\d{5}$/.test(zipCodeLabel.querySelector('input').value);
const isValidCvv = () => /^\d{3}$/.test(cvvLabel.querySelector('input').value);
const isValidActivity = () => {
    for (const checkbox of activitiesCheckboxes) {
        if (checkbox.checked) {
            return true;
        }
    }
    return false;
};

form.addEventListener("submit", (e) => {
    function validation (element,isValidElement){
        if (!isValidElement()){
            e.preventDefault();
            element.classList.add("not-valid");
            element.classList.remove("valid");
            element.lastElementChild.style.display = 'block';
        } else {
            element.classList.add("valid");
            element.classList.remove("not-valid");
            element.lastElementChild.style.display = 'none';
        }
    };
    validation (nameLabel,isValidName);
    validation (emailLabel,isValidEmail);
    validation (cardNumberLabel,isValidCardNumber);
    validation (zipCodeLabel,isValidZipCode);
    validation (cvvLabel,isValidCvv);
    validation (activitiesFieldset,isValidActivity);

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
