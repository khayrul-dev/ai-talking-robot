"use client";

import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import React, { FormEvent, useState } from "react";
import ChatBox from "./ChatBox";

export interface History {
  role: string;
  parts: {
    text: string;
  }[];
}

const Robot = () => {
  const [threads, setThreads] = useState<Content[]>([]);
  const [msg, setMsg] = useState("");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (msg === "") return;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const userMsg: Content = {
      role: "user",
      parts: [{ text: msg }],
    };
    setThreads([...threads, userMsg]);
    setMsg("");
    const result = await chat.sendMessageStream(msg);
    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
    }
    const answerContent = { role: "model", parts: [{ text: text }] };
    setThreads([...threads, userMsg, answerContent]);
  };

  return (
    <div>
      <ChatBox
        threads={threads}
        handleSubmit={handleSubmit}
        msg={msg}
        setMsg={setMsg}
      />
    </div>
  );
};

export default Robot;
