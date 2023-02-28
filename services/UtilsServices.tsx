import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig.js";

export const headersParams = (token: string | string[] | undefined) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const dateFormat = (today: Date) => {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let currentDate = `${dd}/${mm}/${yyyy}`;
  return currentDate;
};

export const splitTFromISO = (dateString: string) => {
  console.log("dateString", dateString);
  const dateSplitT = dateString.split("T")[0];
  console.log("dateSplitT", dateSplitT);
  return dateSplitT;
};

export const handleUpload = async (file: File) => {
  // if (!file) {
  //   alert("Please choose a file first!");
  //   return;
  // }
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, await file.arrayBuffer());

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // update progress
      // setPercent(percent);
    },
    (err) => console.log("err", err),
    async () => {
      // download url
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("url", url);
      return url;
    }
  );
};
