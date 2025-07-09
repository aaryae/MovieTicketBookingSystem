import streamlit as st
import requests
import os


API_URL = os.getenv("API_URL", "http://127.0.0.1:8001") 

def login_user():
    st.subheader("Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
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

def signup_user():
    st.subheader("Signup")
    username = st.text_input("Choose Username")
    password = st.text_input("Choose Password", type="password")
    if st.button("Signup"):
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
