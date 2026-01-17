const header = document.getElementById('header');

const btntabs = document.querySelectorAll('.tab');
const contentTabs = document.querySelectorAll('.tab-panel');

// slider
const wrapper = document.querySelector('.wrapper');
const slides = document.querySelectorAll('.slide1');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');





const btn = document.querySelector('.skill-btn button');
const skill2 = document.querySelector('.skill-2');

// default show first
btntabs[0].classList.add('active');
contentTabs[0].classList.add('active');

btntabs.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btntabs.forEach(b => b.classList.remove('active'));
    contentTabs.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    contentTabs[index].classList.add('active');
  });
});



// skills sectio


btn.addEventListener('click', () => {
  skill2.classList.toggle('show');
  btn.innerText = skill2.classList.contains('show') ? 'See Less' : 'See More';
});






// open menu
const sidebar = document.querySelector('.sidebar-menu'); 
const menuicon = document.getElementById('Menu-icon');    
const crossicon = document.getElementById('cross-icon');    

menuicon.addEventListener('click', () => {
  sidebar.classList.add('open');
});
crossicon.addEventListener('click', () => {
  sidebar.classList.remove('open');
});


// scroll down header
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// slider 

let index = 0;
const total = slides.length;

prevBtn.disabled = true;

nextBtn.addEventListener('click', () => {
  if (index < total - 1) {
    index++;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    prevBtn.disabled = false;
  }
  if (index === total - 1) nextBtn.disabled = true;
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    nextBtn.disabled = false;
  }
  if (index === 0) prevBtn.disabled = true;
});


// animation for page
const elements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

