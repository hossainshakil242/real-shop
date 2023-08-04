import { Result } from 'postcss';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const emailVerificationAlert = () => toast('Please verification your email.');
const emailAlreadyUsed = () => toast('This Email Already Used.');

const Register = () => {
    const { user, createUser, sendVerificationEmail, createAccoutnWithGoole, logOut } = useContext(AuthContext);
    // console.log(createUser);

    const handleWithGoogle = () => {
        createAccoutnWithGoole()
            .then(result => {
                const WithGoogleLogged = result.user;
                console.log(WithGoogleLogged);
            })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                sendVerificationEmail(result.user)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        if (!loggedUser.emailVerified) {
                            logOut()
                                .then(() => {
                                    console.log('logout');
                                })
                                .then(error => {
                                    console.log(error);
                                })
                        }
                        form.reset();
                    })
                    .catch(error => {
                        console.log(error);
                        emailVerificationAlert();
                    })
            })
            .catch(error => {
                const alreadyUse = `Firebase: Error (auth/email-already-in-use).`;
                error.message === alreadyUse && emailAlreadyUsed();
                console.log(error.message);

            })
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-row-reverse gap-20">
                    {/* Signup With other option */}
                    <div>
                        <h1 className="text-3xl text-center pb-5 font-bold">Easy SignUp</h1>
                        <div className='space-x-2'>

                            <button onClick={handleWithGoogle} className=" btn btn-outline btn-primary">Login With Google</button>

                            <button className=" btn btn-outline btn-primary">Login With Github</button>

                        </div>
                    </div>

                    <div>
                        <div className="text-center lg:text-left ">
                            <h1 className="text-5xl pb-5 font-bold">Register Here!</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleRegister} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="jhon smith" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="jhon@gmail.com" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>

                                <div className=" text-center">
                                    <Link to='/login'><a href="#">Already Have an Account?</a></Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Register;