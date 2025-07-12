# 🎬 Movie Ticketing System

Complete movie booking system with Django backend + HTML, CSS and vanilla JavaScript frontend, featuring Simple authentication Token and real-time seat management.

## ✨ Key Features

- **🎫 Customer**: Browse movies, book seats, manage bookings
- **👨‍💼 Admin**: Manage movies, Manage users, system control
- **🔐 Security**: Simple  ken based auth, role-based access

## 📚 Libraries Used

- **Backend:**
  - [Django 5.2.4](https://www.djangoproject.com/) – High-performance Python web framework

- **Frontend:**
  - [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework (via CDN)
  - **Vanilla JavaScript** – No frontend framework, just modern JS

## 🚀 Quick Setup

### 1. Install & Configure
```bash
# Clone and setup
git clone https://github.com/aaryae/MovieTicketBookingSystem.git
cd MovieTicketBookingSystem
python -m venv menv
source menv/bin/activate  # Windows: menv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
python manage.py createsuperuser
```

### 2. Run Applications
```bash
python3 manage.py runserver 8001
```

## 📁 Folder Structure

```
movieticketbookingsystem/
├── manage.py
├── README.txt
├── requirements.txt
├── pyproject.toml
├── uv.lock
├── db.sqlite3
├── movie/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   │   ├── __init__.py
│   │   ├── 0001_initial.py
│   │   ├── 0002_seat_is_unavailable.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── static/
│   │   └── js/
│   │       ├── admin_dashboard.js
│   │       ├── movies_dashboard.js
│   │       ├── login.js
│   │       ├── signup.js
│   │       └── add_movie_modal.js
│   ├── templates/
│   │   ├── admin_pages/
│   │   │   └── dashboard.html
│   │   ├── user_pages/
│   │   │   ├── profile_landing.html
│   │   │   └── booking_page.html
│   │   ├── auth/
│   │   │   ├── signup.html
│   │   │   └── login.html
│   │   └── index.html
├── moviesystem/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
├── media/
│   └── movie_posters/
```

## 🔐 Authentication Flow
can also check custom django admin panel with localhost:8001/admin


## 🎯 Key Business Logic

- **Role Protection**: Admin-only movie management and protected routes to admin

## 🎟️ Booking Flow

### 1. Login/Register
   - User logs in or creates a new account via the login/signup page.

### 2. Browse Movies
   - After login, the user lands on the movie listing page.
   - User can search and browse available movies.

### 3. Select Movie & Showtime
   - Click on a movie card to view available showtimes.
   - Select a showtime to proceed to seat selection.

### 4. Choose Seat
   - The seat map displays available (green), booked (red), and unavailable (black) seats.
   - Click on a green seat to select it for booking.

### 5. Confirm Booking
   - A confirmation dialog appears before booking.
   - Upon confirmation, the seat is booked and turns red.

### 6. View/Cancel Bookings
   - Booked seats can be cancelled (if allowed) by clicking the 'Cancel' button on the seat.

### 7. Logout
   - User can log out to end the session.

---

## 🛠️ Admin Flow

### 1. Admin Login
   - Admin logs in using admin credentials.
   - Redirected to the admin dashboard.

### 2. Dashboard Overview
   - View system stats, user list, and movie management options.

### 3. Manage Movies
   - Add, edit, or delete movies.
   - Upload movie posters and details.

### 4. Manage Showtimes
   - Add or edit showtimes for movies.
   - Assign showtimes to specific movies.

### 5. Manage Seats
   - View and manage seat availability for each showtime.
   - Mark seats as unavailable (black), available (green), or booked (red).
   - Create new seats for a showtime if needed.

### 6. User Management
   - View all registered users.
   - Delete users if necessary.

### 7. Booking Management
   - View all bookings.
   - Cancel bookings if required.

### 8. Logout
   - Admin can log out to end the session.