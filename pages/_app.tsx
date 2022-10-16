import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  notLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.notLayout) {
    return <Component {...pageProps} />;
  }
  return (
    <div className="flex flex-col md:flex md:flex-row bg-gray-100 min-h-screen min-w-screen">
      <Sidebar />
      <div className="flex-1 p-5">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
