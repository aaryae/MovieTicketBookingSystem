import streamlit as st
import requests
import os

API_URL = os.getenv("API_URL", "http://127.0.0.1:8001") 

def login_user():
    # Centered card-like container
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown(
            """
            <div '>
                <h2 style='text-align: center; font-family: "Segoe UI", sans-serif; margin-bottom: 1.2em;'>Login to Your Account</h2>
            """,
            unsafe_allow_html=True
        )
        with st.form("login_form"):
            username = st.text_input("Username", placeholder="Enter your username", help="Your account username")
            password = st.text_input("Password", type="password", placeholder="Enter your password", help="Your account password")
            submitted = st.form_submit_button("Login", use_container_width=True)
            if submitted:
                try:
                    res = requests.post(f"{API_URL}/api-token-auth/", json={"username": username, "password": password})
                    if res.status_code == 200:
                        st.session_state.token = res.json()["token"]
                        st.success("✅ Logged in successfully.")
                        st.experimental_rerun()
                    else:
                        st.error("❌ Invalid username or password.")
                except Exception as e:
                    st.error(f"Something went wrong: {e}")
        st.markdown("""</div>""", unsafe_allow_html=True)

def signup_user():
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown(
            """
            <div >
                <h2 style='text-align: center; font-family: "Segoe UI", sans-serif; margin-bottom: 1.2em;'>Create a New Account</h2>>
            """,
            unsafe_allow_html=True
        )
        with st.form("signup_form"):
            username = st.text_input("Choose Username", placeholder="Pick a username", help="Create a unique username")
            password = st.text_input("Choose Password", type="password", placeholder="Create a password", help="Create a strong password")
            submitted = st.form_submit_button("Sign Up", use_container_width=True)
            if submitted:
                try:
                    res = requests.post(f"{API_URL}/signup/", json={"username": username, "password": password})
                    if res.status_code == 201:
                        st.session_state.token = res.json()["token"]
                        st.success("✅ Signed up and logged in.")
                        st.experimental_rerun()
                    else:
                        st.error(res.json().get("error", "Signup failed."))
                except Exception as e:
                    st.error(f"Something went wrong: {e}")
        st.markdown("""</div>""", unsafe_allow_html=True)
