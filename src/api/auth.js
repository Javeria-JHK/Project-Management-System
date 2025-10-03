
export async function signUp(name, email, password) {
  try {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include", // so refresh_token cookie can be set
    });

    const response = await res.json();
    if (!res.ok)
      throw new Error(response.error || "Signup failed, Please try again.");

    return response.data; // { user, access_token }
  } catch (error) {
    console.error("Error while registering:", error);
    return { error: error.message };
  }
}

// 🔹 Sign In
export async function signIn(email, password) {
  try {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
     
    });

    const response = await res.json();

    if (!res.ok)
      throw new Error(response.error || "Signin failed, Please try again.");

    return response.data; // { user, access_token, refresh_token }
  } catch (error) {
    console.error("Error signing in:", error);
    return { error: error.message };
  }
}

// 🔹 Logout
export async function logout(refreshToken) {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),

    });

    const response = await res.json();

    if (!res.ok)
      throw new Error(response.error || "Logout failed, Please try again.");
    
    return response.data;
  } catch (error) {
    console.error("Error Logging out:", error);
    return { error: error.message };
  }
}


