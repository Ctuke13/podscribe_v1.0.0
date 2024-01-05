import { Alert, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";

export default function Upload() {
  const { userId } = useAuth();
  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState("");

  const audioListRef = ref(storage, "audio/");

  const upload = () => {
    if (fileUpload == null) return;
    if (!fileUpload.type.startsWith("audio/")) {
      setError("Please upload only audio files.");
      return;
    }
    const uploadRef = ref(storage, `audio/${userId}/${fileUpload.name + v4()}`);
    uploadBytes(uploadRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, url]);
      });
    });
    setError("");
  };

  const deleteFile = (fileRef) => {
    deleteObject(fileRef)
      .then(() => {
        setFileList(fileList.filter((file) => file.ref !== fileRef));
      })
      .catch((error) => {
        console.error("Error removing file: ", error);
      });
  };

  useEffect(() => {
    if (userId) {
      const userAudioListRef = ref(storage, `audio/${userId}`);
      listAll(userAudioListRef).then((res) => {
        Promise.all(res.items.map((item) => getDownloadURL(item))).then(
          (urls) => {
            setFileList(urls);
          }
        );
      });
    }
  }, [userId]);

  return (
    <div className="Upload">
      {error && <Alert severity="error">{error}</Alert>}
      <input
        type="file"
        onChange={(e) => {
          setFileUpload(e.target.files[0]);
        }}
      />
      <button onClick={upload}>Upload</button>{" "}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {fileList.map((file, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <audio controls src={file.url} style={{ width: "100%" }} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteFile(file.ref)}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
