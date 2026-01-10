const header = document.getElementById("Header");
const sidebar = document.getElementById("Sidebar");
const showMenu = document.getElementById("menu-show");
const closeBtn = document.querySelector(".cross");

const container = document.querySelector(".client-container");
const cards = document.querySelectorAll(".client1");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");

let index = 0;
const cardWidth = cards[0].offsetWidth + 20;
const visibleCards = 2;
const maxIndex = cards.length - visibleCards;

function updateSlider() {
  container.style.transform = `translateX(-${index * cardWidth}px)`;
  prevbtn.disabled = index === 0;
  nextbtn.disabled = index === maxIndex;
}

nextbtn.addEventListener("click", () => {
  if (index < maxIndex) index++;
  updateSlider();
});

prevbtn.addEventListener("click", () => {
  if (index > 0) index--;
  updateSlider();
});

updateSlider();





// header scroll fixed postion
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});


// sicebar
showMenu.addEventListener("click", () => {
  sidebar.classList.add("open");
})

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open")
});



// form validation and formspree

const emailEl = document.getElementById("email");
const formEl = document.getElementById("form");
const formMesg = document.querySelector(".form-mesg");


function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateEmail(emailEl.value)) {
    formMesg.textContent = "Please enter a valid email";
    return;
  }
  formMesg.textContent = "Thank you for submitting 🙌";

  formEl.reset();

  fetch(formEl.action, {
    method: "POST",
    body: new FormData(formEl),
    headers: { "Accept": "application/json" }
  });


});



// css animation 
const animItems = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

animItems.forEach(item => observer.observe(item));












