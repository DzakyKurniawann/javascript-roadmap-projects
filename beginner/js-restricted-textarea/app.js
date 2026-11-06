const messageInput = document.getElementById("messageInput");
const charCounter = document.getElementById("charCounter");
const maxLimitDisplay = document.getElementById("maxLimit");

const maxLength = parseInt(messageInput.getAttribute("maxlength"));
maxLimitDisplay.textContent = maxLength;

messageInput.addEventListener("input", () => {
  const currentLength = messageInput.value.length;
  charCounter.textContent = currentLength;
  if (currentLength >= maxLength) {
    charCounter.classList.add("is-limit-reached");
  } else {
    charCounter.classList.remove("is-limit-reached");
  }
});
