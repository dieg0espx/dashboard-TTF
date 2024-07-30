import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; 

function Mailing() {
    const [contacts, setContacts] = useState([]);
    const [sidebar, setSidebar] = useState(false)
    const [currentLead, setCurrentLead] = useState()

    useEffect(() => {
        getContacts();
    }, []);

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    const getContacts = async () => {
        try {
            const response = await fetch(apiURL + '/getMailingList.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            // Ensure data is an array
            if (Array.isArray(data)) {
                // Sort the contacts by name
                const sortedData = data.sort((a, b) => {
                    // Handle empty names
                    if (!a.name && b.name) return 1; // a is empty, b is not
                    if (a.name && !b.name) return -1; // a is not empty, b is
                    if (!a.name && !b.name) return 0; // both are empty
    
                    // Regular alphabetical sorting
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
    
                setContacts(sortedData); // Set the sorted data
            } else {
                console.error('Expected an array of contacts');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const selectLead = (id) => {
        console.log('SELECT LEAD ' + id);
        setCurrentLead(contacts[id])
        setSidebar(true)
    }
    
    

    return (
        <div className='wrapper-mailing'>
            <Sidebar/>
            <div className='content'>
                <div className='header'>
                    <h1>Mailing</h1>
                    <div className='actions'>
                        <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setSidebar(!sidebar)}></i>
                     </div>
                </div>
                <div className='main-grid' style={{display: sidebar? 'grid':'block'}}>
                    <div className='mailing-list'>
                        {contacts.map((contact, id) => (
                            <div className='row' onClick={()=>selectLead(id)}>
                                <p> {contact.name} {contact.lastName} </p>
                                <p> {contact.company} </p>
                                <p> {contact.email} </p>
                                <p> {contact.status} </p>
                            </div>
                        ))}
                    </div>
                    <div className="sidebar">
                        {currentLead ? (
                            <div className='currentLead'>
                                <div className='leadName'>
                                    <h2> {currentLead.name} </h2>
                                    <h2> {currentLead.lastName} </h2>
                                </div>

                                <p className='label'> Name </p>
                                <input value={currentLead.name}/>
                                <p className='label'> Last Name </p>
                                <input value={currentLead.lastName}/>
                                <p className='label'> Company </p>
                                <input value={currentLead.company}/>
                                <p className='label'> Email </p>
                                <input value={currentLead.email}/>
                                <p className='label'> Status </p>
                                <input value={currentLead.status}/>
                                <button> Update </button>
                            </div>
                        ) : (
                            <div className='noLeadSelected'>
                                <p> No Lead Selected </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mailing;
