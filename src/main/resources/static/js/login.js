$(document).ready(async function () {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.matches(".login")) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.text();
      if (result !== "FAIL") {
        localStorage.setItem("token", result);
        localStorage.setItem("mail", data.email);
        window.location.href = "/users.html";
      } else {
        alert("Wrong credentials!");
      }
    }
  });
});
