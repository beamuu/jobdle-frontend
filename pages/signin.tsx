import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      "https://www.melivecode.com/api/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
  };
  return (
    <>
      <div>Sign in</div>
      <form onSubmit={handleSignin}>
        <label>Email</label>
        <input
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <br />
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          type="submit"
          className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium"
        >
          Sign In
        </button>
      </form>
    </>
  );
}

export default SignIn;
