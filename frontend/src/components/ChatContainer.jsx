import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, idx) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex items-end gap-2 animate-slide-up ${isSent ? "flex-row-reverse" : "flex-row"}`}
              style={{ animationDelay: `${idx * 0.02}s` }}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="size-7 rounded-full overflow-hidden ring-1 ring-base-300">
                  <img
                    src={isSent ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bubble */}
              <div className={`flex flex-col gap-1 max-w-[70%] ${isSent ? "items-end" : "items-start"}`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[220px] rounded-2xl shadow-sm border border-base-300/30"
                  />
                )}
                {message.text && (
                  <div
                    className={`px-4 py-2.5 text-sm shadow-sm leading-relaxed
                      ${isSent
                        ? "gradient-brand text-primary-content message-bubble-sent"
                        : "bg-base-200 text-base-content message-bubble-received"
                      }`}
                  >
                    {message.text}
                  </div>
                )}
                <time className="text-[10px] text-base-content/40 px-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
