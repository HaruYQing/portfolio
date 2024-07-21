let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY == 0) {
    nav.style.backgroundColor = "white";
  } else {
    nav.style.backgroundColor = "#EBEBEB";
  }
});
