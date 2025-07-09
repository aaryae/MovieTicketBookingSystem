import streamlit as st
from utils.api import login_user, signup_user

st.set_page_config(page_title="Movie Ticket Booking", layout="wide")

# Hide Streamlit menu, header, and footer, and remove all default padding
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    header {visibility: hidden;}
    footer {visibility: hidden;}
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
    }
    .main .block-container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100vw;
        width: 100vw;
    }
            .st-emotion-cache-gsx7k2{
            display:block;
            margin:auto

            }
            .st-emotion-cache-ss04kk{
            margin:auto;
            }
            .st-emotion-cache-zuyloh{
            border:none;
            padding:0;
            }
    </style>
    """, unsafe_allow_html=True)

if "token" not in st.session_state:
    st.session_state.token = None
if "auth_mode" not in st.session_state:
    st.session_state.auth_mode = "login"  # or "signup"

left, right = st.columns([1, 1])

with left:
    st.markdown(
        """
        <div style='display: flex; flex-direction: column; justify-content: center; height: 100vh;background:white;'>
            <h2 style='display: flex; width:full; justify-content: center;text-align:center; font-size: 4.2em; font-family: "Segoe UI", sans-serif;color:black; '>Welcome to Our <br/> Movie Portal</h2>
            <h2 style='display: flex; width:full; justify-content: center;text-align:center; font-size: 2.2em; font-family: "Segoe UI", sans-serif;color:black; '>Access Movies, Anytime Anywhere</h2>
           
        </div>
        """,
        unsafe_allow_html=True
    )
    st.markdown("""
        <style>
        .stApp { background: #0e1117; }
        </style>
        """, unsafe_allow_html=True)

with right:
    st.markdown("<div style='height: 100% ; margin : auto;'></div>", unsafe_allow_html=True)
    if st.session_state.auth_mode == "login":
        st.markdown(
            '''
            <div style='display: flex; justify-content: center; margin-bottom: 1em;'>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#af4133" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                </svg>
                <div style='margin:auto 0; font-size:1.5rem;'>
                aaryae
                </div>
                
            </div>
            ''',
            unsafe_allow_html=True
        )
        login_user()
        st.markdown("<div style='text-align:center;'>Don't have an account? <a href='#' style='color:#262730;' onclick=\"window.parent.postMessage({auth_mode: 'signup'}, '*')\">Sign up</a></div>", unsafe_allow_html=True)
        if st.button("Go to Signup", key="signup_link"):
            st.session_state.auth_mode = "signup"
            st.experimental_rerun()
    else:
        st.markdown("<h3 style='text-align:center;'>Sign up for an account</h3>", unsafe_allow_html=True)
        signup_user()
        st.markdown("<div style='text-align:center;'>Already have an account? <a href='#' style='color:#262730;' onclick=\"window.parent.postMessage({auth_mode: 'login'}, '*')\">Log in</a></div>", unsafe_allow_html=True)
        if st.button("Go to Login", key="login_link"):
            st.session_state.auth_mode = "login"
            st.experimental_rerun()
