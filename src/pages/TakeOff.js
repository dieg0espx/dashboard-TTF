import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DragFile from '../components/DragFile';

function TakeOff() {
    const [isEditing, setIsEditing] = useState(false);
    const [serverResponse, setServerResponse] = useState({}); // ✅ Initialize as an empty object

    const handleResponse = (res) => {
        if (res.length > 0) {
            setServerResponse(res[0]); // ✅ Ensure res[0] exists before setting state
            console.log(res[0]);
        }
    };

    return (
        <div className='wrapper-orders'>
            <Sidebar/>
            <div className='content'>
                <div className='header'>
                    <h1> TakeOff </h1>
                    <div className='actions'>
                        {/* <i className="bi bi-plus-lg plusIcon" onClick={()=>window.location.href="#/newOrder"}></i>
                        <i className="bi bi-sliders sliderIcon" onClick={()=>setIsEditing(!isEditing)}></i> */}
                    </div>
                </div>
                <div className='grid grid-cols-[70%_30%] border-t border-gray-700 mt-[20px] h-[calc(100vh-90px)]'>
                  <div className='flex items-center justify-center'>
                    {serverResponse?.processed_image_url ? (  
                        <img 
                          src={serverResponse.processed_image_url} 
                          alt="Processed PDF" 
                          className='w-[80%] rounded-lg'
                        />
                    ) : (
                        <DragFile onResponse={handleResponse}/>
                    )}
                  </div>
                    
                    <div className='border-l border-gray-700 h-[calc(100vh-90px)] overflow-y-scroll'>
                        {serverResponse?.file_name ? ( // ✅ Check if response is not empty
                            <>
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
                                    <p className='text-left'>{serverResponse.text}</p>  
                                </div>
                            </>
                        ) : ( 
                            <p>Submit a PDF</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TakeOff;
