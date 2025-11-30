import { Image, FileUp, SendHorizonal, SendHorizontal } from "lucide-react";

const chat = () => {
  return (
    <div className="flex flex-col h-full justify-end align-bottom">
      <div className="relative w-full">
      <input
        type="text"
        placeholder="Message"
        className="w-full pl-5 pr-12 py-4 rounded-xl border border-gray-300 
                   focus:outline-none focus:border-blue-500 
                   text-base placeholder-gray-500
                   transition-all duration-200"
      />

      {/* Send icon – perfectly inside */}
      <button
        // onClick={handleSend}
        // disabled={!message.trim()}
        className={`absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 
                    p-2.5 rounded-full transition-all duration-200`}
      >
        <SendHorizontal className="w-5 h-5" />
      </button>
    </div>
      <div className="flex  justify-center align-bottom">
        <label htmlFor="file" className="upload-file">
          <FileUp className="upload-icon" /> Upload file
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          accept="file_extensiontext/plain, application/pdf, application/msword, application/zip, application/json"
          id="file"
        />
        <label htmlFor="image" className="btn-upload">
          <Image className="upload-icon" />
          Upload Image
        </label>

        <input
          type="file"
          id="image"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
        />
        <label htmlFor="file"></label>
      </div>
    </div>
  );
};

export default chat;
