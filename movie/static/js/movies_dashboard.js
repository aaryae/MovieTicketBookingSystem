// movie/static/js/movies_dashboard.js

// Fetch and render movies in the dashboard
function fetchAndRenderMovies() {
  const container = document.getElementById("movies-container");
  if (!container) return;
  container.innerHTML = '<p class="text-gray-500">Loading movies...</p>';
  const token = localStorage.getItem("admin_token");
  fetch("http://localhost:8001/movie/movies/", {
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
    },
  })
    .then((res) => res.json())
    .then((movies) => {
      if (Array.isArray(movies) && movies.length > 0) {
        container.innerHTML = movies
          .map((movie) => {
            let imageUrl = movie.image;
            if (imageUrl && imageUrl.startsWith('/')) {
              imageUrl = `http://localhost:8001${imageUrl}`;
            }
            // If imageUrl starts with 'http', use as is
            // If imageUrl is empty or null, leave as is
            return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
              <img src="${imageUrl || ''}" alt="${movie.title}" class="w-full h-48 object-cover rounded mb-3" />
              <h4 class="text-lg font-bold text-gray-800 mb-1">${movie.title}</h4>
              <p class="text-gray-600 mb-2">${movie.description || ""}</p>
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${movie.genre || ""}</span>
                <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">${movie.release_date || ""}</span>
                <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${movie.duration_in_min ? movie.duration_in_min + " min" : ""}</span>
              </div>
            </div>
          `;
          })
          .join("");
      } else {
        container.innerHTML = '<p class="text-gray-500">No movies found.</p>';
      }
    })
    .catch(() => {
      container.innerHTML = '<p class="text-red-500">Failed to load movies.</p>';
    });
}

// Optionally, expose the function globally for dashboard.html to call
window.fetchAndRenderMovies = fetchAndRenderMovies; 