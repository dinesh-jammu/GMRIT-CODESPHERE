import "./App.css";
import {
  SignedOut,
  SignOutButton,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

/**
 * Render the application's top-level UI with a welcome heading and Clerk authentication controls.
 * 
 * The rendered UI always shows a "Welcome to the app" heading and a UserButton; when the user
 * is signed out it shows a SignIn button that opens Clerk's modal sign-in flow, and when signed
 * in it shows a SignOut button.
 * @returns {JSX.Element} The root JSX element containing the heading, Clerk sign-in/sign-out controls, and the user button.
 */
function App() {
  return (
    <>
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </>
  );
}

export default App;
