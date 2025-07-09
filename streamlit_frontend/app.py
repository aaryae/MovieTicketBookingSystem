import streamlit as st
from utils.api import login_user, signup_user

st.set_page_config(page_title="🎟 Movie Ticket Booking", layout="centered")

if "token" not in st.session_state:
    st.session_state.token = None

st.title("🎟 Welcome to Movie Ticket Booking")

menu = st.radio("Select an option:", ["Login", "Signup"])

if menu == "Login":
    login_user()
else:
    signup_user()
