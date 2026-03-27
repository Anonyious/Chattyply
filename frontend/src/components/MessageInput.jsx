import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { ImagePlus, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="px-4 py-3 border-t border-base-300/60 bg-base-100/80 backdrop-blur-sm">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 animate-scale-in">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-primary/20 shadow-md"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 size-5 rounded-full bg-error text-error-content flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Image attach button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`btn btn-circle btn-sm transition-all ${
            imagePreview
              ? "btn-primary shadow-md shadow-primary/25"
              : "btn-ghost hover:bg-base-200"
          }`}
        >
          <ImagePlus size={17} />
        </button>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Text input */}
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full input input-bordered rounded-2xl input-sm sm:input-md bg-base-200/50 border-base-300/60 focus:border-primary/50 focus:bg-base-100 transition-all pr-4"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`btn btn-circle btn-sm sm:btn-md transition-all duration-200 ${
            canSend
              ? "gradient-brand border-none text-primary-content shadow-md shadow-primary/25 hover:scale-105"
              : "btn-ghost opacity-40"
          }`}
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
