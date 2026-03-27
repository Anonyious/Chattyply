import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300/60 flex flex-col transition-all duration-200 bg-base-100/60">
      {/* Header */}
      <div className="border-b border-base-300/60 w-full p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg gradient-brand flex items-center justify-center">
            <Users className="size-4 text-primary-content" />
          </div>
          <span className="font-semibold hidden lg:block text-sm">Contacts</span>
          <span className="hidden lg:flex ml-auto badge badge-sm badge-ghost">
            {onlineUsers.length - 1} online
          </span>
        </div>

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-base-content/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full input input-sm input-bordered rounded-xl pl-8 bg-base-200/50 border-base-300/60 text-sm focus:border-primary/40"
          />
        </div>

        {/* Online filter */}
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-xs text-base-content/60">Online only</span>
          </label>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 transition-all duration-150 hover-lift
                ${isSelected
                  ? "bg-primary/10 border-r-2 border-primary"
                  : "hover:bg-base-200/60"
                }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                <div className={`size-11 rounded-full overflow-hidden ring-2 transition-all ${isSelected ? "ring-primary/50" : "ring-base-300/50"}`}>
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100" />
                )}
              </div>

              {/* Info */}
              <div className="hidden lg:flex flex-col text-left min-w-0 flex-1">
                <span className={`text-sm font-medium truncate ${isSelected ? "text-primary" : ""}`}>
                  {user.fullName}
                </span>
                <span className={`text-xs font-medium ${isOnline ? "text-success" : "text-base-content/40"}`}>
                  {isOnline ? "● Online" : "○ Offline"}
                </span>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/40 py-8 text-sm">
            {search ? "No contacts found" : "No online users"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
