// Call the dataTables jQuery plugin
$(document).ready(async function () {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.matches(".user")) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      if (data.repeatPsw !== data.password) {
        alert("Passwords do not match");
        return;
      }
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "/login.html";
      } else {
        alert("Error");
      }
    }
  });
});
