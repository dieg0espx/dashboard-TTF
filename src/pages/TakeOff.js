import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DragFile from '../components/DragFile';
import axios from 'axios';
import { AIFormattedText } from '../components/AIFormattedText';
import Loading from '../components/Loading';
import UploadToDrive from '../components/UploadToDrive';
import FileUploader from '../components/FileUploader';

function TakeOff() {
    const [serverResponse, setServerResponse] = useState({});
    const [textResponse, setTextResponse] = useState(""); // Store AI formatted text
    const [loading, setLoading] = useState(false); // Loading state for AI response

    // Handle file upload response
    const handleResponse = (res) => {
        if (res.length > 0) {
            setServerResponse(res[0]);
            console.log(res[0]);

            // Send the extracted text to AI formatter
            sendTextToFormatter(res[0].text);
        }
    };

    // Send scanned text to AI formatter API
    const sendTextToFormatter = async (scannedText) => {
        if (!scannedText) return; // Ensure there's text to send

        setLoading(true);
        try {
            const response = await axios.post('https://open-ai-ttf.vercel.app/formatScannedPDF', { scannedText });
            setTextResponse(response.data); // Store AI formatted text
        } catch (error) {
            console.error("Error sending text to AI formatter:", error);
            setTextResponse("Failed to format the extracted text.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='wrapper-orders'>
            <Sidebar/>
            <div className='content'>
                <div className='header'>
                    <h1> TakeOff </h1>
                </div>
                <div className={`${serverResponse?.file_name ? 'grid grid-cols-[70%_30%]' : 'block'} border-t border-gray-700 mt-[20px] h-[calc(100vh-90px)]`}>
                  <div className='flex items-center justify-center'>
                    {serverResponse?.processed_image_url ? (  
                      <img 
                          src={serverResponse.processed_image_url} 
                          alt="Processed PDF" 
                          className='w-[95%] rounded-lg'
                          style={{
                              mixBlendMode: 'color', 
                             filter: 'opacity(1) invert(1)'
                          }}
                      />
                    ) : (
                        <FileUploader onResponse={handleResponse}/>
                    )}
                  </div>
                  {serverResponse?.file_name && (
                    <div className='border-l border-gray-700 h-[calc(100vh-90px)] overflow-y-scroll'>
                        <div className='border-b border-gray-700 p-4'>
                            <p className='text-left'><b>File Name:</b> {serverResponse.file_name}</p>  
                        </div>
                        <div className='border-b border-gray-700 p-4'>
                            <p className='text-left'><b>File Type:</b> {serverResponse.type}</p>  
                        </div>
                        <div className='border-b border-gray-700 p-4'>
                            <p className='text-left'><b>File Size:</b> {(serverResponse.size / (1024 * 1024)).toFixed(2)} MB</p>  
                        </div>
                        <div className='border-b border-gray-700 p-4'>
                            <p className='text-left'><b>Shapes Count:</b> {serverResponse.shape_count}</p>  
                        </div>
                        <div className='border-b border-gray-700 p-4'>
                            {loading ? (
                                <div className='p-[10px] flex items-center gap-[20px]'>
                                    <Loading /> 
                                    <p> Thinking ... </p>
                                </div>
                            ) : (
                                <AIFormattedText text={textResponse} /> 
                            )}
                        </div>                          
                    </div>
                  )}
                </div>
            </div>
        </div>
    );
}

export default TakeOff;
