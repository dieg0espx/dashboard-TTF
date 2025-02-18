import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import googleBtn from '../images/googleBtn.png'

const UploadToDrive = () => {
  const { accessToken, setAccessToken } = useAuth(); // Use context
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("✅ Login Success! Token:", tokenResponse.access_token);
      setAccessToken(tokenResponse.access_token); // Store in context
    },
    onError: (error) => console.log("❌ Login Failed:", error),
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "implicit", // Popup flow
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!accessToken) {
      alert("❌ Please log in first!");
      return;
    }
    if (!file) {
      alert("❌ Please select a file!");
      return;
    }

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    try {
      // 1) Upload file
      const uploadResponse = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      const uploadResult = await uploadResponse.json();
      console.log("✅ File Uploaded:", uploadResult);
      setFileId(uploadResult.id);

      // 2) Make file public
      await fetch(`https://www.googleapis.com/drive/v3/files/${uploadResult.id}/permissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      });

      // Generate Public URL
      const publicUrl = `https://drive.google.com/uc?id=${uploadResult.id}`;
      setFileUrl(publicUrl);

      alert("✅ File uploaded successfully and made public!");
    } catch (error) {
      console.error("❌ Upload Error:", error);
    }
  };

  return (
    <div>
      {!accessToken ? ( // ✅ Proper conditional check
        <div className="w-[100%] h-[calc(100vh-90px)] flex items-center justify-center">
            <div className="border border-gray-600 px-[50px] py-[100px] rounded-lg flex items-center justify-center gap-[80px] -mt-[150px]"> 
                <p className="max-w-[400px] text-left"> <b>🏗️ Welcome to TTF Scaffolding!</b> <br></br>AI-Takeoff is designed to optimize your workflow—sign in to leverage cutting-edge tools for accurate planning and faster execution.</p>
                <img src={googleBtn} className="w-[200px]" onClick={login}/>
            </div>
        </div>
      ) : (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload to Drive</button>

          {fileId && (
            <p>
              ✅ File Uploaded!  
              <br />
              📂 <strong>File ID:</strong> {fileId}  
              <br />
              🔗 <strong>Public Link:</strong>{" "}
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                Open File
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadToDrive;
