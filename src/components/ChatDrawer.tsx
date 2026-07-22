import React, { useState } from 'react';
import { X, Send, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatDrawer: React.FC = () => {
  const { activeChatBooking, setActiveChatBooking, sendChatMessage, currentPersona } = useApp();
  const [inputText, setInputText] = useState('');

  if (!activeChatBooking) return null;

  const bk = activeChatBooking;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    await sendChatMessage(bk.id, inputText);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl text-slate-100">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentPersona.role === 'customer' ? bk.providerAvatar : bk.customerAvatar}
                alt={currentPersona.role === 'customer' ? bk.providerName : bk.customerName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/40"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 ring-2 ring-slate-950 rounded-full" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>{currentPersona.role === 'customer' ? bk.providerName : bk.customerName}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-[10px] text-slate-400">{bk.serviceTitle} ({bk.bookingCode})</p>
            </div>
          </div>

          <button
            onClick={() => setActiveChatBooking(null)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/60">
          <div className="text-center py-2">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold border border-slate-700/60">
              Encrypted In-App Chat • ServiceLink Secure
            </span>
          </div>

          {bk.messages.map(msg => {
            const isMe = msg.senderRole === currentPersona.role;

            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                  <span>{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message ${currentPersona.role === 'customer' ? bk.providerName : bk.customerName}...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition shadow-md shadow-blue-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
