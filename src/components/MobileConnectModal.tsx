"use client";
import React, { useEffect } from "react";
import { FaInstagram, FaTiktok, FaLinkedin, FaTimes } from "react-icons/fa";

export type MobileConnectModalProps = {
  open: boolean;
  onClose: () => void;
  instagramUrl?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
};

const MobileConnectModal: React.FC<MobileConnectModalProps> = ({
  open,
  onClose,
  instagramUrl = "https://instagram.com",
  tiktokUrl = "https://tiktok.com",
  linkedinUrl = "https://linkedin.com",
}) => {
  // Lock page scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="connect-modal"
      className="md:hidden fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full sm:max-w-sm mx-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-lg overflow-hidden z-[201]">
        {/* Header WITH title */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#C9A227]/30 bg-[#F5F3E7]">
          <h3 id="connect-title" className="text-sm font-semibold text-[#1b1d1e]">
            Connect
          </h3>
          <button onClick={onClose} className="p-2 hover:opacity-80" aria-label="Schließen">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 grid grid-cols-3 gap-4">
          <a
            href={instagramUrl.trim()}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-[#C9A227]/40 bg-white py-4 hover:border-[#C9A227] transition"
          >
            <FaInstagram className="w-6 h-6" />
            <span className="text-xs">Instagram</span>
          </a>

          <a
            href={tiktokUrl.trim()}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-[#C9A227]/40 bg-white py-4 hover:border-[#C9A227] transition"
          >
            <FaTiktok className="w-6 h-6" />
            <span className="text-xs">TikTok</span>
          </a>

          <a
            href={linkedinUrl.trim()}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-[#C9A227]/40 bg-white py-4 hover:border-[#C9A227] transition"
          >
            <FaLinkedin className="w-6 h-6" />
            <span className="text-xs">LinkedIn</span>
          </a>
        </div>

        {/* iOS safe area */}
        <div className="pb-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
};

export default MobileConnectModal;
