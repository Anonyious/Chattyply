import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareText, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/80 border-b border-base-300/50 fixed w-full top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all group">
            <div className="size-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <MessageSquareText className="w-5 h-5 text-primary-content" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Chatty<span className="text-gradient">ply</span>
            </span>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-1.5">
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost gap-2 rounded-xl hover:bg-base-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm btn-ghost gap-2 rounded-xl hover:bg-base-200 transition-colors"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline text-sm font-medium">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm btn-ghost gap-2 rounded-xl text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
