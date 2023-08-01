import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Profile = () => {
    const {user} = useContext(AuthContext);

    return (
        <div>
            <p>{user.email}</p>
        </div>
    );
};

export default Profile;