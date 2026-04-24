 // ===== 1. ELEMENTS DECLARATION (Fix: Added missing variables) =====
const steps = document.querySelectorAll(".main-sec1");
const nextButtons = document.querySelectorAll(".btn-next");
const prevButtons = document.querySelectorAll(".btn-prev");
const submitBtn = document.querySelector(".btn-submit"); // Ensure this class exists on your last button
const formSection = document.querySelector("form"); 
const homeSection = document.getElementById("home-section");
const roundedStep = document.querySelectorAll(".rounded-num");

const skillInput = document.getElementById('skill-input');
const skillsTags = document.getElementById('tags-container');
const exp_card = document.querySelectorAll('.card1');
const goalCards = document.querySelectorAll('.card2');

// ===== 2. STATE =====
let currentStep = 0;
let skillValue = [];
let selectedExperience = "";
let selectedGoal = "";

// ===== 3. HELPER FOR ERROR BOX =====
function getErrorBox() {
    // Current step ke andar wala error-mesg p dhoondo
    return steps[currentStep].querySelector(".error-mesg");
}

// ===== 4. VALIDATION (Fix: Corrected logic for Step 4 & 5) =====
function validateStep() {
    let isValid = true;
    const ErrorMessg = getErrorBox();
    if (ErrorMessg) ErrorMessg.innerHTML = "";

    // STEP 1: Name & Age
    if (currentStep === 0) {
        const Fname = document.getElementById('Fname');
        const Lname = document.getElementById('Lname');
        const age = document.getElementById('age');
        if (!Fname.value.trim() || !Lname.value.trim() || !age.value.trim()) {
            isValid = false;
            if(ErrorMessg) ErrorMessg.innerHTML = "Enter Name and Age";
        }
    }

    // STEP 2: Education & Skills
    if (currentStep === 1) {
        const Education = document.getElementById('Education');
        if (!Education.value || skillValue.length < 1) {
            isValid = false;
            if(ErrorMessg) ErrorMessg.innerHTML = "Select Education & Add Skills";
        }
    }

    // STEP 3: Experience
    if (currentStep === 2) {
        if (!selectedExperience) {
            isValid = false;
            if(ErrorMessg) ErrorMessg.innerHTML = "Select Experience Level";
        }
    }

    // STEP 4: Interests (FIX: Step 4 is index 3)
    if (currentStep === 3) {
        const interests = document.getElementById('interests');
        const projectType = document.getElementById('projectType');
        const availability = document.getElementById('availability');

        if (!interests.value || !projectType.value || !availability.value) {
            isValid = false;
            if(ErrorMessg) ErrorMessg.innerHTML = "Select all options in Step 4";
        }
    }

    // STEP 5: Goals (FIX: Index 4)
    if (currentStep === 4) {
        if (!selectedGoal) {
            isValid = false;
            if(ErrorMessg) ErrorMessg.innerHTML = "Please select a goal";
        }
    }

    return isValid;
}

// ===== 5. SKILLS SYSTEM =====
skillInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let value = skillInput.value.trim();
        if (value === "" || skillValue.includes(value)) {
            skillInput.value = "";
            return;
        }
        skillValue.push(value);
        renderTags();
        skillInput.value = "";
    }
});

function renderTags() {
    skillsTags.innerHTML = "";
    skillValue.forEach((skill, index) => {
        const div = document.createElement("div");
        div.className = "tag-item"; // Add CSS for this
        div.innerHTML = `${skill} <span onclick="removeTag(${index})"><i class="fa-solid fa-circle-xmark"></i></span>`;
        skillsTags.appendChild(div);
    });
}

window.removeTag = function(index) {
    skillValue.splice(index, 1);
    renderTags();
};

// ===== 6. SELECTION LOGIC (Separated for clarity) =====
exp_card.forEach(card => {
    card.addEventListener("click", () => {
        exp_card.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedExperience = card.querySelector("h3").innerText;
    });
});

goalCards.forEach(card => {
    card.addEventListener("click", () => {
        goalCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedGoal = card.querySelector("h3").innerText;
    });
});

// ===== 7. NAVIGATION =====
nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (validateStep()) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep();
            }
        }
    });
});

prevButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep();
        }
    });
});

function showStep() {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === currentStep);
    });
    // Optional: Update rounded numbers if they exist
    roundedStep.forEach((num, i) => {
        num.classList.toggle("active", i <= currentStep);
    });
}

// ===== 8. SUBMIT & HOME (The big fix) =====
if(submitBtn) {
    submitBtn.addEventListener('click', () => {
        if(validateStep()) {
            handleSubmit();
        }
    });
}

function handleSubmit() {
    const finalData = {
        name: document.getElementById('Fname').value + " " + (document.getElementById('Lname')?.value || ""),
        dob: document.getElementById('age').value,
        education: document.getElementById('Education').value,
        skills: skillValue.join(", "),
        experience: selectedExperience,
        interest: document.getElementById('interests').value,
        goal: selectedGoal,
        notes: document.querySelector('textarea').value
    };

    localStorage.setItem("userProfile", JSON.stringify(finalData));
    showHomeSection();
}

function showHomeSection() {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (!data) return;


if(formSection) formSection.style.display = "none";

const mainBg = document.querySelector(".main-background");
    if (mainBg) {
        mainBg.style.background = "none";
        mainBg.style.boxShadow = "none";
    }

    const numberLines = document.querySelector(".numberLines"); // Progress bar target
    if(numberLines) numberLines.style.display = "none";

    if(formSection) formSection.style.display = "none";
    if(homeSection) homeSection.style.display = "block";

    

    document.getElementById("display-name").innerText = data.name;
    const container = document.getElementById("data-container");
    if(container) {
        container.innerHTML = "";
        Object.keys(data).forEach(key => {
            if (key === "name") return;
            const item = document.createElement("div");
            item.className = "data-item";
            item.innerHTML = `
                <p><b>${key.toUpperCase()}:</b> ${data[key] || 'N/A'}</p>
                <div class="actions">
                    <i class="fa-solid fa-pen-to-square edit-icon" onclick="editProfile()"></i>
                    <i class="fa-solid fa-trash delete-icon" onclick="deleteField('${key}')"></i>
                </div>
            `;
            container.appendChild(item);
        });
    }
}

// Global functions for HTML onclick
window.deleteField = function(key) {
    let data = JSON.parse(localStorage.getItem("userProfile"));
    delete data[key];
    localStorage.setItem("userProfile", JSON.stringify(data));
    showHomeSection();
};

window.editProfile = function() {
  
    homeSection.style.display = "none";
    formSection.style.display = "block";
    document.querySelector(".numberLines").style.display = "block";

    const mainBg = document.querySelector(".main-background");
    if (mainBg) {
        mainBg.style.background = "white"; // Ya jo bhi aapka original color tha
        mainBg.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; // Original shadow
    }

    currentStep = 0;
    showStep();
};

window.onload = () => {
    if (localStorage.getItem("userProfile")) {
        showHomeSection();
    }
};


const resetBtn = document.getElementById("reset-form");
if(resetBtn) {
    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("userProfile"); // Purana data saaf karo
        editProfile(); // Wapas form par bhejo (uper wala function use karke)
    });
}