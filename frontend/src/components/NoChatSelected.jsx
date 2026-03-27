import { MessageSquareText, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/30 animate-fade-in">
      <div className="max-w-sm text-center space-y-6">
        {/* Animated icon cluster */}
        <div className="flex justify-center items-end gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center"
            style={{ animation: "bounce 2.2s infinite 0.4s" }}
          >
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <div
            className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-primary/20"
            style={{ animation: "bounce 2.2s infinite" }}
          >
            <MessageSquareText className="w-8 h-8 text-primary-content" />
          </div>
          <div
            className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center"
            style={{ animation: "bounce 2.2s infinite 0.8s" }}
          >
            <Zap className="w-6 h-6 text-accent" />
          </div>
        </div>

        {/* Welcome text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Welcome to <span className="text-gradient">Chattyply</span>!
          </h2>
          <p className="text-base-content/50 text-sm leading-relaxed">
            Select a conversation from the sidebar to start chatting in real-time.
          </p>
        </div>

        {/* Divider hint */}
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-px flex-1 bg-base-content/20" />
          <span className="text-xs font-medium text-base-content/50">← pick a contact</span>
          <div className="h-px flex-1 bg-base-content/20" />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
