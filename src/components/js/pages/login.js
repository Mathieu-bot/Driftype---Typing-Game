import { inputStyle, logoStyle, showPassword } from "../formStyle.js";
import { Logger } from "../../../utils/Logger.js";
import { API_URL } from "../../../utils/url.js";

const logger = Logger.getLogger("Authentication");
export const TOKEN_KEY = "typing_game_token";
export const USER_KEY = "typing_game_user";
const DEFAULT_ERROR_MSG = "An error occurred. Please try again.";

document.addEventListener("DOMContentLoaded", () => {
  initLogin();
});

window.handleGoogleSignIn = async (response) => {
  const errorElement = document.getElementById("errorMessage");
  

  try {
    const { credential } = response;

    const googleResponse = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
      credentials: "include",
    });

    if (!googleResponse.ok) {
      const data = await googleResponse.json();
      showError(errorElement, data.message || DEFAULT_ERROR_MSG);
      return;
    }

    const data = await googleResponse.json();
    storeAuthData(data.token, data.user);
    redirectToDashboard();
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    showError(errorElement, error.message || DEFAULT_ERROR_MSG);
  }
};

const initLogin = () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) {
    logger.error("Login form not found", { component: "LoginForm" });
    return;
  }

  loginForm.innerHTML = `
        <div class="text-[var(--color-text)]">
          <label for="email" class="text-bases block font-medium">Email</label>
          <div class="flex items-center justify-center gap-3">
            <i class="fa-solid fa-envelope icon-form"></i>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="input-form bg-white text-black outline-none focus:ring-2 text-sm rounded-sm"
            />
          </div>
        </div>
        <div class="text-[var(--color-text)]">
          <label for="password" class="text-bases block font-medium"
            >Password</label
          >
          <div class="relative flex items-center justify-center gap-3">
            <i class="fa-solid fa-lock icon-form"></i>
            <input
              type="password"
              id="password"
              name="password"
              required
              class="input-form bg-white text-black outline-none focus:ring-2 text-sm rounded-sm"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <div>
            <input type="checkbox" name="show-password" id="show-password" />
            <label for="show-password" class="cursor-pointer text-sm text-[var(--color-text)]"
              >Show Password</label
            >
          </div>
          <a
            href="forgot-password.html"
            class="text-active-600 hover:text-active-700 text-sm"
            >Forgot Password?</a
          >
        </div>
        <button
          type="submit"
          class="cursor-pointer bg-active-600 hover:bg-active-700 focus:ring-active-500 w-full rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Sign In
        </button>`;
  inputStyle();
  logoStyle();
  showPassword();
  loginForm.addEventListener("submit", handleLogin);
};

const handleLogin = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById("errorMessage");
  const submitButton = e.target.querySelector("button[type='submit']");

  if (!validateInputs(email, password, errorElement)) return;

  try {
    setLoadingState(submitButton, true);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      showError(errorElement, data.message || DEFAULT_ERROR_MSG);
      return;
    }

    const data = await response.json();
    storeAuthData(data.token, data.user);
    redirectToDashboard();
  } catch (error) {
    showError(errorElement, error.message || DEFAULT_ERROR_MSG);
  } finally {
    setLoadingState(submitButton, false);
  }
};

// Validate inputs
const validateInputs = (email, password, errorElement) => {
  if (!email || !password) {
    showError(errorElement, "Please fill in all fields");
    return false;
  }
  return true;
};

// loading state
export const setLoadingState = (button, isLoading) => {
  if (!button) return;

  button.disabled = isLoading;
  button.innerHTML = isLoading
    ? `
  
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-[var(--color-text)] animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
`
    : "Login";
};

// Store auth data
export const storeAuthData = (token, user) => {
  if (!token || !user) {
    logger.error("Invalid authentication data received", {
      token: !!token,
      user: !!user,
    });
    throw new Error("Invalid auth data");
  }

  try {
    // storage of user data with expiration date (7 days)
    const userData = {
      ...user,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    logger.info("Authentication data stored successfully", { userId: user.id });
  } catch (e) {
    logger.error("Failed to store authentication data", { error: e.message });
    throw new Error("Storage error: " + e.message);
  }
};

export const redirectToDashboard = () => {
  try {
    const redirectUrl = new URL(
      "src/components/pages/dashboard.html",
      window.location.origin
    );
    logger.debug("Redirecting to dashboard", { url: redirectUrl.toString() });
    window.location.replace(redirectUrl.toString());
  } catch (e) {
    logger.error("Failed to redirect to dashboard", { error: e.message });
    console.error("Redirection error:", e);
  }
};

export const showError = (element, message) => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
  setTimeout(() => element.classList.add("hidden"), 5000);
};
