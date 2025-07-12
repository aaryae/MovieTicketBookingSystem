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
            <div class="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <!-- Image Container with Overlay -->
              <div class="relative overflow-hidden">
                <img src="${imageUrl || ''}" alt="${movie.title}" class="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Floating Genre Badge -->
                <div class="absolute top-3 right-3">
                  <span class="inline-block bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    ${movie.genre || "Unknown"}
                  </span>
                </div>
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Content Section -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h4 class="text-xl font-bold text-gray-800 leading-tight group-hover:text-purple-600 transition-colors duration-200">
                    ${movie.title}
                  </h4>
                  <div class="flex items-center text-yellow-500 ml-2">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="text-sm font-medium">4.5</span>
                  </div>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed mb-4 min-h-[2.5rem]">
                  ${movie.description ? (movie.description.length > 80 ? movie.description.slice(0, 80) + '...' : movie.description) : "No description available"}
                </p>
                
                <!-- Movie Details -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>${movie.release_date || "TBA"}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <span>${movie.duration_in_min ? movie.duration_in_min + " min" : "N/A"}</span>
                    </div>
                  </div>
                  
                  <!-- Action Button -->
                  <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md">
                    Watch Now
                  </button>
                </div>
              </div>
              
              <!-- Bottom Gradient Border -->
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
            </div>
          `;
          })
          .join("");
      } else {
        container.innerHTML = '<p class="text-gray-500">No movies found.</p>';
      }
    })
    .catch(() => {
      container.innerHTML =
        '<p class="text-red-500">Failed to load movies.</p>';
    });
}

// Optionally, expose the function globally for dashboard.html to call
window.fetchAndRenderMovies = fetchAndRenderMovies;