const slider = document.querySelector(".gallery-slider");
let   slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const smallSlider = document.querySelector(".small_slider");
const container = document.querySelector(".container");
const nextBtn2 = document.querySelector(".small_slider .next");
const prevBtn2 = document.querySelector(".small_slider .prev");
let currentIndex = 0;
let currentSmallIndex = 0;
const totalSlides = slides.length;
const add = document.querySelector(' label')
const ex_div = document.createElement('div')
const ex_img = document.createElement('img')
add.addEventListener('change',function(e){
  let src = e;
  // var url = URL.createObjectURL(src)
  // console.log(url);
  console.log(src);
  ex_img.src = src
  console.log(ex_img);
  
  // ex_img.src = url
  // console.log(url);
 ex_div.appendChild(ex_img)
 console.log(ex_div);
 slider.appendChild(ex_div)
})
slides.forEach((slide, index) => {
  const small = document.createElement("div");
  small.classList.add("small");
  const img = document.createElement("img");
  const src = slide.childNodes[0].src;
  img.src = src;
  small.append(img);
  console.log(container);
  container.appendChild(small);

});
const small = document.querySelector(".small");
const smalls = document.querySelectorAll(".small");
console.log(smalls.length);
function show() {
  smalls.forEach((small) => {
    small.classList.remove("active");
  });
  smalls[currentIndex].classList.add("active");
}
show();
function navigate() {
  smalls.forEach((small, index) => {
    small.addEventListener("click", function () {
      currentIndex = index;
      slider.style.transform = `translateX(-${index * 100}%)`;
      smalls.forEach((small) => {
        small.classList.remove("active");
      });
      small.classList.remove("active");
      small.classList.add("active");
    });
  });
}
function updateSliderPosition() {
  show();
  if (currentIndex === totalSlides - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
    if (currentIndex >= 6 && currentIndex <= smalls.length - 2) {
      container.style.transform = `translate(-${currentIndex * 111.67}px)`;
    }
  }
  if (currentIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    if (currentIndex >= 6 && currentIndex <= smalls.length - 2) {
    }else
    container.style.transform = `translate(-${currentIndex * 111.67}px)`;
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  navigate()
}
function updateSmallSlider() {
  if (currentSmallIndex === smalls.length - 2) {
    nextBtn2.disabled = true;
  } else {
    nextBtn2.disabled = false;
  }
  if (currentSmallIndex === 0) {
    prevBtn2.disabled = true;
  } else {
    prevBtn2.disabled = false;
  }
  container.style.transform = `translateX(-${currentSmallIndex * 111.67}px)`;
}
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSliderPosition();
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  console.log(currentIndex);
  updateSliderPosition();
});
nextBtn2.addEventListener("click", function () {
  currentSmallIndex = (currentSmallIndex + 1) % smalls.length;
  updateSmallSlider();
  console.log(currentSmallIndex);
});
prevBtn2.addEventListener("click", function () {
  currentSmallIndex--;
  updateSmallSlider();
});
///////////scrolling//////////////
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
PrevTranslate = 0;
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPos = e.pageX;
});
slider.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const currentPosition = e.pageX;
    currentTranslate = PrevTranslate + currentPosition - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
});
slider.addEventListener("mouseup", () => {
  const moveBy = currentTranslate - PrevTranslate;
  console.log(startPos);
  isDragging = false;
  if (moveBy < -100 && currentIndex < totalSlides - 1) currentIndex++;
  if (moveBy > 100 && currentIndex > 0) currentIndex--;
  updateSliderPosition();
  console.log(slider.clientWidth);
  PrevTranslate = -currentIndex * slider.clientWidth;
});
slider.addEventListener("mouseleave", () => {
  updateSliderPosition();
  if (isDragging) {
    isDragging = false;
  }
});
