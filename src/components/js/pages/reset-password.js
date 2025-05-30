import { inputStyle, logoStyle, showPassword } from "../formStyle.js";
import { API_URL } from "../../../utils/url.js";
import { Logger } from "../../../utils/Logger.js";

const logger = Logger.getLogger("PasswordReset");

document.addEventListener("DOMContentLoaded", () => {
  initResetPassword();
});

const initResetPassword = () => {
  const form = document.getElementById("resetPasswordForm");
  if (!form) {
    logger.error("Reset password form not found", {
      component: "ResetPasswordForm",
    });
    return;
  }

  // Get token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token) {
    showError(
      document.getElementById("errorMessage"),
      "Invalid reset link. Please request a new password reset."
    );
    return;
  }

  form.innerHTML = `
    <div class="text-[var(--color-text)]">
      <label for="password" class="block text-sm font-medium">New Password</label>
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
    <div class="text-[var(--color-text)]">
      <label for="confirmPassword" class="block text-sm font-medium"
        >Confirm Password</label
      >
      <div class="relative flex items-center justify-center gap-3">
        <i class="fa-solid fa-lock icon-form"></i>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          class="input-form bg-white text-black outline-none focus:ring-2 text-sm rounded-sm"
        />
      </div>
    </div>
    <div>
      <input type="checkbox" name="show-password" id="show-password" />
      <label for="show-password" class="cursor-pointer text-sm text-[var(--color-text)]"
        >Show Password</label
      >
    </div>
    <button
      type="submit"
      class="w-full bg-active-600 text-white py-2 px-4 rounded-md hover:bg-active-700 focus:outline-none focus:ring-2 focus:ring-active-500 focus:ring-offset-2"
    >
      Reset Password
    </button>`;

  inputStyle();
  logoStyle();
  showPassword();
  form.addEventListener("submit", (e) => handleResetPassword(e, token));
};

const handleResetPassword = async (e, token) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const submitButton = e.target.querySelector('button[type="submit"]');

  if (password !== confirmPassword) {
    showError(errorMessage, "Passwords do not match");
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    showError(
      errorMessage,
      "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
    );
    return;
  }

  try {
    submitButton.disabled = true;
    submitButton.innerHTML = `
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-[var(--color-text)] animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Resetting...`;

    logger.info("Initiating password reset", { token });

    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    // Hide error message if it was shown
    errorMessage.classList.add("hidden");

    // Show success message
    showSuccess(
      successMessage,
      "Password reset successful! Redirecting to login..."
    );

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    logger.error("Password reset error:", error);
    showError(errorMessage, error.message || "An error occurred");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Reset Password";
  }
};

const showError = (element, message) => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
};

const showSuccess = (element, message) => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
};
