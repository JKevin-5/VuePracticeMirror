const h1 = document.querySelector("h1");
// h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>")

// Support Space:
h1.innerHTML = h1.textContent
  .replace(/\S/g, "<span>$&</span>")
  .replace(/\s/g, "<span>&nbsp;</span>");

let delay = 0;
document.querySelectorAll("span").forEach((span, index) => {
  delay += 0.1;
  if (index === 6) delay += 0.2;
  var br = document.createElement("br");
  debugger;
  if (index === 7) span.append(br);
  span.style.setProperty("--delay", `${delay}s`);
});

h1.addEventListener("animationend", (e) => {
  if (e.target === document.querySelector("h1 span:last-child")) {
    h1.classList.add("ended");
  }
});
