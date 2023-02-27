import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FirebaseUpload from "../components/FirebaseUpload";

const aPage = () => {
  return (
    <FirebaseUpload />
  )
}

aPage.noLayout = true;
export default aPage;
