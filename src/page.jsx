import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaEnvelope,
  FaCode,
} from "react-icons/fa6";

export default function SharePanel() {
  const shareUrl = window.location.href;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareItems = [
    {
      label: "Embed",
      icon: <FaCode size={20} />,
      bg: "bg-gray-200 text-black",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp size={22} />,
      bg: "bg-green-500 text-white",
      link: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: <FaFacebookF size={20} />,
      bg: "bg-blue-600 text-white",
      link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      label: "X",
      icon: <FaXTwitter size={20} />,
      bg: "bg-black text-white",
      link: `https://twitter.com/intent/tweet?url=${shareUrl}`,
    },
    {
      label: "Email",
      icon: <FaEnvelope size={20} />,
      bg: "bg-gray-400 text-white",
      link: `mailto:?body=${shareUrl}`,
    },
  ];

  return (
    <div className="w-full max-w-xl rounded-2xl bg-[#1f1f1f] p-4 text-white shadow-xl">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold">Share</h2>

      {/* Icons Row */}
      <div className="mb-5 flex gap-4 overflow-x-auto scrollbar-hide">
        {shareItems.map((item, index) => (
          <a
            key={index}
            href={item.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-[72px] flex-col items-center gap-2"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg} hover:scale-105 transition`}
            >
              {item.icon}
            </div>
            <span className="text-xs text-gray-300">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Copy Link */}
      <div className="flex items-center gap-3 rounded-full bg-[#2a2a2a] px-4 py-2">
        <input
          value={shareUrl}
          readOnly
          className="flex-1 bg-transparent text-sm text-gray-300 outline-none truncate"
        />
        <button
          onClick={copyLink}
          className="rounded-full bg-blue-500 px-4 py-1.5 text-sm font-medium hover:bg-blue-600"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}