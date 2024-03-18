import { useAuth0 } from "@auth0/auth0-react";

interface UserProfile {
  picture: string;
  name: string;
  email: string;
}
export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<UserProfile>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex items-center justify-end space-x-3">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-8 h-8 rounded-full"
        />
      </div>
    )
  );
};
