import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; 

function Mailing() {
    const [contacts, setContacts] = useState([]);
    const [sidebar, setSidebar] = useState(false)
    const [currentLead, setCurrentLead] = useState()
    const [finding, setFinding] = useState('')

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
        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            setCurrentLead(contact);
        }
        setSidebar(true)
    }
    
    const capitalized = (string) => {
        if (typeof string !== 'string' || string.length === 0) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    const updateContact = async(id) => {
        const url = apiURL + '/updateLead.php'; // Replace with the actual path to your PHP script

        // Prepare the data to be sent in the POST request
        const data = {
            id: currentLead.id,
            email: currentLead.email,
            name: currentLead.name,
            lastName: currentLead.lastName,
            type: currentLead.type,
            company: currentLead.company,
            status: currentLead.status
        };

        try {
            // Send the POST request using fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Data will be URL-encoded
                },
                body: new URLSearchParams(data) // Converts the data object to a URL-encoded string
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the JSON response
            const result = await response.json();

            // Handle the result
            console.log(result);
            // Optionally, update your UI or handle the result as needed

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }    
    }

    return (
        <div className='wrapper-mailing'>
            <Sidebar/>
            <div className='content'>
                <div className='header'>
                    <h1>Mailing</h1>
                    <div className='actions'>
                        <input type='text' placeholder='Find Email' onChange={(e)=>setFinding(e.target.value)}/> 
                        <i className="bi bi-layout-sidebar-inset-reverse iconSidebar" onClick={()=>setSidebar(!sidebar)}></i>
                     </div>
                </div>
                <div className='main-grid' style={{display: sidebar? 'grid':'block'}}>
                    <div className='mailing-list'>
                    {contacts
                      .filter(contact => contact.email.toLowerCase().includes(finding))
                      .map(contact => (
                        <div className='row' key={contact.id} onClick={() => selectLead(contact.id)}>
                          <p>{contact.name} {contact.lastName}</p>
                          <p>{contact.company}</p>
                          <p>{contact.email}</p>
                          <p>{capitalized(contact.status)}</p>
                        </div>
                      ))
                    }

                    </div>
                    <div className="sidebar">
                        {currentLead ? (
                            <div className='currentLead'>
                                <div className='leadName'>
                                    <h2> {currentLead.name} </h2>
                                    <h2> {currentLead.lastName} </h2>
                                </div>

                                <p className='label'> Name </p>
                                <input value={currentLead.name} 
                                    onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    name: e.target.value         
                                  })}
                                />
                                <p className='label'> Last Name </p>
                                <input value={currentLead.lastName}  
                                    onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    lastName: e.target.value     
                                  })}/>
                                <p className='label'> Company </p>
                                <input value={currentLead.company}  
                                    onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    company: e.target.value      
                                  })}/>
                                <p className='label'> Email </p>
                                <input value={currentLead.email}
                                    onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    email: e.target.value        
                                  })}/>
                                <p className='label'> Type </p>
                                <input value={currentLead.type}
                                    onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    type: e.target.value         
                                  })}/>
                                <p className='label'> Status </p>
                                <input value={capitalized(currentLead.status)}
                                 onChange={(e) => setCurrentLead({
                                    ...currentLead,               
                                    status: e.target.value       
                                  })}
                                  disabled
                                />

                                <div className='campaigns'>
                                    <p> Sent Campaigns: </p>
                                    {currentLead.campaigns.map((campaign, index) => (
                                        <li key={index}>{campaign}</li>
                                    ))}
                                </div>

                                <button onClick={()=> updateContact(currentLead.id)}> Update </button>
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
