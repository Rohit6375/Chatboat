import React, { useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiClock, FiMinusCircle, FiDownload } from "react-icons/fi";

export default function QueryInput({ value, onChange, onSubmit, loading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 230)}px`;
    }
  }, [value]);

  const handleSubmitInternal = (e) => {
    e.preventDefault(); 
    onSubmit(e);         
  };
  return (
    <form
      onSubmit={handleSubmitInternal}
      className="w-full max-w-3xl mx-auto flex flex-col bg-[#1F2120] rounded-2xl p-4 shadow-lg border border-[#23242a]"
    >
      <div className="flex items-center justify-center h-auto mb-2">
      

        <textarea
          rows="1"
          ref={textareaRef}
          className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-500 resize-none overflow-y-auto max-h-[230px] leading-relaxed py-1 custom-scrollbar"
          placeholder="Ask anything or @mention a Space"
          value={value}
          onChange={onChange}
          disabled={loading}
        />
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-[#23242a] mt-2">
        <div className="flex items-center gap-3">
          <button type="button" className="text-gray-400 hover:text-white">
            <FiClock size={20} />
          </button>
          <button type="button" className="text-gray-400 hover:text-white">
            <FiMinusCircle size={20} />
          </button>
          <button type="button" className="text-gray-400 hover:text-white">
            <FiDownload size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#00bcd4] hover:bg-[#0097a7] text-white rounded-xl px-4 py-2 flex items-center justify-center text-xl font-bold transition-all"
          disabled={loading || !value.trim()}
        >
          <FaArrowUp />
        </button>
      </div>
    </form>
  );
}
