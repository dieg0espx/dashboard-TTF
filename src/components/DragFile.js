import React, { useState, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";

const DragFile = ({ onResponse }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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
  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      setFiles(Array.from(e.target.files));
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadFiles = async () => {
    if (!files.length) return alert("Please select a PDF first.");
    const formData = new FormData();
    formData.append("file", files[0]);
    setUploading(true);

    try {
      // const response = await axios.post("https://your-server.com/process-pdf/", formData);
      const response = await axios.post("http://127.0.0.1:8000/process-pdf/", formData);
      response.data.success ? onResponse(response.data.results) : alert(response.data.error);
    } catch (error) {
      alert("Upload failed.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`w-[80%] mx-auto mt-[50px]  flex items-center justify-center border rounded-xl p-8 text-center cursor-pointer ${
        isDragging ? "border-primary" : "border-gray-700"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept="application/pdf"
      />
      <div className="file-drop-content flex flex-col items-center gap-4">
       
      {files.length > 0 && (
        <>
          <div style={{ width: "800px", height: "500px", overflow: "auto", scrollbarWidth: "none"}}>
            <embed
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              style={{ width: "800px", height: "500px", border: "none" }}
            />
          </div>
        </>
      )}

        {!files.length && (
          <div className="py-[100px] flex flex-col gap-[20px]">
            <i className="bi bi-folder-plus text-gray-400 text-[40px]"></i>
            <p className="text-gray-600">Drag and drop your file here</p>
            <p className="text-gray-600">or</p>
            <button className="text-primary" onClick={handleChooseFile}>
              Choose File
            </button>
          </div>
        )}

        {files.length > 0 && (
          <>

   
            <div className="w-[120%] -mb-[30px] mt-[50px] rounded-b-xl bg-darkGray py-[10px] px-[10px] flex flex-row justify-between items-center">
              <ul className="text-gray-700">
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
              
              <button
                className="text-gray-600"
                onClick={uploadFiles}
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-[10px]">
                   <Loading />Uploading ...
                  </div>
                ) : (
                  <div className="text-gray-600 hover:text-primary">
                    Upload & Process <i className="bi bi-arrow-right-circle ml-[10px]"></i>
                  </div>
                )}
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DragFile;
