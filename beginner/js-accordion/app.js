// DATA SEEDING
const faqData = [
  {
    id: "faq-1",
    question: "What is JavaScript and why is it used?",
    answer:
      "JavaScript is a high-level, interpreted programming language primarily used to create interactive and dynamic content on websites. It allows developers to implement complex features like real-time updates and animations.",
  },
  {
    id: "faq-2",
    question: "Who created JavaScript and when did it debut?",
    answer:
      "JavaScript was created by Brendan Eich in 1995 while he was working at Netscape Communications. It was originally developed in just 10 days under the name Mocha.",
  },
  {
    id: "faq-3",
    question: "Where is JavaScript executed in a standard web app?",
    answer:
      "By default, JavaScript is executed in the user's web browser (client-side). However, with environments like Node.js, it can also be executed on servers (server-side).",
  },
  {
    id: "faq-4",
    question: "Why should you use 'const' over 'var' in modern JS?",
    answer:
      "Using 'const' ensures block-scoping and prevents accidental variable reassignment. This makes the code more predictable, readable, and easier to debug compared to the function-scoped 'var'.",
  },
  {
    id: "faq-5",
    question: "When should you use Asynchronous JavaScript?",
    answer:
      "Asynchrony is essential when performing time-consuming tasks like fetching API data or reading files. It prevents the main thread from freezing, ensuring a smooth user experience.",
  },
  {
    id: "faq-6",
    question: "How does the Event Loop work in JavaScript?",
    answer:
      "The Event Loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading tasks to the system kernel whenever possible, then picking up the results once the call stack is empty.",
  },
];

const container = document.getElementById("accordion-container");

// RENDER FUNCTION
function renderAccordion() {
  container.innerHTML = faqData
    .map(
      (item) => `
      <div class="accordion-item" id="item-${item.id}">
        <button class="accordion-header" data-id="${item.id}">
          ${item.question}
          <span class="icon">+</span>
        </button>
        <div class="accordion-content">
          <div class="content-inner">
            ${item.answer}
          </div>
        </div>
      </div>`
    )
    .join("");
}

// TOGGLE LOGIC
function handleAccordionClick(event) {
  const header = event.target.closest(".accordion-header");
  if (!header) return;

  const currentItem = header.parentElement;
  const allItems = document.querySelectorAll(".accordion-item");
  const content = currentItem.querySelector(".accordion-content");

  // Close other items
  allItems.forEach((item) => {
    if (item !== currentItem) {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.maxHeight = null;
      item.querySelector(".icon").textContent = "+";
    }
  });

  // Toggle current item
  const isActive = currentItem.classList.toggle("active");

  if (isActive) {
    content.style.maxHeight = content.scrollHeight + "px";
    header.querySelector(".icon").textContent = "-";
  } else {
    content.style.maxHeight = null;
    header.querySelector(".icon").textContent = "+";
  }
}

// INITIALIZATION
renderAccordion();
container.addEventListener("click", handleAccordionClick);
