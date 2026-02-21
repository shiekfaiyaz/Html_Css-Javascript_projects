// section 2 slider 

const wrapper = document.getElementById("wrapper");
const nextbtn = document.getElementById("next-btn");
const prevbtn = document.getElementById("prev-btn");
const sliderMain = document.querySelector('.sec2-slider')
let count = 0;
const total = 6; // total slides

prevbtn.disabled = true; // start me disable

nextbtn.addEventListener("click", function() {
  if (count < total - 1) {
    count++;
    sliderMain.style.transform = `translateX(-${count * 100}vw)`;
  }

  prevbtn.disabled = count === 0;
  nextbtn.disabled = count === total - 1;
});

prevbtn.addEventListener("click", function() {
  if (count > 0) {
    count--;
    sliderMain.style.transform = `translateX(-${count * 100}vw)`;
  }

  prevbtn.disabled = count === 0;
  nextbtn.disabled = count === total - 1;
});



