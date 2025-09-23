export async function signUp(name, email, password) {
  try {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const response = await res.json();
    if (!res.ok)
      throw new Error(response.error || "Signup failed, Please try again.");

    return response;
  } catch (error) {
    console.error("Error while registering :", error);
    return { error: error.message };
  }
}

export async function signIn(email, password) {
  console.log("Sending:", email, password);
  try {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const response = await res.json();

    if (!res.ok)
      throw new Error(response.error || "Signin failed, Please try again.");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    return { error: error.message };
  }
}

export async function logout() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return { error: "No refresh token found. You may already be logged out." };
  }
  console.log("Sending logout payload:", { refresh_token: refreshToken });
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const response = await res.json();

    if (!res.ok)
      throw new Error(response.error || "Logout failed, Please try again.");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error Logging out:", error);
    return { error: error.message };
  }
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return { error: "No refresh token found." };
  }
  try {
    const res = await fetch(`/api/auth//refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const response = await res.json();

    if (!res.ok) throw new Error(response.error || "Token refresh failed");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { error: error.message };
  }
}
