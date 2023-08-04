import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className='text-center'> <progress className="progress progress-warning w-56"></progress>
        </div>

    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' replace={true}></Navigate>;


};

export default PrivateRouter;