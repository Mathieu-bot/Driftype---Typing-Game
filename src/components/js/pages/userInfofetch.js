import { API_URL } from "../../../utils/url.js";

const usernameField = document.querySelectorAll("#username");
const navUsername = document.querySelector("#nav_username");
const usernameInput = document.querySelector("#username-input");
const emailInput = document.querySelectorAll("#email");
const usernameLabel = document.querySelector("#username-label");
const emailLabel = document.querySelector("#email-label");

const getUsernameNdEmail = async () => {
  const token = localStorage.getItem("typing_game_token");
  const userData = localStorage.getItem("typing_game_user");
  if (!userData) {
    console.debug("No user data found, setting as Guest");
    if (usernameField)
      usernameField.forEach((field) => (field.textContent = "Guest"));

    if (usernameInput) usernameInput.value = "Guest";
    if (emailInput)
      emailInput.forEach((input) => {
        if (input) input.value = "Guest";
      });
    if (emailLabel) emailLabel.textContent = "Guest";
    if (usernameLabel) usernameLabel.textContent = "Guest";
    navUsername.textContent = "Guest";
    return null;
  }
  try {
    const { id, email } = JSON.parse(userData);
    if (!id) {
      console.error("Invalid user data: no ID found");
      return null;
    }

    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch user data:", response.statusText);
      return null;
    }

    const data = await response.json();
    if (!data || !data[0] || !data[0].username) {
      console.error("Invalid user data received from server");
      return null;
    }

    const username = data[0].username;
    console.debug("User data fetched successfully:", username);

   
    if (usernameField)
      usernameField.forEach((field) => (field.textContent = username));
    if (usernameInput) usernameInput.value = username;
    if (emailInput)
      emailInput.forEach((input) => {
        if (input) input.value = email;
      });
    if (emailLabel) emailLabel.textContent = email;
    if (usernameLabel) usernameLabel.textContent = username;
    navUsername.textContent = username;

    return { id, username, email };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Only run if we're on a page that needs user info
if (
  document.querySelector("#username") ||
  document.querySelector("#username-input")
) {
  getUsernameNdEmail();
}
