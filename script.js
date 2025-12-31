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

function animateImages() {
  const images = document.querySelectorAll(".img");

  images.forEach((img) => {
    img.classList.remove("animate-out");
  });

  const state = Flip.getState(images);

  images.forEach((img) => {
    img.classList.add("animate-out");
  });

  const mainTimeline = gsap.timeline();

  mainTimeline.add(
    Flip.from(state, {
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
    })
  );

  images.forEach((img, i) => {
    const scaleTimeline = gsap.timeline();

    scaleTimeline
      .to(img, { scale: 2.5, duration: 0.45, ease: "power3.in" }, 0.025)
      .to(img, { scale: 1, duration: 0.45, ease: "power3.out" }, 0.5);

    mainTimeline.add(scaleTimeline, i * 0.1);
  });

  return mainTimeline;
}

document.addEventListener("DOMContentLoaded", () => {
  setupTextSplitting();
  createCounterDigits();

  animateCounter(document.querySelector(".counter-3"), 2.5);
  animateCounter(document.querySelector(".counter-2"), 3);
  animateCounter(document.querySelector(".counter-1"), 2, 1.5);

  const t1 = gsap.timeline();
  gsap.set(".img", { scale: 0 });

  t1.to(".hero-bg", {
    scaleY: 1,
    duration: 3,
    ease: "power2.inOut",
    delay: 0.25,
  });

  t1.to(
    ".img",
    {
      scale: 1,
      stagger: 0.125,
      ease: "power3.out",
    },
    "<"
  );

  t1.to(".counter", {
    opacity: 0,
    duration: 0.3,
    ease: "power3.out",
    delay: 0.3,
    onStart: () => {
      animateImages();
    },
  });

  t1.to(".sidebar .divider", {
    scaleY: 1,
    duration: 1,
    ease: "power3.inOut",
    delay: 1.25,
  });

  t1.to(
    ["nav .divider", ".site-info .divider"],
    {
      scaleX: 1,
      duration: 1,
      stagger: 0.5,
      ease: "power3.inOut",
    },
    "<"
  );
});
