import React, { useState, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import googleBtn from "../images/googleBtn.png";
import Loading from "./Loading";

const FileUploader = ({ onResponse }) => {
  const { accessToken, setAccessToken } = useAuth(); // Google Auth Context
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileId, setFileId] = useState(null); // Store Google Drive File ID
  const fileInputRef = useRef(null);

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("✅ Login Success! Token:", tokenResponse.access_token);
      setAccessToken(tokenResponse.access_token); // Store in context
    },
    onError: (error) => console.log("❌ Login Failed:", error),
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "implicit",
  });

  // Handle File Selection
  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setFileUrl(URL.createObjectURL(selectedFiles[0]));
    }
  };

  // Drag and Drop Handlers
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
      setFileUrl(URL.createObjectURL(droppedFiles[0]));
    }
  };

  const handleChooseFile = () => fileInputRef.current.click();

  // Upload File to Google Drive
  const uploadFileToDrive = async () => {
    if (!accessToken) {
      alert("❌ Please log in first!");
      return;
    }
    if (!files.length) {
      alert("❌ Please select a file first!");
      return;
    }

    setUploading(true);
    const file = files[0];
    const metadata = { name: file.name, mimeType: file.type };
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    try {
      // Step 1: Upload file to Google Drive
      const uploadResponse = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: form,
        }
      );

      const uploadResult = await uploadResponse.json();
      console.log("✅ File Uploaded:", uploadResult);
      setFileId(uploadResult.id);

      // Step 2: Make file public
      await fetch(`https://www.googleapis.com/drive/v3/files/${uploadResult.id}/permissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "reader", type: "anyone" }),
      });

      alert("✅ File uploaded successfully! Now calling the server...");

      // Step 3: Call server to process the file
      const serverResponse = await axios.post("http://127.0.0.1:8000/process-pdf/", {
        file_id: uploadResult.id,
      });

      if (serverResponse.data.success) {
        onResponse(serverResponse.data.results);
      } else {
        alert(serverResponse.data.error);
      }
    } catch (error) {
      console.error("❌ Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`w-[80%] max-w-[970px] mx-auto mt-[50px] flex items-center justify-center rounded-xl p-8 text-center cursor-pointer border-gray-700 ${!accessToken ? '' : 'border'}`}
      onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
      onDragOver={handleDragOver} onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept="application/pdf"
      />

      {!accessToken ? (
        <div className="w-[100%] h-[calc(100vh-90px)] flex items-center justify-center">
          <div className="border border-gray-600 px-[50px] py-[100px] rounded-lg flex items-center justify-center gap-[80px] -mt-[250px]">
            <p className="max-w-[400px] text-left">
              <b>🏗️ Welcome to TTF Scaffolding!</b> <br />
              AI-Takeoff is designed to optimize your workflow—sign in to leverage cutting-edge tools for accurate planning and faster execution.
            </p>
            <img src={googleBtn} className="w-[200px] cursor-pointer" onClick={login} />
          </div>
        </div>
      ) : (
        <div className="file-drop-content flex flex-col items-center gap-4">
          {files.length > 0 && (
            <div style={{ width: "800px", height: "500px", overflow: "auto", scrollbarWidth: "none"}}>
              <embed src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                type="application/pdf" style={{ width: "800px", height: "500px", border: "none" }} />
            </div>
          )}

          {!files.length && (
            <div className="py-[100px] flex flex-col gap-[20px] px-[300px] rounded-lg">
              <i className="bi bi-folder-plus text-gray-400 text-[40px]"></i>
              <p className="text-gray-600">Drag and drop your file here</p>
              <p className="text-gray-600">or</p>
              <button className="text-primary" onClick={handleChooseFile}>Choose File</button>
            </div>
          )}

          {files.length > 0 && (
            <div className="w-[120%] -mb-[30px] mt-[50px] rounded-b-xl bg-darkGray py-[10px] px-[10px] flex flex-row justify-between items-center ">
              <ul className="text-gray-700">
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
              
              <button className="text-gray-600" onClick={uploadFileToDrive} disabled={uploading}>
                {uploading ? (
                  <div className="flex items-center gap-[10px]">
                    <Loading /> Uploading ...
                  </div>
                ) : (
                  <div className="text-gray-600 hover:text-primary">
                    Upload & Process <i className="bi bi-arrow-right-circle ml-[10px]"></i>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
