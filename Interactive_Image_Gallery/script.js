
document.addEventListener("DOMContentLoaded", () => {


const accessKey = 'r5fFvSI_vYWXnIxTdsJ7ek6MGxFX2HuWLzyYlBZWlEw';

const gallery = document.getElementById('gallery-id');
const loadMore = document.getElementById('loadMore');
const cardDiv = document.querySelectorAll('.card1');
const searchId = document.getElementById('searchInput');
const imgWindow = document.querySelector('.img-window');
const savedBtn = document.querySelector('.savedImages');
const savedWindow = document.querySelector('.saved-window');
const closeSaved = document.querySelector('.close-saved');
const closePreview = document.querySelector('.close-preview');

const previewWindow = document.querySelector('.preview-window');
const previewImg = document.getElementById('preview-img');
const previewTitle = document.getElementById('preview-title');




let page = 2;
let currentQuery = "random";

loadRandomImages("random", 1);
LoadMoreImg();
selectCategory();
searchInput();
selectHeart();



async function loadRandomImages(query, page = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  data.results.forEach(image => {

    const img = `<div class="image-card" id="img-card">
                    <img src=${image.urls.small} class="big" alt="gallery image" data-url="${image.urls.small}" data-title="${image.alt_description}">
                    <div class="overlay">
                    <span class="title">${image.alt_description || "Image"}</span>
                        <i class="fa-regular fa-heart heart-icon"></i>
                    </div>
                </div>`

    gallery.innerHTML += img;
  });

}


// loading images on button clicked
function LoadMoreImg() {

  loadMore.addEventListener('click', () => {
    page++;
    loadRandomImages(currentQuery, page);

  });

}

// category selection display images
function selectCategory() {

  cardDiv.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add("active");
      page = 1;
      gallery.innerHTML = "";
      const category = card.dataset.category;
      currentQuery = category;
      loadRandomImages(currentQuery, page);
    });
  });

}



// query by search loading images
function searchInput() {

  searchId.addEventListener('input', function () {
    page = 1;
    currentQuery = searchId.value;
    gallery.innerHTML = "";
    loadRandomImages(currentQuery, page);

  });

}



// loacal storage by clicking heart icon 
function selectHeart() {
  gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('heart-icon')) {

      e.target.classList.toggle("fa-solid");

      const card = e.target.closest('.image-card');
      const img = card.querySelector('img');

      const imageData = {
        url: img.dataset.url,
        title: img.dataset.title
      };

      saveImages(imageData);
    }
  });


}

savedBtn.addEventListener('click', () => {
  savedWindow.classList.add('active');
  showSavedImages();
});



function saveImages(image) {
  let saved = JSON.parse(localStorage.getItem("liked")) || [];
  saved.push(image);
  localStorage.setItem("liked", JSON.stringify(saved));
}



// saveing image to localstorage
function showSavedImages() {

  let saved = JSON.parse(localStorage.getItem("liked")) || [];
  imgWindow.innerHTML = "";

  saved.forEach((img, index) => {
    imgWindow.innerHTML += `
    <div class="saved-card">
      <img src="${img.url}">
      <i class="fa-solid fa-trash remove" data-index="${index}"></i>
    </div>
  `;
  });


}


imgWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {

    const index = e.target.dataset.index;

    let saved = JSON.parse(localStorage.getItem("liked")) || [];

    saved.splice(index, 1);

    localStorage.setItem("liked", JSON.stringify(saved));

    // re-render
    showSavedImages();
  }
});



if(closeSaved){
  closeSaved.addEventListener('click', () =>{
    savedWindow.classList.remove('active');
  });
}

if(closePreview){
  closePreview.addEventListener('click', () => {
    previewWindow.classList.remove('active');
  });
}

// Image displaying window for preview
gallery.addEventListener('click', (e) => {

const img = e.target.closest('img');
if(img){
  previewImg.src = img.dataset.url;
  previewTitle.innerText = img.dataset.title;
  previewWindow.classList.add("active");
  }


});


});


// slider for the cards section 2 
// 1. Pehle variables define karo (Selectors)
const scrollContainer = document.querySelector(".images-types");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// 2. Phir apna logic likho
nextBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft += 300; 
});

prevBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft -= 300;
});

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

scrollContainer.addEventListener("scroll", () => {

    prevBtn.style.display = scrollContainer.scrollLeft <= 0 ? "none" : "flex";
    
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    nextBtn.style.display = scrollContainer.scrollLeft >= maxScroll ? "none" : "flex";
});


