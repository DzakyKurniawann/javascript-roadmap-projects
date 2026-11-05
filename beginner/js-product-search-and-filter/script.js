const searchInput = document.getElementById("search");
const productItems = document.querySelectorAll(".product-item");

searchInput.addEventListener("input", (e) => filter(e.target.value));

function filter(search) {
  productItems.forEach((item) => {
    if (item.innerHTML.toUpperCase().includes(search.toUpperCase())) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}