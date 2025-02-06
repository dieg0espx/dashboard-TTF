import React, { useState, useRef } from "react";
import axios from "axios";

const DragFile = ({ onResponse }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null); // AI response
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChooseFile = () => fileInputRef.current.click();
  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const uploadFiles = async () => {
    if (!files.length) return alert("Please select a PDF file first.");
    const formData = new FormData();
    formData.append("file", files[0]);

    setUploading(true);
    setAiResponse(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/process-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        onResponse(response.data.results)
      } else {
        alert("Error processing PDF: " + response.data.error);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to analyze the blueprint.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`w-[80%] mx-auto mt-[50px] h-[400px] flex items-center justify-center border rounded-xl p-8 text-center cursor-pointer transition-border-color duration-300 shadow-sm ${
        isDragging ? "border-primary" : "border-gray-700"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="application/pdf" />
      <div className="file-drop-content flex flex-col items-center gap-4">
        <p className="text-gray-600">Drag and drop a PDF file here</p>
        <p className="text-gray-600">or</p>
        <button className="bg-primary text-white py-2 px-4 rounded-md" onClick={handleChooseFile}>
          Choose File
        </button>

        {files.length > 0 && (
          <ul className="mt-2 text-gray-700">{files.map((file) => <li key={file.name}>{file.name}</li>)}</ul>
        )}

        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={uploadFiles} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload & Process"}
        </button>

        {/* Display AI Response
        {aiResponse && (
          <div className="mt-6 p-4 border bg-gray-100 w-full text-left">
            <h3 className="text-lg font-bold">PDF Processing Results:</h3>
            {aiResponse.map((res) => (
              <div key={res.page} className="border p-2 mt-2">
                <p><strong>📄 Page {res.page}:</strong></p>
                <p><strong>📝 Extracted Text:</strong> {res.text || "No text found"}</p>
                <p><strong>🔲 Detected Shapes:</strong> {res.shape_count}</p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DragFile;
