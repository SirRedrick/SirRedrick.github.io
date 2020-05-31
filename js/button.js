// mybutton = document.getElementById("myBtn");

// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }
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
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   // For Chrome, Firefox, IE and Opera
// }
