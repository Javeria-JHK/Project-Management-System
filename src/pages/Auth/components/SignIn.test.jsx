// import { render, screen } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import { describe, it, expect } from "vitest";
// import SignIn from "./SignIn";
// import userEvent from "@testing-library/user-event";
// import { StoreProvider } from "../../../context/store/StoreProvider";
// import { vi } from "vitest";
// import * as authApi from "../../../api/auth";
// import * as Store from "../../../hooks/useStore";
// import Button from "../../../components/ui/Button";

// describe("SignIn Component", () => {
//   //Test 1
//   it("renders the Sign In form correctly", () => {
//     render(
//       <StoreProvider>
//         <BrowserRouter>
//           <SignIn />
//         </BrowserRouter>
//       </StoreProvider>
//     );

//     expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /Sign In/i })
//     ).toBeInTheDocument();
//   });

//   //Test 2

//   it("shows validation errors if email and password are empty", async () => {
//     render(
//       <StoreProvider>
//         <BrowserRouter>
//           <SignIn />
//         </BrowserRouter>
//       </StoreProvider>
//     );

//     const signInButton = screen.getByRole("button", { name: /sign in/i });
//     await userEvent.click(signInButton);

//     expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
//     expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
//   });

//   //Test 3

//   it("shows email validation message for invalid email", async () => {
//     const { getByLabelText, getByRole, getByText } = render(
//       <StoreProvider>
//         <BrowserRouter>
//           <SignIn />
//         </BrowserRouter>
//       </StoreProvider>
//     );

//     const emailInput = getByLabelText(/Email/i);
//     await userEvent.type(emailInput, "invalidemail");
//     const signInButton = getByRole("button", { name: /sign in/i });
//     await userEvent.click(signInButton);

//     expect(
//       getByText(/Please enter a valid email address/i)
//     ).toBeInTheDocument();
//   });

//   //Test 4

//   it("calls signIn and dispatches success on valid credentials", async () => {
//     const mockDispatch = vi.fn();
//     vi.spyOn(Store, "useStore").mockReturnValue({
//       state: { auth: { isSigninLoading: false } },
//       dispatch: mockDispatch,
//     });

//     vi.spyOn(authApi, "signIn").mockResolvedValue({
//       user: { id: 1, name: "Javeria" },
//       tokens: {
//         access_token: "mockAccessToken",
//         refresh_token: "mockRefreshToken",
//       },
//     });

//     const { getByLabelText, getByRole } = render(
//       <BrowserRouter>
//         <SignIn />
//       </BrowserRouter>
//     );

//     await userEvent.type(getByLabelText(/Email/i), "ali@example.com");
//     await userEvent.type(getByLabelText(/Password/i), "123456");
//     await userEvent.click(getByRole("button", { name: /sign in/i }));

//     expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });

//     expect(mockDispatch).toHaveBeenCalledWith(
//       expect.objectContaining({
//         type: "LOGIN_SUCCESS",
//         payload: expect.objectContaining({
//           user: expect.objectContaining({ name: "Javeria" }),
//           accessToken: "mockAccessToken",
//           refreshToken: "mockRefreshToken",
//         }),
//       })
//     );
//   });

//   //Test 5

//   it("dispatches LOGIN_FAILURE on invalid credentials", async () => {
//     const mockDispatch = vi.fn();

//     vi.spyOn(Store, "useStore").mockReturnValue({
//       state: { auth: { isSigninLoading: false } },
//       dispatch: mockDispatch,
//     });

//     // Mock the API to return an error
//     vi.spyOn(authApi, "signIn").mockResolvedValue({
//       error: "Invalid email or password",
//     });

//     // Render the component

//     const { getByLabelText, getByRole, findByText } = render(
//       <BrowserRouter>
//         <SignIn />
//       </BrowserRouter>
//     );

//     // Fill invalid credentials
//     await userEvent.type(getByLabelText(/Email/i), "wrong@example.com");
//     await userEvent.type(getByLabelText(/Password/i), "wrongpassword");
//     await userEvent.click(getByRole("button", { name: /sign in/i }));

//     expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });

//     // Expect LOGIN_FAILURE dispatched after
//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: "LOGIN_FAILURE",
//       payload: "Invalid email or password",
//     });

//     // Expect error message visible on the screen
//     expect(await findByText(/Invalid email or password/i)).toBeInTheDocument();
//   });

//   it("renders spinner and disables the button when loading", () => {
//     const { getByRole, queryByText } = render(
//       <Button isLoading={true}>Sign In</Button>
//     );

//     // Check that the button is disabled
//     const button = getByRole("button");
//     expect(button).toBeDisabled();

//     // Check that the spinner is visible
//     // You can match it by its animation or shape class
//     const spinner = button.querySelector(".animate-spin");
//     expect(spinner).toBeInTheDocument();

//     // The text "Sign In" should NOT appear during loading

//     expect(queryByText(/sign in/i)).not.toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import SignIn from "./SignIn";
import Button from "../../../components/ui/Button";
import { StoreProvider } from "../../../context/store/StoreProvider";
import * as authApi from "../../../api/auth";
import * as Store from "../../../hooks/useStore";

// ✅ Helper function to DRY the render logic
const renderWithProviders = (ui) => {
  return render(
    <StoreProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </StoreProvider>
  );
};

describe("SignIn Component Tests", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    vi.restoreAllMocks(); // resets spies between tests to prevent leakage
  });

  // ✅ Test 1: UI rendering check
  it("renders all essential form elements correctly", () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  // ✅ Test 2: Required field validation
  it("shows validation errors when email and password are empty", async () => {
    renderWithProviders(<SignIn />);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    await userEvent.click(signInButton);

    expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  // ✅ Test 3: Invalid email validation
  it("displays validation message for invalid email format", async () => {
    renderWithProviders(<SignIn />);
    const emailInput = screen.getByLabelText(/Email/i);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    await userEvent.type(emailInput, "invalidemail");
    await userEvent.click(signInButton);

    expect(
      screen.getByText(/Please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  // ✅ Test 4: Successful login dispatch flow
  it("calls signIn API and dispatches LOGIN_SUCCESS on valid credentials", async () => {
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
          user: expect.objectContaining({ id: 1, name: "Javeria" }),
          accessToken: "mockAccessToken",
          refreshToken: "mockRefreshToken",
        }),
      })
    );
  });

  // ✅ Test 5: Failed login flow
  it("dispatches LOGIN_FAILURE on invalid credentials", async () => {
    vi.spyOn(Store, "useStore").mockReturnValue({
      state: { auth: { isSigninLoading: false } },
      dispatch: mockDispatch,
    });

    vi.spyOn(authApi, "signIn").mockResolvedValue({
      error: "Invalid email or password",
    });

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/Email/i), "wrong@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN_FAILURE",
      payload: "Invalid email or password",
    });

    expect(
      await screen.findByText(/Invalid email or password/i)
    ).toBeInTheDocument();
  });

  // ✅ Test 6: Spinner behavior during loading
  it("renders spinner and disables the button when loading", () => {
    render(<Button isLoading={true}>Sign In</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});
