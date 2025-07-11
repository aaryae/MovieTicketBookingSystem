# Movie Ticket Booking System - Setup Guide

## Prerequisites
- Python 3.8+
- pip
- Node.js (for Streamlit or if you want to extend frontend)
- Git

## 1. Clone the Repository
```
git clone git@github.com:aaryae/MovieTicketBookingSystem.git
cd movieticketbookingsystem
```

## 2. Backend Setup (Django)

### a. Create and activate a virtual environment
```
python3 -m venv venv
source venv/bin/activate
```

### b. Install dependencies
```
pip install -r requirements.txt
```

### c. Apply migrations
```
python manage.py migrate
```

### d. Create a superuser (for admin access)
```
python manage.py createsuperuser
```

### e. Run the backend server
```
python manage.py runserver 8001
```

- The backend API will be available at: http://localhost:8001/

## 3. Frontend Setup

### a. Static HTML/JS (No build step required)
- The main user/admin pages are Django templates in `movie/templates/` and use static JS in `movie/static/js/`.
- All static files are served by Django in development.

### b. Streamlit (if used)
- If you want to use the Streamlit frontend, go to `streamlit_frontend/` and run:
```
cd streamlit_frontend
pip install -r requirements.txt
streamlit run app.py
```

## 4. Usage

- Visit http://localhost:8001/login/ to log in as a user or admin.
- Admins can access the dashboard at http://localhost:8001/sudo/dashboard/
- Users are redirected to /profile after login.
- Users can browse movies, view showtimes, and book seats.
- Admins can add movies, manage users, and view bookings.

## 5. Media & Static Files
- Uploaded movie images are stored in `movie_posters/`.
- Media files are served at http://localhost:8001/movie_posters/<filename>

## 6. API Endpoints
- Movies: `/movie/movies/`
- Showtimes: `/movie/showtimes/`
- Seats: `/movie/seats/`
- Bookings: `/movie/booking/`
- Users: `/api/users/` (admin only)

## 7. Notes
- Make sure to use the correct token (admin or user) for authenticated API calls.
- For development, Django serves static and media files automatically.
- If you change models, run `python manage.py makemigrations` and `python manage.py migrate`.



---
Enjoy your Movie Ticket Booking System! 