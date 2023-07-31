import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <div className="navbar bg-base-300">
                <a className="btn btn-ghost normal-case text-xl">realShop</a>
                <Link className='ml-5 ' to='/'>Home</Link>
                <Link className='ml-5 ' to='/login'>Login</Link>
                <Link className='ml-5 ' to='/register'>Register</Link>
            </div>
        </div>
    );
};

export default Header;