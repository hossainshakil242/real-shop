import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const [error,setError] = useState('');

    const { signIn,logOut } = useContext(AuthContext);
    
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if(!loggedUser.emailVerified){
                    alert('please verify your email');
                    logOut()
                    .then(()=>{})
                    .catch(error=>{console.log(error);})

                }
                if(loggedUser.emailVerified){
                    form.reset();
                setError('login successfull')
                }
            })
            .catch(error => {
                const wrongPassword = `Firebase: Error (auth/wrong-password).`
                if(error.message === wrongPassword){
                    setError('wrong password')
                }
                else{
                    console.log(error.message);
                }
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login Here!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                            <div className=" text-center">
                                <Link to='/register'><a href="#">Create new account</a></Link>
                            </div>
                        </form>
                        <div>
                            <p className='text-error text-center'>{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;