let btn = document.querySelector("#scrollBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

// Scroll to the top on click
btn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
