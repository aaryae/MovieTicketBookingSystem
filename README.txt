# 🎬 Movie Ticketing System

Complete movie booking system with Django backend + HTML, CSS and vanilla JavaScript frontend, featuring Simple authentication Token and real-time seat management.

## ✨ Key Features

- **🎫 Customer**: Browse movies, book seats, manage bookings
- **👨‍💼 Admin**: Manage movies, Manage users, system control
- **🔐 Security**: Simple auth, role-based access

##  Libraries Used

```bash
# Core Framework
Django>=0.104.1              # High-performance web framework


# Database 
sqlite>=2.0.23             # SQL toolkit and ORM


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


##  Authentication Flow
can also check custom django admin panel with localhost:8001/admin



## 🎯 Key Business Logic

- **Role Protection**: Admin-only movie management and protected routes to admin

---