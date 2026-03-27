import { MessageSquareText, Zap, Shield, Globe } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const features = [
    { icon: Zap, label: "Instant Delivery" },
    { icon: Shield, label: "End-to-End Secure" },
    { icon: Globe, label: "Always Online" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-md text-center relative z-10">
        {/* Animated chat grid */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl flex items-center justify-center
                ${i === 4 ? "gradient-brand shadow-lg shadow-primary/25" : "bg-base-100/60 border border-base-300/50"}
                ${i % 2 === 0 && i !== 4 ? "animate-pulse" : ""}
              `}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {i === 4 && <MessageSquareText className="w-7 h-7 text-primary-content" />}
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-base-content/60 text-sm leading-relaxed mb-8">{subtitle}</p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-base-100/70 border border-base-300/50 rounded-full text-xs font-medium text-base-content/70"
            >
              <Icon className="w-3 h-3 text-primary" />
              {label}
            </div>
          ))}
        </div>

        {/* Brand watermark */}
        <p className="mt-10 text-xs text-base-content/30 font-semibold tracking-widest uppercase">
          Chattyply
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
