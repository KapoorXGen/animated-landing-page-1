import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Flip, SplitText);

const setupTextSplitting = () => {
  const textElements = document.querySelectorAll("h1, h2, p, a");

  textElements.forEach((element) => {
    if (element.dataset.split === "true") return;

    SplitText.create(element, {
      type: "lines",
      linesClass: "line",
    });

    const lines = element.querySelectorAll(".line");
    lines.forEach((line) => {
      const textContent = line.textContent;
      line.innerHTML = `<span>${textContent}</span>`;
    });

    element.dataset.split = "true";
  });
};

function createCounterDigits() {
  const counter1 = document.querySelector(".counter-1");
  ["0", "1"].forEach((num, i) => {
    const div = document.createElement("div");
    div.className = i === 1 ? "num num1offset1" : "num";
    div.textContent = num;
    counter1.appendChild(div);
  });

  const counter2 = document.querySelector(".counter-2");
  for (let i = 0; i <= 10; i++) {
    const div = document.createElement("div");
    div.className = i === 1 ? "num num1offset2" : "num";
    div.textContent = i === 10 ? "0" : i;
    counter2.appendChild(div);
  }

  const counter3 = document.querySelector(".counter-3");
  for (let i = 0; i <= 30; i++) {
    const div = document.createElement("div");
    div.className = "num";
    div.textContent = i % 10;
    counter3.appendChild(div);
  }
}

function animateCounter(counter, duration, delay = 0) {
  const numHeight = counter.querySelector(".num").offsetHeight;
  const total = (counter.children.length - 1) * numHeight;

  gsap.to(counter, {
    y: -total,
    duration,
    delay,
    ease: "power2.inOut",
  });
}
