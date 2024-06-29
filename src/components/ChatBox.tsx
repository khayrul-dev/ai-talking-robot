import React, { Dispatch, FormEvent, SetStateAction, useCallback } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Content } from "@google/generative-ai";

interface ChatBoxInterface {
  handleSubmit: (e: FormEvent) => Promise<void>;
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
  threads: Content[];
}

const ChatBox = ({ handleSubmit, setMsg, msg, threads }: ChatBoxInterface) => {
  return (
    <div className="md:w-2/3 lg:w-2/4 xl:w-2/5 bg-white shadow rounded-md overflow-hidden">
      <div className="p-4 bg-indigo-500">
        <h2 className="text-center text-xl font-semibold text-white">
          Chat Robot
        </h2>
      </div>
      <div className="h-96 p-4 scrollbar-thin flex flex-col-reverse scrollbar-thumb-gray-200 overflow-y-scroll">
        <div className="flex flex-col gap-3">
          {threads.map((thread, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 ${
                thread.role === "user" ? "ms-auto" : ""
              }`}
            >
              {thread.parts.map((msg, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`py-2 px-3  rounded-md ${
                    thread.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t px-4 py-2">
        <form className="flex align-middle" onSubmit={handleSubmit}>
          <textarea
            id="user-message"
            placeholder="Type your message"
            name="user-message"
            value={msg}
            onChange={useCallback((e: any) => setMsg(e.target.value), [])}
            className="h-16 resize-none ring-0 focus-visible:outline-none w-full text-sm scrollbar-thin scrollbar-thumb-gray-200 overflow-y-scroll"
          ></textarea>
          <button>
            <PaperAirplaneIcon className="w-5 text-indigo-600" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
