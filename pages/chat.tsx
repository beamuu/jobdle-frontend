import axios from "axios";
import { NextPage } from "next";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import io, { Socket } from "socket.io-client";
import { useUser } from "../contexts/User";
import { getUserJobs } from "../services/JobServices";
import { dateFormat } from "../services/UtilsServies";

const ChatPage: NextPage = () => {
  const [messageList, setMessageList] = useState<any[]>([]);
  const [roomId, setRoomId] = useState(undefined);
  const [cookies] = useCookies(["token"]);
  const refMessages = useRef<any[]>([]);
  const { userData } = useUser();

  const [chatRooms, setChatRooms] = useState<any[]>([]);
  // const [userData, setUserData] = useState<User>();
  const [senderId, setSenderId] = useState();
  const [roomName, setRoomName] = useState();
  const [data, setData] = useState({
    index: -1,
  });
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userJobsArray, setUserJobsArray] = useState([]);

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
    var chatRoomsObjectArray = await getRoom(cookies.token);
    var userData = await getUserData();
    // setUserData(user);
    setSenderId(userData._id);

    console.log(userData.role);

    if (chatRoomsObjectArray.length == 0) return;

    if (userData !== undefined && chatRoomsObjectArray !== undefined) {
      if (userData.role === "user") {
        // USER CHAT
        console.log("ROLE:User");
        console.log("chatRoomsObjectArray", chatRoomsObjectArray);
        setMessageList(chatRoomsObjectArray.messages);
        setRoomId(chatRoomsObjectArray._id);
        refMessages.current = messageList;
      } else if (userData.role === "admin") {
        // ADMIN CHAT
        console.log("ROLE:Admin");
        console.log("chatRoomsObjectArray", chatRoomsObjectArray);
        setChatRooms(chatRoomsObjectArray);
        console.log("FIRST ROOM ID", roomId);
        if (roomId === undefined) {
          console.log("NOT HAVE ROOM ID");
          setRoomId(chatRoomsObjectArray[0]._id);
          setMessageList(chatRoomsObjectArray[0].messages);
          setRoomName(chatRoomsObjectArray[0].nameOfUser);
        } else {
          console.log("HAVE ROOM ID");
          let selected = chatRoomsObjectArray.filter(
            (room: any) => room._id === roomId
          );
          console.log("selected room", selected);
          console.log("selected messages", selected[0].messages);
          setMessageList(selected[0].messages);
        }
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await getUserJobs(cookies.token);
      setUserJobsArray(data.docs);
      console.log("data", data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      if (document.getElementById("messages")) {
        var msgContainer: any = document.getElementById("messages");
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
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

  if (!userData) return null;
  if (!userJobsArray) return null;

  return (
    <div className="w-full h-[90vh] max-h-[90vh] md:h-full flex flex-col md:flex md:flex-row rounded overflow-hidden shadow">
      {/* Chat channel part  */}
      <div className="flex flex-col w-full h-full md:w-3/12">
        <div className="w-full h-14 p-5 border-b flex justify-center items-center bg-sky-500">
          <p className="font-bold flex justify-center text-white">
            {userData.role === "admin" ? "Chat" : "Your jobs"}
          </p>
        </div>

        <div className="flex-1 relative">
          <div className="overflow-auto absolute top-0 bottom-0 left-0 right-0">
            {userData.role === "admin"
              ? chatRooms.map((room, i) => {
                  return (
                    <div
                      className={`${
                        data.index === i ? "bg-white" : "bg-gray-100"
                      } p-5 hover:bg-white cursor-pointer`}
                      onClick={() => {
                        setData({ ...data, index: i });
                        setRoomId(room._id);
                        setRoomName(room.nameOfUser);
                      }}
                    >
                      <p className="font-bold">{room.nameOfUser}</p>
                      {/* <p className="text-gray-500 font-light">{chat.username}</p> */}
                      {/* <p>{room.messages[0].content}</p> */}
                    </div>
                  );
                })
              : userJobsArray.map((job: Job) => (
                  <div className="bg-white rounded-md px-3 py-2 cursor-pointer hover:shadow-lg m-1">
                    <div id="job-header" className="text-lg">
                      <span>{job.title}</span>
                    </div>
                    <hr />
                    <div id="p-5" className="px-5 py-3">
                      <div>
                        <span className="text-gray-400">Category: </span>
                        <span>{job.category.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">min-Wage: </span>
                        <span>{job.category.minWage}</span>
                      </div>
                    </div>
                    <div
                      id="job-footer"
                      className="flex justify-between items-center pt-2"
                    >
                      <div className="text-sm">
                        <span className="text-gray-400">Deadline: </span>
                        <span>{dateFormat(new Date(job.deadline))}</span>
                      </div>
                      <span
                        className={`${
                          job.status === "new"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } px-5 rounded-full text-white`}
                      >
                        <span className="uppercase">{job.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/* Chat Message Content  */}
      <div className="w-9/12 md:flex flex-col justify-between bg-white border-l border-gray-200 hidden">
        {/* Chat title */}
        <div className="w-full h-14 py-5 pl-5 pr-3 border-b flex justify-between items-center relative">
          <p>{userData.role === "admin" ? roomName : "Admin"}</p>
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
                    } flex flex-col rounded-lg space-y-2 mx-2 overflow-x-hidden max-w-xs`}
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
