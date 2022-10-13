import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col md:flex md:flex-row bg-gray-100 min-h-screen min-w-screen">
      <Sidebar />
      <Component {...pageProps}/>
    </div>
  );
}

export default MyApp;
