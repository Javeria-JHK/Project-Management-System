
export async function fetchWithAuth(url, options = {}, state, dispatch) {
      const token = localStorage.getItem("accessToken");

  options.headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  let res = await fetch(url, options);

  if (res.status === 401) {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      dispatch({ type: "LOGOUT" });
      throw new Error("Session expired");
    }

    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token }),
    });

    if (!refreshRes.ok) {
      dispatch({ type: "LOGOUT" });
      throw new Error("Session expired");
    }
    console.log("Token refreshed");

    const refreshData = await refreshRes.json();
    dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: refreshData.data });

    localStorage.setItem("accessToken", refreshData.data.access_token);
    localStorage.setItem("refreshToken", refreshData.data.refresh_token);

    options.headers.Authorization = `Bearer ${refreshData.data.access_token}`;
    res = await fetch(url, options);
  }

  return res;
}
