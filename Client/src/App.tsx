import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { LogoutBtn } from "./components/LogoutBtn";
import { Profile } from "./components/Profile";
import { Hero } from "./components/Hero/Hero";
import { useState } from "react";
import { Item, SearchResults } from "./components/SearchResults";
import { NavLink, Route, Routes } from "react-router-dom";
import { Gallery } from "./components/Gallery";

function App() {
  const { isAuthenticated } = useAuth0();
  const [searchResults, setSearchResults] = useState<Item[] | null>(null);

  // const navLinks = isAuthenticated && (
  //   <nav className="bg-transparent text-white absolute top-4 right-4 z-20">
  //     <NavLink
  //       to="/"
  //       className={({ isActive }) => `${isActive ? "underline" : ""} mx-2`}
  //     >
  //       Home
  //     </NavLink>
  //     <NavLink
  //       to="/gallery"
  //       className={({ isActive }) => `${isActive ? "underline" : ""} mx-2`}
  //     >
  //       Gallery
  //     </NavLink>
  //     <Profile />
  //   </nav>
  // );

  return (
    <>
      <div className=" flex flex-col h-screen justify-between">
        <nav className="bg-jet p-4 text-darkGreen flex justify-end">
          <div>
            {isAuthenticated && (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `mr-4 ${isActive ? "underline text-whiteText" : ""}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    `mr-4 ${isActive ? "underline text-whiteText" : ""}`
                  }
                >
                  Gallery
                </NavLink>
              </>
            )}
          </div>
          {isAuthenticated ? <Profile /> : ""}
        </nav>
        <main className="px-4 py-8 flex-grow">
          <Routes>
            {" "}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-stretch space-y-10">
                  <Hero setSearchResults={setSearchResults} />
                  {searchResults && <SearchResults items={searchResults} />}
                </div>
              }
            />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <footer className="bg-jet p-4">
          <div className="flex justify-center">
            {isAuthenticated ? <LogoutBtn /> : ""}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
