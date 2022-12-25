import { NextPage } from "next";
import React, { useState } from "react";

const ChatPage: NextPage = () => {
  const [data, setData] = useState({
    index: -1
  })

  const chatJobData = [
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
  ];
  return (
    <div className="w-full h-[80vh] md:h-full flex flex-col md:flex md:flex-row rounded overflow-hidden shadow">
      {/* Chat channel part  */}
      <div className="flex flex-col w-full h-full md:w-4/12">
        <div className="w-full h-14 p-5 border-b flex justify-center items-center bg-sky-500">
          <p className="font-bold flex justify-center text-white">Chat</p>
        </div>

        <div className="flex-1 relative">
          <div className="overflow-auto absolute top-0 bottom-0 left-0 right-0">
            {chatJobData.map((chat, i) => (
              <div className={`${data.index === i ? "bg-white" : "bg-gray-100"} p-5 hover:bg-white cursor-pointer`}
                onClick={() => setData({ ...data, index: i })}
              >
                <p className="font-bold">{chat.title}</p>
                <p className="text-gray-500 font-light">{chat.username}</p>
                <p>{chat.recentMsg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chat Message Content  */}
      <div className="w-8/12 md:flex flex-col justify-between bg-white border-l border-gray-200 hidden">
        {/* Chat title */}
        <div className="w-full h-14 p-5 border-b flex justify-between items-center">
          <p>Title</p>
          <button className="bg-green-500 p-2 rounded-lg text-white">
            detail
          </button>
        </div>
        {/* Chat content */}
        <div className="flex-1 bg-white"></div>
        {/* Chat message */}
        <div className="flex border-t">
          <input
            className="w-full px-2 focus:outline-none"
            type="text"
          />
          <button className="p-2 bg-sky-500 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
