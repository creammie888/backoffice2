import React, { useEffect, useState } from "react";

const Setting = () => {
    const [user, setUser] = useState(null);
        
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
        <div className="topic">
            Setting
        </div>
    )
}
export default Setting;