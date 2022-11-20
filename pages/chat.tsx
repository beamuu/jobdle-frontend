import { NextPage } from "next";
import React from "react";

const ChatPage: NextPage = () => {
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
        <div className="w-full h-20 p-5 border-b flex justify-center items-center bg-sky-500">
          <p className="font-bold flex justify-center text-white">Chat</p>
        </div>

        <div className="flex-1 relative">
          <div className="overflow-auto absolute top-0 bottom-0 left-0 right-0">
            {chatJobData.map((data) => (
              <div className="p-5 bg-gray-100 hover:bg-white cursor-pointer">
                <p className="font-bold">{data.title}</p>
                <p className="text-gray-500 font-light">{data.username}</p>
                <p>{data.recentMsg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chat Message Content  */}
      <div className="w-8/12 md:flex flex-col justify-between bg-white border-l border-gray-200 hidden">
        {/* Chat title */}
        <div className="w-full h-20 p-5 border-b flex justify-between items-center">
          <p>Title</p>
          <button className="bg-green-500 p-2 rounded-lg text-white">
            detail
          </button>
        </div>
        {/* Chat content */}
        <div className="flex-1 bg-white"></div>
        {/* Chat message */}
        <div className="flex p-5 border-t">
          <input
            className="w-full border px-2 rounded-l-md focus:outline-none"
            type="text"
          />
          <button className="p-2 bg-sky-500 text-white rounded-r-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
