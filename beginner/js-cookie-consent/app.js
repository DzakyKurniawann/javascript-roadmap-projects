const cookieBanner = document.getElementById("cookieBanner");

cookieBanner.addEventListener("click", (event) => {
  const clickedElementId = event.target.id;

  if (clickedElementId === "btnAccept" || clickedElementId === "btnReject") {
    cookieBanner.classList.add("is-hidden");

    setTimeout(() => {
      cookieBanner.style.display = "none";
    }, 400);

    if (clickedElementId === "btnAccept") {
      console.log("User accepted cookies.");
    } else {
      console.log("User rejected cookies.");
    }
  }
});
