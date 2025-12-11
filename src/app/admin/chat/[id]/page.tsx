"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Send, User, Bot } from "lucide-react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const toUserId = params?.id; // the person you are chatting with

  const fromUserId ='9ba79806-a12f-421b-b1d2-2919f48a52aa';

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // ===================== FETCH CHAT MESSAGES =====================
  const loadMessages = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages/${fromUserId}/${toUserId}`
      );

      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.log("Message fetch error:", err);
    }
  };

  useEffect(() => {
    if (fromUserId && toUserId) loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [fromUserId, toUserId]);

  // ===================== SEND MESSAGE =====================
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages`,
        {
          fromUserId,
          toUserId,
          body: input,
        }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.data]);
      }
    } catch (err) {
      console.log("Sending error:", err);
    }

    setInput("");
  };

  return (
    <div className="h-[88svh] bg-black flex flex-col text-white">

      {/* HEADER */}
      <div className="px-4 pb-2 border-b border-neutral-800 flex items-center gap-3 bg-neutral-950">
        <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Chat Assistant</h1>
          <p className="text-xs text-neutral-400">Online</p>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-neutral-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.fromUserId == fromUserId ? "justify-end" : "justify-start"
            }`}
          >
            {msg.fromUserId != fromUserId && (
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                <Bot className="h-5 w-5" />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.fromUserId == fromUserId
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-neutral-800 text-neutral-200 rounded-bl-none"
              }`}
            >
              {msg.body}
              <div className="text-[10px] text-neutral-400 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {msg.fromUserId == fromUserId && (
              <div className="h-10 w-10 rounded-full bg-violet-600 flex items-center justify-center ml-2">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* INPUT BOX */}
      <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center gap-2">
        <input
          className="flex-1 bg-neutral-800 text-sm text-white px-4 py-2 rounded-full border border-neutral-700 focus:border-indigo-500 outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;
