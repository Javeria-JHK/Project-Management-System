import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import SignIn from "./SignIn";
import userEvent from "@testing-library/user-event";
import { StoreProvider } from "../../../context/store/StoreProvider";
import { vi } from "vitest";
import * as authApi from "../../../api/auth";
import * as Store from "../../../hooks/useStore";

describe("SignIn Component", () => {
  //Test 1
  it("renders the Sign In form correctly", () => {
    render(
      <StoreProvider>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </StoreProvider>
    );

    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  //Test 2

  it("shows validation errors if email and password are empty", async () => {
    render(
      <StoreProvider>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </StoreProvider>
    );

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(signInButton);

    expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  //Test 3

  it("shows email validation message for invalid email", async () => {
    render(
      <StoreProvider>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </StoreProvider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "invalidemail");
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(signInButton);

    expect(
      screen.getByText(/Please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  //Test 4

  it("calls signIn and dispatches success on valid credentials", async () => {
    const mockDispatch = vi.fn();
    vi.spyOn(Store, "useStore").mockReturnValue({
      state: { auth: { isSigninLoading: false } },
      dispatch: mockDispatch,
    });

    vi.spyOn(authApi, "signIn").mockResolvedValue({
      user: { id: 1, name: "Javeria" },
      tokens: {
        access_token: "mockAccessToken",
        refresh_token: "mockRefreshToken",
      },
    });

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/Email/i), "ali@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "LOGIN_SUCCESS",
        payload: expect.objectContaining({
          user: expect.objectContaining({ name: "Javeria" }),
          accessToken: "mockAccessToken",
          refreshToken: "mockRefreshToken",
        }),
      })
    );
  });

  //Test 5

  it("dispatches LOGIN_FAILURE on invalid credentials", async () => {
    const mockDispatch = vi.fn();

    vi.spyOn(Store, "useStore").mockReturnValue({
      state: { auth: { isSigninLoading: false } },
      dispatch: mockDispatch,
    });

    // Mock the API to return an error
    vi.spyOn(authApi, "signIn").mockResolvedValue({
      error: "Invalid email or password",
    });

    // Render the component
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    // Fill invalid credentials
    await userEvent.type(screen.getByLabelText(/Email/i), "wrong@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });

    // Expect LOGIN_FAILURE dispatched after
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN_FAILURE",
      payload: "Invalid email or password",
    });

    // Expect error message visible on the screen
    expect(
      await screen.findByText(/Invalid email or password/i)
    ).toBeInTheDocument();
  });
});
