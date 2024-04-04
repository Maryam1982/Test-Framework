document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const { value } = document.querySelector("input");
  const msg = document.querySelector("h1");
  if (value.includes("@")) {
    msg.innerHTML = "This is a valid Email!";
  } else {
    msg.innerHTML = "This is not a valid Email!";
  }
});
