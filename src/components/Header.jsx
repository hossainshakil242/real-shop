import { handler } from 'daisyui';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const logOutSuccess = () => toast.success('LogOut Success.!');

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handlerLogOut = () => {
        logOut()
            .then(() => {
                logOutSuccess();
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className="navbar bg-base-300">
                <Link className="btn btn-ghost normal-case text-xl">Real_Shop</Link>
                <Link className='btn btn-ghost normal-case text-xl' to='/'>Home</Link>
                {
                    user &&
                    <Link className='btn btn-ghost normal-case text-xl' to='/profile'>Profile</Link>
                }
                <Link className='btn btn-ghost normal-case text-xl' to='/register'>Register</Link>
                {
                    user ?
                        <Link onClick={handlerLogOut} className='btn btn-ghost normal-case text-xl'>LogOut</Link> :
                        <Link className='btn btn-ghost normal-case text-xl' to='/login'>Login</Link>
                }
                <Link to='/order'>Order</Link>
            </div>
            <Toaster />
        </div>
    );
};

export default Header;