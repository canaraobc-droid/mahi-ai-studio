"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch(
        "http://192.168.31.169:3000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setReply(data.reply);
    } catch (error) {
      console.error(error);
      setReply("❌ Chat request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col">

        {/* Header */}
        <header className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
              ✨
            </div>

            <div>
              <h1 className="text-lg font-bold">
                MahiAI Studio
              </h1>

              <p className="text-xs text-gray-400">
                AI Creative Studio
              </p>
            </div>

            <div className="ml-auto rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs text-green-400">
              ● AI Online
            </div>

          </div>
        </header>

        {/* Chat area */}
        <section className="flex flex-1 flex-col px-4 py-6">

          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-4xl">
              🤖
            </div>

            <h2 className="text-2xl font-bold">
              Welcome to MahiAI
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-400">
              Chat, create ideas, write content and get AI assistance
              with MahiAI Studio.
            </p>

            <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">

              <button
                onClick={() =>
                  setMessage("Mere liye ek YouTube video idea banao")
                }
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                💡

                <div className="mt-2 text-sm font-semibold">
                  Ideas
                </div>

                <div className="mt-1 text-xs text-gray-400">
                  Creative ideas
                </div>
              </button>

              <button
                onClick={() =>
                  setMessage("Ek YouTube description likho")
                }
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                ✍️

                <div className="mt-2 text-sm font-semibold">
                  Writing
                </div>

                <div className="mt-1 text-xs text-gray-400">
                  Write content
                </div>
              </button>

              <button
                onClick={() =>
                  setMessage("Mujhe ek naya creative idea do")
                }
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                🚀

                <div className="mt-2 text-sm font-semibold">
                  Create
                </div>

                <div className="mt-1 text-xs text-gray-400">
                  Create something
                </div>
              </button>

            </div>
          </div>

          {/* AI Reply */}
          {reply && (
            <div className="mx-auto mb-4 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-gray-200">

              <div className="mb-2 text-xs font-semibold text-purple-400">
                MahiAI
              </div>

              {reply}

            </div>
          )}

          {/* Input */}
          <div className="mx-auto mt-6 w-full max-w-3xl">

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="MahiAI se kuch bhi poochho..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-gray-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Send"}
              </button>

            </div>

            <p className="mt-3 text-center text-xs text-gray-500">
              MahiAI Studio • AI Chat
            </p>

          </div>

        </section>
      </div>
    </main>
  );
}