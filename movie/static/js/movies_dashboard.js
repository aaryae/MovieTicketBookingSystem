// movie/static/js/movies_dashboard.js

// Fetch and render movies in the dashboard
function fetchAndRenderMovies(token) {
  const container = document.getElementById("movies-container");
  if (!container) return;
  container.innerHTML = '<p class="text-gray-500">Loading movies...</p>';
  // Use provided token, or fallback to admin_token
  token = token || localStorage.getItem("admin_token");
  fetch("http://localhost:8001/movie/movies/", {
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
    },
  })
    .then((res) => res.json())
    .then((movies) => {
      if (Array.isArray(movies) && movies.length > 0) {
        container.innerHTML = movies
          .map((movie, index) => {
            let imageUrl = movie.image;
            if (imageUrl && imageUrl.startsWith("/movie_posters/")) {
              imageUrl = `http://localhost:8001${imageUrl}`;
            }

            // Create a more sophisticated card design
            return `
            <div class="group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-royal-blue/20 animate-fade-in" 
                 onclick="handleMovieBoxClick(${movie.id})"
                 style="animation-delay: ${index * 0.1}s">
              
              <!-- Movie Poster Container with Overlay Effects -->
              <div class="relative overflow-hidden rounded-t-2xl">
                <img src="${
                  imageUrl ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }" 
                     alt="${movie.title}" 
                     class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <!-- Rating Badge -->
                <div class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ ${(Math.random() * 2 + 7).toFixed(1)}
                </div>
              </div>
              
              <!-- Content Section -->
              <div class="p-6 space-y-4">
                <!-- Title with Gradient Text -->
                <h4 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 group-hover:from-royal-blue group-hover:to-royal-blue-dark transition-all duration-500">
                  ${movie.title}
                </h4>
                
                <!-- Description with Fade Effect -->
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                  ${
                    movie.description
                      ? (() => {
                          const words = movie.description.split(/\s+/);
                          return words.length > 20
                            ? words.slice(0, 20).join(" ") + "..."
                            : movie.description;
                        })()
                      : "Discover this amazing movie experience..."
                  }
                </p>
                
                <!-- Enhanced Tags with Icons -->
                <div class="flex flex-wrap gap-2">
                  ${
                    movie.genre
                      ? `
                    <span class="inline-flex items-center gap-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200/50 shadow-sm">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      ${movie.genre}
                    </span>
                  `
                      : ""
                  }
                  
                  ${
                    movie.release_date
                      ? `
                    <span class="inline-flex items-center gap-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      ${movie.release_date}
                    </span>
                  `
                      : ""
                  }
                  
                  ${
                    movie.duration_in_min
                      ? `
                    <span class="inline-flex items-center gap-1 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full border border-green-200/50 shadow-sm">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c.38-.32.69-.52.69-.52V9h-2v2.34l1.31.2z"/>
                      </svg>
                      ${movie.duration_in_min} min
                    </span>
                  `
                      : ""
                  }
                </div>
                
                <!-- Bottom Action Bar -->
                <div class="flex items-center justify-end pt-4 border-t border-gray-100">
                  <div class="text-xs text-gray-400 group-hover:text-royal-blue transition-colors duration-300">
                    Click to book →
                  </div>
                </div>
              </div>
              
              <!-- Subtle Border Glow on Hover -->
              <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-royal-blue/30 transition-all duration-500 pointer-events-none"></div>
            </div>
          `;
          })
          .join("");
      } else {
        container.innerHTML = `
          <div class="col-span-full text-center py-20">
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 shadow-lg border border-gray-200/50">
              <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">No Movies Available</h3>
              <p class="text-gray-500">Check back later for exciting new releases!</p>
            </div>
          </div>
        `;
      }
    })
    .catch(() => {
      container.innerHTML = `
        <div class="col-span-full text-center py-20">
          <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-12 shadow-lg border border-red-200/50">
            <div class="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-red-700 mb-2">Failed to Load Movies</h3>
            <p class="text-red-500">Please check your connection and try again.</p>
          </div>
        </div>
      `;
    });
}

// Optionally, expose the function globally for dashboard.html to call
window.fetchAndRenderMovies = fetchAndRenderMovies;

// Add global handler for movie box click
window.handleMovieBoxClick = function (movieId) {
  const token =
    localStorage.getItem("user_token") || localStorage.getItem("admin_token");
  fetch("http://localhost:8001/movie/showtimes/", {
    headers: { Authorization: token ? `Token ${token}` : undefined },
  })
    .then((res) => res.json())
    .then((showtimes) => {
      const filtered = showtimes.filter((st) => st.movie === movieId);
      if (filtered.length === 1) {
        window.location.href = `/booking/${movieId}/?showtime=${filtered[0].id}`;
      } else if (filtered.length > 1) {
        const options = filtered
          .map((st) => `${st.id}: ${new Date(st.start_time).toLocaleString()}`)
          .join("\n");
        const chosen = prompt("Select showtime by ID:\n" + options);
        const selected = filtered.find((st) => st.id == chosen);
        if (selected) {
          window.location.href = `/booking/${movieId}/?showtime=${selected.id}`;
        }
      } else {
        alert("No showtimes available for this movie.");
      }
    });
};
