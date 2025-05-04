import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera} from "react-icons/fa";


const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);


    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-container">
            <div className="box-container">
                <div className="profile-header">
                    <div className="profile-picture-container">
                        <div className="profile-picture">
                            <img
                            src={`/uploads/images/user_profile/${user.user_id}.png`}
                            alt="Profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'uploads/images/default-profile.jpg';
                            }}
                            />
                        </div>
                        <label htmlFor="upload-edit-image" className="edit-icon">
                            <FaCamera />
                        </label>
                    </div>
                    <div className="profile-info">
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p>{user.role}</p>
                    </div>
                </div>
                <div className="profile-container">
                    <div className="vertical-line"></div>
                    <div className="profile-info">
                        <table>
                            <tr>
                                <th>name</th>
                                <td>{user.firstname} {user.lastname}</td>
                                
                            </tr>
                            <tr>
                                <th>password</th>
                                <td>••••••••</td>
                                <td> <button id="edit-password-desktop"onClick={() => navigate("/passwordEdit")}>edit</button> </td>
                            </tr>
                            <tr>
                                <th>email</th>
                                <td>{user.firstname}@gmail.com</td>
                                
                            </tr>
                            <tr>
                                <th>phone number</th>
                                <td>0911233456</td>
                                
                            </tr>

                        </table>
                        <button id="edit-password-moblie"onClick={() => navigate("/passwordEdit")}>edit</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Profile;