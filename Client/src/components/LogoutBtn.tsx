import { useAuth0 } from "@auth0/auth0-react";

export const LogoutBtn = () => {
  const { logout } = useAuth0();

  return (
    <button
      type="button"
      className="
bg-darkGreen
hover:bg-electricPurple
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
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};
