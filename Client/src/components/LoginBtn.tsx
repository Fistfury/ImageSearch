import { useAuth0 } from "@auth0/auth0-react";

export const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <button
        type="button"
        className="
    bg-blue-500 
    hover:bg-blue-700 
    text-white 
    font-bold 
    py-2 
    px-4 
    rounded 
    shadow 
    transition 
    duration-200 
    ease-in-out 
    transform 
    hover:-translate-y-1 
    hover:scale-110
  "
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </>
  );
};
