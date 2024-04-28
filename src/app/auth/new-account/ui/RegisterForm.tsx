'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login, resgisterUser } from '@/actions';
import { useRouter } from 'next/navigation';


interface FormInputs {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const router = useRouter();


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { name, email, password } = data;
        const resp = await resgisterUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message ? resp.message : '');
            return;
        }

        setErrorMessage('');

        const resLogin = await login(email, password);

        location.reload();
        // if (resLogin.ok)
        //     console.log(resLogin.message);
        // else
        //     // router.push('/auth/login');

        //     console.log(resLogin);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">



            <label htmlFor="text">Name</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded", {
                    'border-red-500': errors.name
                })}
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />

            {
                errors.name?.type === 'required' && (
                    <span className=' text-red-500'>* The name is required</span>
                )
            }

            <label htmlFor="email" className='mt-3'>Email</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded", {
                    'border-red-500': errors.email
                })}
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />

            {
                errors.email?.type === 'required' && (
                    <span className=' text-red-500'>* The email is required</span>
                )
            }


            <label htmlFor="password" className='mt-3'>Password</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded", {
                    'border-red-500': errors.password
                })}
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            {
                errors.password?.type === 'required' && (
                    <span className=' text-red-500'>* The password is required</span>
                )
            }


            {/* Error message */}
            <span className=' text-red-500'>{errorMessage}</span>

            <button
                className="btn-primary mt-4">
                Create
            </button>


        </form>
    )
}
