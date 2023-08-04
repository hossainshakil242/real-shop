import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='text-center'>
            {user?.photoURL &&
                <div className="avatar">
                    <div className="w-20 mask mask-hexagon">
                        <img src={user.photoURL} />
                    </div>
                </div>
            }
            {
                user?.displayName && <p className='text-3xl mt-5 text-amber-500 font-semibold'>{user.displayName}</p>
            }
            <p>Email: <span>{user.email}</span></p>

        </div>
    );
};

export default Profile;