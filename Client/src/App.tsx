import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LoginBtn } from "./components/LoginBtn";
import { LogoutBtn } from "./components/LogoutBtn";
import { Profile } from "./components/Profile";
import { ImageApp } from "./components/ImageApp";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <nav className="bg-gray-800 p-4 text-white">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <h1 className="text-xl">Please log in</h1>
          )}
        </nav>
        <main className="px-4 py-8 flex-grow">
          <h1 className="text-4xl font-bold text-center mb-6">Hello there</h1>
          {isAuthenticated ? <ImageApp /> : <LoginBtn />}
        </main>
        <footer className="p-4">
          <div className="flex justify-center">
            {isAuthenticated ? <LogoutBtn /> : ""}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
