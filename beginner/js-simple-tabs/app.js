const tabNavigation = document.getElementById("tabNavigation");
const tabDisplay = document.getElementById("tabDisplay");
const tabLabels = ["Overview", "Features", "Pricing"];

// Generate Elements
tabLabels.forEach((label, index) => {
  const isFirst = index === 0;
  const tabId = index + 1;

  // Create Button
  const button = document.createElement("button");
  button.id = `tabBtn${tabId}`;
  button.className = `tab-btn ${isFirst ? "isActive" : ""}`;
  button.textContent = label;
  tabNavigation.appendChild(button);

  // Create Content
  const contentDiv = document.createElement("div");
  contentDiv.id = `tabContent${tabId}`;
  contentDiv.className = `tab-content ${isFirst ? "isActive" : ""}`;
  contentDiv.innerHTML = `<h3>${label} Section</h3><p>This is the content for ${label.toLowerCase()}.</p>`;
  tabDisplay.appendChild(contentDiv);
});

// Event Handling
document.addEventListener("click", (event) => {
  const clickedId = event.target.id;

  if (clickedId.startsWith("tabBtn")) {
    const activeNumber = clickedId.replace("tabBtn", "");

    for (let i = 1; i <= tabLabels.length; i++) {
      const content = document.getElementById(`tabContent${i}`);
      const button = document.getElementById(`tabBtn${i}`);

      if (i === parseInt(activeNumber)) {
        content.classList.add("isActive");
        button.classList.add("isActive");
      } else {
        content.classList.remove("isActive");
        button.classList.remove("isActive");
      }
    }
  }
});
