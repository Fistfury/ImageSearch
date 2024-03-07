import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginBtn } from "./components/LoginBtn";
import { LogoutBtn } from "./components/LogoutBtn";

function App() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LoginBtn /> : <LogoutBtn />;
}

export default App;
