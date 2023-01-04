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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [roomId, setRoomId] = useState(undefined);
  const [cookies, setCookie] = useCookies(["token"]);
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const refMessages = useRef<any[]>([]);
  const [userData, setUserData] = useState<User>();
  const [senderId, setSenderId] = useState();
  // const { userData } = useUser();

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
    // console.log("getRoom", res);
    return res.data;
  };

  const getFullName = async (token: string, user_id: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/fullname/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("getFullName", res.data);
    return res.data;
  };

  const getUserData = async () => {
    try {
      // console.log("fetch userData");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("getUserData", res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const init = async () => {
    var chatRoomData = await getRoom(cookies.token);
    var user = await getUserData();
    setUserData(user);
    setSenderId(user._id);

    if (user && chatRoomData) {
      console.log("user role", user.role);
      if (user.role === "user") {
        console.log("User");
        console.log("chatRoomData", chatRoomData);
        setMessageList(chatRoomData.messages);
        setRoomId(chatRoomData._id);
        refMessages.current = messageList;
      } else if (user.role === "admin") {
        console.log("Admin");
        console.log("chatRoomData", chatRoomData);
        setChatRooms(chatRoomData);
        console.log("FIRST ROOM ID", roomId);
        if (roomId === undefined) {
          console.log("NOT HAVE ROOM ID");
          // setRoomId(chatRoomData[0]._id);
          setMessageList(chatRoomData[0].messages);
        } else {
          console.log("HAVE ROOM ID");
          let selected = chatRoomData.filter(
            (room: any) => room._id === roomId
          );
          console.log("selected room", selected);
          console.log("selected messages", selected[0].messages);
          setMessageList(selected[0].messages);
        }
      }
    }
  };
  console.log("MessageList", messageList);

  useEffect(() => {
    init();
  }, [roomId]);

  useEffect(() => {
    refMessages.current = messageList;
    // console.log("ref changed to", refMessages.current);
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
      // console.log("messageList", messageList);
    }
  }, [socket]);

  useEffect(() => {
    console.log("ROOMID:", roomId);
    if (roomId && socket !== null) {
      socket.emit("joinroom", roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (messageList) {
      var msgContainer: any = document.getElementById("messages");
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log("sendMessage");
    if (socket !== null && userData) {
      if (message === "") return;
      let messageContent = {
        roomId: roomId,
        content: {
          // sender: userData.username,
          senderId: senderId,
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

  // if (!userData) return null;

  return (
    <div className="w-full h-[90vh] max-h-[90vh] md:h-full flex flex-col md:flex md:flex-row rounded overflow-hidden shadow">
      {/* Chat channel part  */}
      <div className="flex flex-col w-full h-full md:w-3/12">
        <div className="w-full h-14 p-5 border-b flex justify-center items-center bg-sky-500">
          <p className="font-bold flex justify-center text-white">Chat</p>
        </div>

        <div className="flex-1 relative">
          <div className="overflow-auto absolute top-0 bottom-0 left-0 right-0">
            {chatRooms.map((room, i) => {
              return (
                <div
                  className={`${
                    data.index === i ? "bg-white" : "bg-gray-100"
                  } p-5 hover:bg-white cursor-pointer`}
                  onClick={() => {
                    setData({ ...data, index: i });
                    setRoomId(room._id);
                  }}
                >
                  <p className="font-bold">{room._id}</p>
                  {/* <p className="text-gray-500 font-light">{chat.username}</p> */}
                  {/* <p>{room.messages[0].content}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Chat Message Content  */}
      <div className="w-9/12 md:flex flex-col justify-between bg-white border-l border-gray-200 hidden">
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
          className="space-y-2 p-3 overflow-y-auto flex-1 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          style={{}}
        >
          {messageList.map((message) => {
            // console.log(
            //   "userData._id, senderId",
            //   userData?._id,
            //   message.senderId
            // );
            // console.log("result", userData?._id === message.senderId);
            return (
              <div className="chat-message">
                <div
                  className={`${
                    userData?._id === message.senderId
                      ? "items-end justify-end"
                      : ""
                  } flex`}
                >
                  <div
                    className={`${
                      userData?._id === message.senderId
                        ? "items-end order-1"
                        : "items-start order-2"
                    } flex flex-col rounded-lg space-y-2 mx-2 overflow-x-hidden max-w-[80%]`}
                  >
                    <span
                      className={`${
                        userData?._id === message.senderId
                          ? "bg-sky-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      } px-4 py-2 rounded-lg inline-block`}
                    >
                      {message.content}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
