import { useAuth0 } from "@auth0/auth0-react";
import { ImageApp } from "../ImageApp";
import { LoginBtn } from "../LoginBtn";
import { Item } from "../SearchResults";

interface HeroProps {
  setSearchResults: (value: Item[] | null) => void;
  
}

export const Hero = ({ setSearchResults }: HeroProps) => {
  const { isAuthenticated } = useAuth0();
  const treesForest = "/images/treesForest.jpg";
  return (
   
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-cover"
      style={{ backgroundImage: `url(${treesForest})`, height: "50vh" }}
    >
      <h1 className="z-10 text-whiteText text-4xl lg:text-6xl font-bold mb-3">
        Seek and you shall find
      </h1>
      {isAuthenticated ? (
        <div className="z-10">
          <ImageApp setSearchResults={setSearchResults} />
        </div>
      ) : (
        <div className="z-10">
          <LoginBtn />
        </div>
      )}
      
    </div>
  );
};
