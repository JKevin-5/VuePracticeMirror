const h1 = document.querySelector("h1");
// h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>")

// Support Space:
h1.innerHTML = h1.textContent
  .replace(/\S/g, "<span>$&</span>")
  .replace(/\s/g, "<span>&nbsp;</span>");

let delay = 0;
document.querySelectorAll("span").forEach((span, index) => {
  delay += 0.1;
  if (index === 4) delay += 0.3;
  if (index === 6) delay += 0.3;
  if (index === 8) delay += 0.3;
  span.style.setProperty("--delay", `${delay}s`);
});
var brMethod = function (num) {
  var br = document.createElement("br");
  h1.insertBefore(br, document.querySelectorAll("span")[num]);
};
brMethod(4);
brMethod(6);
brMethod(8);
brMethod(10);

h1.addEventListener("animationend", (e) => {
  if (e.target === document.querySelector("h1 span:last-child")) {
    h1.classList.add("ended");
  }
});
