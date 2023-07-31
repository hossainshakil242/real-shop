import { handler } from 'daisyui';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handlerLogOut = () => {
        logOut()
            .then(() => {
                alert('LogOut Succesfull');
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className="navbar bg-base-300">
                <a className="btn btn-ghost normal-case text-xl">Real_Shop</a>
                <Link className='btn btn-ghost normal-case text-xl' to='/'>Home</Link>
                {
                    user &&
                    <Link className='btn btn-ghost normal-case text-xl' to='/profile'>Profile</Link>
                }
                <Link className='btn btn-ghost normal-case text-xl' to='/register'>Register</Link>
                {
                    !user ?
                        <Link className='btn btn-ghost normal-case text-xl' to='/login'>Login</Link> :
                        <Link onClick={handlerLogOut} className='btn btn-ghost normal-case text-xl' to='/login'>LogOut</Link>
                }
            </div>
        </div>
    );
};

export default Header;