import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-base-300/60 bg-base-100/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online ring */}
          <div className="relative">
            <div className="size-10 rounded-full overflow-hidden ring-2 ring-base-300">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-success rounded-full ring-2 ring-base-100" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-sm">{selectedUser.fullName}</h3>
            <p className={`text-xs font-medium ${isOnline ? "text-success" : "text-base-content/40"}`}>
              {isOnline ? "● Online" : "○ Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-circle btn-sm btn-ghost hover:bg-base-200 transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
