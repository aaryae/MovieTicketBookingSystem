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
                        <td class="py-2 px-4 border-b">${user.is_staff ? "Yes" : "No"}</td>
                        <td class="py-2 px-4 border-b">
                            <button class="text-red-600 hover:text-red-900 delete-user-btn" data-userid="${user.id}">Delete</button>
                        </td>
                    </tr>`;
          });
          table += "</tbody></table>";
          container.innerHTML = table;

          // Add delete event listeners (frontend only)
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

  // SHOWTIME MANAGEMENT FUNCTIONS
  function loadShowtimesData() {
    console.log("loadShowtimesData called");
    loadMoviesForSelect();
    loadShowtimesList();
  }

  function loadMoviesForSelect() {
    const select = document.getElementById("showtime-movie-select");
    if (!select) {
      console.log("Movie select element not found");
      return;
    }
    
    const token = localStorage.getItem("admin_token");
    console.log("Loading movies with token:", token ? "Token present" : "No token");
    
    fetch("http://localhost:8001/movie/movies/", {
      headers: { Authorization: token ? `Token ${token}` : undefined },
    })
      .then((res) => {
        console.log("Movies API response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((movies) => {
        console.log("Movies fetched:", movies);
        select.innerHTML = '<option value="">Select a movie...</option>' + 
          movies.map((m) => `<option value="${m.id}">${m.title}</option>`).join("");
        console.log("Dropdown populated with", movies.length, "movies");
      })
      .catch((err) => {
        console.error("Error loading movies:", err);
        select.innerHTML = '<option value="">Error loading movies</option>';
      });
  }

  function loadShowtimesList() {
    const container = document.getElementById("showtimes-list-container");
    if (!container) return;
    
    const token = localStorage.getItem("admin_token");
    Promise.all([
      fetch("http://localhost:8001/movie/movies/", {
        headers: { Authorization: token ? `Token ${token}` : undefined },
      }).then((res) => res.json()),
      fetch("http://localhost:8001/movie/showtimes/", {
        headers: { Authorization: token ? `Token ${token}` : undefined },
      }).then((res) => res.json()),
    ]).then(([movies, showtimes]) => {
      // Create movie lookup map
      const movieMap = {};
      movies.forEach((m) => (movieMap[m.id] = m));
      
      // Group showtimes by movie
      const grouped = {};
      showtimes.forEach((st) => {
        if (!grouped[st.movie]) grouped[st.movie] = [];
        grouped[st.movie].push(st);
      });
      
      let html = '';
      Object.keys(grouped).forEach((movieId) => {
        const movie = movieMap[movieId];
        html += `<div class="mb-6 p-4 border rounded-lg">
          <h4 class="text-lg font-bold text-gray-800 mb-3">${movie ? movie.title : 'Movie #' + movieId}</h4>
          <div class="space-y-2">`;
        grouped[movieId].forEach((st) => {
          const date = new Date(st.start_time).toLocaleString();
          html += `<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-blue-700 font-mono">${date}</span>
            <div class="flex gap-2">
              <a href="/booking/${movieId}/?showtime=${st.id}" class="text-xs text-blue-500 underline">Manage Seats</a>
              <button onclick="deleteShowtime(${st.id})" class="text-xs text-red-500 underline">Delete</button>
            </div>
          </div>`;
        });
        html += '</div></div>';
      });
      
      if (!html) html = '<p class="text-gray-500">No showtimes found.</p>';
      container.innerHTML = html;
    }).catch((err) => {
      console.error("Error loading showtimes:", err);
      container.innerHTML = '<p class="text-red-500">Failed to load showtimes.</p>';
    });
  }

  function deleteShowtime(showtimeId) {
    if (!confirm("Are you sure you want to delete this showtime?")) return;
    
    const token = localStorage.getItem("admin_token");
    fetch(`http://localhost:8001/movie/showtimes/${showtimeId}/`, {
      method: "DELETE",
      headers: { Authorization: token ? `Token ${token}` : undefined },
    })
      .then((res) => {
        if (res.ok) {
          loadShowtimesList();
        } else {
          alert("Failed to delete showtime");
        }
      })
      .catch((err) => {
        console.error("Error deleting showtime:", err);
        alert("Error deleting showtime");
      });
  }

  // Handle showtime form submission
  const showtimeForm = document.getElementById("addShowtimeForm");
  if (showtimeForm) {
    showtimeForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      const movie = document.getElementById("showtime-movie-select").value;
      const start_time = document.getElementById("showtime-start-time").value;
      const errorDiv = document.getElementById("addShowtimeError");
      
      if (!movie || !start_time) {
        errorDiv.textContent = "Please select a movie and start time.";
        return;
      }
      
      errorDiv.textContent = "";
      const token = localStorage.getItem("admin_token");
      
      try {
        const res = await fetch("http://localhost:8001/movie/showtimes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : undefined,
          },
          body: JSON.stringify({ movie, start_time }),
        });
        
        if (res.ok) {
          showtimeForm.reset();
          loadShowtimesList();
          errorDiv.textContent = "Showtime added successfully!";
          setTimeout(() => errorDiv.textContent = "", 3000);
        } else {
          const data = await res.json();
          errorDiv.textContent = data.error || "Failed to add showtime.";
        }
      } catch (err) {
        console.error("Error adding showtime:", err);
        errorDiv.textContent = "Error adding showtime.";
      }
    });
  }

  // Make functions globally available
  window.loadShowtimesData = loadShowtimesData;
  window.deleteShowtime = deleteShowtime;
  
  // Debug function to manually set admin token (for testing)
  window.setAdminToken = function(token) {
    localStorage.setItem('admin_token', token);
    console.log('Admin token set:', token);
    alert('Admin token set! Refresh the page or navigate to Showtimes section.');
  };
  
  // Debug function to check current token
  window.checkToken = function() {
    const token = localStorage.getItem('admin_token');
    console.log('Current admin token:', token ? 'Present' : 'Missing');
    if (token) {
      console.log('Token value:', token);
    }
    return token;
  };

  // Initial fetch
  fetchUsers();
}); 