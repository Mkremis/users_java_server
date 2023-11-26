$(document).ready(async function () {
  getUsers();
});

async function getUsers() {
  const users = await loadUsers();
  let userList = "";
  for (let user of users) {
    userList += `
     <tr>
            <td>${user.id}</td>
            <td>${user.first} ${user.last}</td>
            <td>${user.email}</td>
            <td>${user.phone || "-"}</td>
            <td>
                <button class="btn btn-danger btn-circle btn-sm" onclick="deleteUser(${
                  user.id
                })" ><i class="fas fa-trash"></i></button>
            </td>
           </tr>`;
  }
  document.querySelector("#users tbody").outerHTML = userList;
  $("#users").DataTable();
}

async function loadUsers() {
  try {
    const res = await fetch("api/users", {
      credentials: "include", // Agrega esta línea para incluir las credenciales
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function deleteUser(id) {
  try {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    const res = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
      credentials: "include", // Agrega esta línea para incluir las credenciales
      headers: {
        "Content-Type": "application/json", // Agrega esta línea para indicar el tipo de contenido JSON
      },
    });
    if (res.ok) {
      getUsers();
    } else {
      throw new Error("Something was wrong!");
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}
