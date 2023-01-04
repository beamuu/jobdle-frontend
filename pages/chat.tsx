import axios from "axios";
import { NextPage } from "next";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import io, { Socket } from "socket.io-client";
import { useUser } from "../contexts/User";

const ChatPage: NextPage = () => {
  const [data, setData] = useState({
    index: -1,
  });
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [roomId, setRoomId] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const refMessages = useRef<any[]>([]);
  const { userData } = useUser();

  const handleSendedMsg = (e: FormEvent) => {
    e.preventDefault();
    // console.log('msg', message)
    // socket.emit("post", { post: message })
  };

  const getRoom = async (token: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatroom`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("getRoom", res);
    return res.data;
  };

  useEffect(() => {
    const init = async () => {
      var chatRoomData = await getRoom(cookies.token);
      // if (userData) return;

      if (chatRoomData) {
        console.log("chatRoomData", chatRoomData);
        setMessageList(chatRoomData.messages);
        setRoomId(chatRoomData._id);
        refMessages.current = messageList;
      }
      console.log("MessageList", messageList);
    };
    init();
  }, [roomId]);

  useEffect(() => {
    refMessages.current = messageList;
    console.log("ref changed to", refMessages.current);
    // setChkMessage(true)
  }, [messageList]);

  useEffect(() => {
    // getRoom(cookies.token);
    if (socket === null) {
      setSocket(
        io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
          secure: true,
          transports: ["flashsocket", "polling", "websocket"],
        })
      );
    } else {
      socket.on("connect", () => {
        console.log("SOCKET is already connected");
      });

      socket.on("message", (data: any) => {
        console.log("socket.on - message", data);
        let newMessageLists = [...refMessages.current, data.content];
        setMessageList(newMessageLists);
        // let currentMessageList = [...messageList];
        // currentMessageList.push(data.content);
        // setMessageList([...refMessages.current, data.content]);
        // setChk(!chk);
        // setChkReRenderSidebar(true);
        // setChkMessage(true);
      });
    }
  }, [socket]);

  console.log("messageList", messageList);

  useEffect(() => {
    // console.log(roomId)
    if (roomId && socket !== null) {
      socket.emit("joinroom", roomId);
    }
  }, [roomId]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log("sendMessage");
    if (socket !== null && userData) {
      if (message === "") return;
      let messageContent = {
        roomId: roomId,
        content: {
          // sender: userData.username,
          senderID: userData._id,
          content_type: "Text",
          content: message,
          timeStamp: new Date(),
        },
      };
      // console.log(socket.connected)
      socket.emit("message", messageContent);
      // setChkMessage(true)
      // setMessageList([...messageList, messageContent.content]);
      setMessage("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };

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
    {
      title: "Title",
      username: "Napasin Saengthong",
      recentMsg: "Hello!",
    },
  ];
  return (
    <div className="w-full h-[90vh] max-h-[90vh] md:h-full flex flex-col md:flex md:flex-row rounded overflow-hidden shadow">
      {/* Chat channel part  */}
      <div className="flex flex-col w-full h-full md:w-4/12">
        <div className="w-full h-14 p-5 border-b flex justify-center items-center bg-sky-500">
          <p className="font-bold flex justify-center text-white">Chat</p>
        </div>

        <div className="flex-1 relative">
          <div className="overflow-auto absolute top-0 bottom-0 left-0 right-0">
            {chatJobData.map((chat, i) => (
              <div
                className={`${
                  data.index === i ? "bg-white" : "bg-gray-100"
                } p-5 hover:bg-white cursor-pointer`}
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
        <div className="w-full h-14 py-5 pl-5 pr-3 border-b flex justify-between items-center relative">
          <p>Title</p>
          <button className="bg-green-500 p-2 rounded-lg text-white">
            detail
          </button>
        </div>
        {/* Chat content */}

        <div
          id="messages"
          className="space-y-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messageList.map((message) => {
            return (
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-sky-600 text-white">
                      {message.content}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <div className="chat-message">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  hi
                </span>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-sky-600 text-white ">
                    Your error message says permission denied, npm global
                    installs must be given root privileges.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    Command was run with root privileges. I'm sure about that.
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    I've update the description so it's more obviously now
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    FYI https://askubuntu.com/a/700266/510172
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Check the line above (it ends with a # so, I'm running it as
                    root )<pre># npm install -g @vue/devtools</pre>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    Any updates on this issue? I'm getting the same error when
                    trying to install devtools. Thanks
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Thanks for your message David. I thought I'm alone with this
                    issue. Please, ? the issue to support it :)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">
                    Are you using sudo?
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    Run this command sudo chown -R `whoami` /Users/.npm-global/
                    then install the package globally without using sudo
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    It seems like you are from Mac OS world. There is no /Users/
                    folder on linux ?
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    I have no issue with any other packages installed with root
                    permission globally.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    yes, I have a mac. I never had issues with root permission
                    as well, but this helped me to solve the problem
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    I get the same error on Arch Linux (also with sudo)
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    I also have this issue, Here is what I was doing until now:
                    #1076
                  </span>
                </div>
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    even i am facing
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* Chat input message */}
        <div className="flex border-t">
          <form onSubmit={sendMessage} className="flex w-full">
            <input
              className="flex-1 focus:outline-none px-2"
              type="text"
              onChange={handleChange}
              value={message}
              name="message"
            />
            <button className="p-2 bg-sky-500 text-white" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
