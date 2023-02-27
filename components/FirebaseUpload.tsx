import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig.js";

function FirebaseUpload() {
  const [file, setFile] = useState<File>();
  const [percent, setPercent] = useState(0);

  // Handles input change event and updates state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      await file.arrayBuffer()
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  }

  return (
    <div>
      <input type="file" onChange={handleChange} accept="" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>
        {percent} {"% done"}
      </p>
    </div>
  );
}

export default FirebaseUpload;
