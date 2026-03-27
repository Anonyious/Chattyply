import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going? 👋", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new Chattyply features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-10 max-w-5xl animate-fade-in">
      <div className="space-y-6">
        {/* Page header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-base-content/50">
            Customize your{" "}
            <span className="text-gradient font-semibold">Chattyply</span> experience
          </p>
        </div>

        {/* Theme selector card */}
        <div className="bg-base-200/60 rounded-2xl border border-base-300/50 p-6 shadow-sm space-y-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold">Theme</h2>
            <p className="text-sm text-base-content/50">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all hover-lift
                  ${theme === t ? "bg-base-300 ring-2 ring-primary/30" : "hover:bg-base-300/50"}`}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-lg overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-base-content/70">Preview</h3>
            <div className="rounded-2xl border border-base-300/60 overflow-hidden bg-base-100 shadow-md">
              <div className="p-4 bg-base-200/60">
                <div className="max-w-sm mx-auto">
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Mock header */}
                    <div className="px-4 py-3 border-b border-base-300 flex items-center gap-3">
                      <div className="size-8 rounded-full gradient-brand flex items-center justify-center text-primary-content font-bold text-sm">
                        J
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Jane Smith</p>
                        <p className="text-xs text-success font-medium">● Online</p>
                      </div>
                    </div>

                    {/* Mock messages */}
                    <div className="p-4 space-y-3 min-h-[160px] max-h-[160px] overflow-y-auto bg-base-100">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] px-3 py-2 shadow-sm text-sm leading-relaxed
                              ${message.isSent
                                ? "gradient-brand text-primary-content message-bubble-sent"
                                : "bg-base-200 message-bubble-received"
                              }`}
                          >
                            {message.content}
                            <p className={`text-[10px] mt-1 ${message.isSent ? "text-primary-content/60" : "text-base-content/50"}`}>
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mock input */}
                    <div className="p-3 border-t border-base-300">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-sm flex-1 rounded-xl bg-base-200/50 text-sm"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-sm btn-circle gradient-brand border-none text-primary-content">
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
