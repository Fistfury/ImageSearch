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
    
    
        
    return  isAuthenticated && (
        <div className="flex items-center justify-end space-x-3">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-10 h-10 rounded-full" // adjust w- and h- as needed for size
        />
        <div>
          <h2 className="text-sm font-bold">{user?.name}</h2>
        </div>
      </div>
    );
    
  };