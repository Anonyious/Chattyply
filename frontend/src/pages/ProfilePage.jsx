import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle2 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-10 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Card */}
        <div className="bg-base-200/60 rounded-2xl border border-base-300/50 overflow-hidden shadow-sm">
          {/* Banner */}
          <div className="h-24 gradient-brand opacity-80" />

          {/* Avatar + Name */}
          <div className="px-6 pb-6">
            <div className="-mt-12 mb-4 flex items-end justify-between">
              <div className="relative">
                <div className="size-24 rounded-2xl overflow-hidden ring-4 ring-base-200 shadow-xl">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`absolute -bottom-1 -right-1 size-8 rounded-xl gradient-brand flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="size-4 text-primary-content" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>

            <h1 className="text-xl font-bold">{authUser?.fullName}</h1>
            <p className="text-sm text-base-content/50 mt-0.5">
              {isUpdatingProfile ? "Uploading photo..." : "Click the camera icon to update your photo"}
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-base-200/60 rounded-2xl border border-base-300/50 p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-base-content/50">
            Personal Info
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-base-100/60 rounded-xl border border-base-300/40">
              <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/50 font-medium">Full Name</p>
                <p className="text-sm font-semibold truncate">{authUser?.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-base-100/60 rounded-xl border border-base-300/40">
              <div className="size-9 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="size-4 text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/50 font-medium">Email Address</p>
                <p className="text-sm font-semibold truncate">{authUser?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-base-200/60 rounded-2xl border border-base-300/50 p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-base-content/50">
            Account
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-base-300/50">
              <div className="flex items-center gap-2 text-base-content/60">
                <Calendar className="size-4" />
                <span>Member Since</span>
              </div>
              <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-base-content/60">
                <CheckCircle2 className="size-4" />
                <span>Account Status</span>
              </div>
              <span className="badge badge-success badge-sm font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
