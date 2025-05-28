import React, { useEffect, useState } from 'react';


function getCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (let cookie of cookieArray) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function AdminSetting() {
    const handlePasswordUpdate = (e) => {
        e.preventDefault()
        // Add your fetch code here, using the state variables
        const data = {
            currentpassword: formData.currentPassword,
            newpassword: formData.newPassword,
            confirmedpassword: formData.confirmPassword,
            id: formData.id
        };

        fetch("http://localhost:3001/routes/password/update", {
            method: "PUT",
        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        
        })
        
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Password updated successfully, clear the form
                alert("Password updated successfully");
            } else {
                console.log(data);
                // Error updating password, set the error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const [userData, setUserData] = useState({

        fullName: '',
        email: '',
        profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
        contact: ''
    });

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            try {
                const tokenObject = JSON.parse(token);
                setUserData({
                    email: tokenObject.email,
                    name: tokenObject.name,
                    contact: tokenObject.phoneno,
                    profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'

                });

                setFormData({
                    ...formData,
                    email: tokenObject.email,
                    name: tokenObject.name,
                    contact: tokenObject.phoneno,
                    id: tokenObject._id
                });

                
            } catch (error) {
                console.error('Failed to parse token cookie', error);
            }
        }
    }, []);

    // State variable to track the visibility of the upload file form
    const [showUploadForm, setShowUploadForm] = useState(false);

    // Function to toggle the visibility of the upload file form
    const toggleUploadForm = () => {
        setShowUploadForm(!showUploadForm);
    };

    // Function to handle the profile picture update
    const handleProfilePictureUpdate = (e) => {
        const file = e.target.files[0];
        // Assuming you have a function to upload the file and get a URL
        const imageUrl = URL.createObjectURL(file);
        setUserData(prevData => ({
            ...prevData,
            profilePicture: imageUrl
        }));
        // Optionally, you can send the file to the server for permanent storage
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        id: ''
      });
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [id]: value
        }));
      };
    
      



    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-24" style={{ marginTop: "6rem" }}>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full max-w-md bg-white mt-4 mb-4 sm:w-1/2 lg:w-1/3">
                        <div className="relative inline-block mx-auto">
                            {/* Profile picture with upload icon */}
                            <label htmlFor="profile-upload" className="cursor-pointer">
                                <img src={userData.profilePicture} alt="Profile" className="rounded-lg w-48 h-48 mx-auto" />
                                <svg className="absolute bottom-0 right-0 w-6 h-6 text-gray-800 dark:text-white transform rotate-180 mb-2 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18" onClick={toggleUploadForm}>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                </svg>
                            </label>
                            {/* File input field */}
                            {showUploadForm && (
                                <input type="file" id="profile-upload" className="hidden" onChange={handleProfilePictureUpdate} />
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Name: {userData.name}</p>
                            <p className="text-gray-600">Email: {userData.email}</p>
                            <p className="text-gray-600">Contact: {userData.contact}</p>
                        </div>
                    </div>
                    <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md mt-4 mb-4 sm:w-1/2 lg:w-1/3">
                        <form onSubmit={handlePasswordUpdate}>
                            {['name', 'email', 'contact', 'currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                                <div key={idx} className="relative mb-4">
                                    <input
                                        type="text"
                                        id={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor={field}
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3"
                                    >
                                        {field.split(/(?=[A-Z])/).join(' ')}
                                    </label>
                                </div>
                            ))}
                            <button type="submit" className="btn w-full text-white bg-blue-500 hover:bg-blue-600">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSetting;

