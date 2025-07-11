// movie/static/js/admin_dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  let token = localStorage.getItem("admin_token");
  if (!token) {
    window.location.href = "/login/";
    return;
  }

  // Modal logic
  const modal = document.createElement("div");
  modal.id = "addUserModal";
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 hidden";
  modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button id="closeModalBtn" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 class="text-xl font-bold mb-4">Add New User</h2>
        <form id="addUserForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" required class="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create User</button>
        </form>
        <div id="addUserError" class="text-red-500 mt-2"></div>
      </div>
    `;
  document.body.appendChild(modal);

  // Show modal on button click
  document.addEventListener("click", function (e) {
    if (e.target && e.target.textContent.trim() === "Add New User") {
      modal.classList.remove("hidden");
    }
    if (e.target && e.target.id === "closeModalBtn") {
      modal.classList.add("hidden");
    }
  });

  // Handle add user form submit
  document.getElementById("addUserForm").onsubmit = async function (e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const errorDiv = document.getElementById("addUserError");
    errorDiv.textContent = "";
    try {
      const res = await fetch("/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.ok) {
        modal.classList.add("hidden");
        form.reset();
        // Refresh user table
        fetchUsers();
      } else {
        const data = await res.json();
        errorDiv.textContent = data.error || "Failed to add user.";
      }
    } catch (err) {
      errorDiv.textContent = "Error: " + err;
    }
  };

  // Fetch users and render table
  function fetchUsers() {
    fetch("/api/users/", {
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => response.json())
      .then((users) => {
        const container = document.getElementById("user-table-container");
        if (Array.isArray(users) && users.length > 0) {
          let table = '<table class="min-w-full bg-white border"><thead><tr>';
          table += '<th class="py-2 px-4 border-b">ID</th>';
          table += '<th class="py-2 px-4 border-b">Username</th>';
          table += '<th class="py-2 px-4 border-b">Email</th>';
          table += '<th class="py-2 px-4 border-b">Staff</th>';
          table += '<th class="py-2 px-4 border-b">Actions</th>';
          table += "</tr></thead><tbody>";
          users.forEach((user) => {
            table += `<tr>
                        <td class="py-2 px-4 border-b">${user.id}</td>
                        <td class="py-2 px-4 border-b">${user.username}</td>
                        <td class="py-2 px-4 border-b">${user.email}</td>
                        <td class="py-2 px-4 border-b">${
                          user.is_staff ? "Yes" : "No"
                        }</td>
                        <td class="py-2 px-4 border-b">
                            <button class="text-red-600 hover:text-red-900 delete-user-btn" data-userid="${user.id}">Delete</button>
                        </td>
                    </tr>`;
          });
          table += "</tbody></table>";
          container.innerHTML = table;

          // Add delete event listeners
          document.querySelectorAll('.delete-user-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  const userId = this.getAttribute('data-userid');
                  if (confirm('Are you sure you want to delete this user?')) {
                      // Remove the row from the table (frontend only)
                      const row = this.closest('tr');
                      if (row) row.remove();
                  }
              });
          });
        } else {
          container.innerHTML = '<p class="text-gray-500">No users found.</p>';
        }
      })
      .catch((err) => {
        document.getElementById("user-table-container").innerHTML =
          '<p class="text-red-500">Failed to load users.</p>';
      });
  }

  // Delete user function
  function deleteUser(userId) {
      // No longer needed, as deletion is now frontend-only
  }

  // Initial fetch
  fetchUsers();
});
