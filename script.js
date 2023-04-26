"use strict";

////////////////////////////////////////////
///////////smooth scroll
document.querySelectorAll(".nav_content").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
////////////////////////////////////////////
///////////counter
let valueDisplays = document.querySelectorAll(".hero_stats");
let interval = 5;

valueDisplays.forEach((valueDisplays) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplays.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplays.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});
////////////////////////////////////////////
///////////navigation hover

let navList = document.querySelector(".nav_list");
let navItems = navList.querySelectorAll(".nav_item");

navList.addEventListener("mouseover", function (event) {
  let target = event.target;
  if (target.classList.contains("nav_content")) {
    let navItem = target.parentNode;
    navItems.forEach(function (item) {
      if (item !== navItem) {
        item.style.opacity = 0.5;
      }
    });
    navItem.style.opacity = 1;
  }
});

navList.addEventListener("mouseout", function (event) {
  navItems.forEach(function (item) {
    item.style.opacity = 1;
  });
});

////////////////////////////////////////////
///////////modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn_close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////////
///////////sticky
const nav = document.querySelector(".nav_bar");
const header = document.querySelector(".section_header");

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
