// movie/static/js/add_movie_modal.js

document.addEventListener("DOMContentLoaded", function () {
  // Only add modal logic if the movies section exists
  const dashboardSection = document.getElementById("dashboardSection");
  if (!dashboardSection) return;

  // Create modal HTML
  const modal = document.createElement("div");
  modal.id = "addMovieModal";
  modal.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 hidden";
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
      <button id="closeAddMovieModalBtn" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
      <h2 class="text-xl font-bold mb-4">Add New Movie</h2>
      <form id="addMovieForm" class="space-y-4" enctype="multipart/form-data">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" required class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Release Date</label>
          <input type="date" name="release_date" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Duration (min)</label>
          <input type="number" name="duration_in_min" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Genre</label>
          <input type="text" name="genre" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" name="image" accept="image/*" class="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Movie</button>
      </form>
      <div id="addMovieError" class="text-red-500 mt-2"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Show modal on button click
  document.addEventListener("click", function (e) {
    if (
      e.target &&
      e.target.textContent.trim() === "Add New movie" &&
      e.target.closest("#dashboardSection")
    ) {
      modal.classList.remove("hidden");
    }
    if (e.target && e.target.id === "closeAddMovieModalBtn") {
      modal.classList.add("hidden");
    }
  });

  // Handle add movie form submit
  document.getElementById("addMovieForm").onsubmit = async function (e) {
    e.preventDefault();
    const form = e.target;
    const errorDiv = document.getElementById("addMovieError");
    errorDiv.textContent = "";
    const formData = new FormData(form);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch("http://localhost:8001/movie/movies/", {
        method: "POST",
        headers: {
          Authorization: token ? `Token ${token}` : undefined
        },
        body: formData
      });
      if (res.ok) {
        modal.classList.add("hidden");
        form.reset();
        // Refresh movies list if function exists
        if (window.fetchAndRenderMovies) {
          window.fetchAndRenderMovies();
        }
      } else {
        const data = await res.json();
        errorDiv.textContent = data.error || "Failed to add movie.";
      }
    } catch (err) {
      errorDiv.textContent = "Error: " + err;
    }
  };
}); 