import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

function Contact() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const userInfo={
        name:data.name,
        email:data.email,
        message:data.message
    }
    try{
        await axios.post("https://getform.io/f/bolggega",userInfo);
        toast.success("Your message has been sent")
    }catch(error){
        toast.error("Something went wrong!")
    }
  }
  return (
    <>
        <div name="Contacts" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-16'>
            <div className='text-3xl font-bold mb-4'>Contact me</div>
            <span>Please fill out the form below to contact me</span>
            <div className='flex flex-col items-center justify-center mt-5'>
                <form 
                //action="https://getform.io/f/bolggega" 
                //method="POST" 
                onSubmit={handleSubmit(onSubmit)}
                className='bg-slate-200 rounded-md w-96 px-9 py-6'>
                    <h1 className='font-semibold text-gray-900'>Send Your Message</h1>
                    <div className='flex flex-col mb-4'>
                        <label className='block text-gray-700 text-sm' htmlFor="">Full Name</label>
                        <input {...register('name', { required: true })} name='name' id='name' className='text-black leading-tight border rounded text-sm focus:out py-2 px-3 my-1' type="text" placeholder='Enter your Full Name' />
                        {errors.name && <span className='text-red-700 text-sm' >*This field is required</span>}

                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='block text-gray-700 text-sm' htmlFor="">Email address</label>
                        <input name='Email' id='email'
                        {...register('email', { required: true })}
                        className=' text-black leading-tight border rounded text-sm focus:out py-2 px-3 my-1' type="text" placeholder='Enter your email address' />
                        {errors.email && <span className='text-red-700 text-sm'>*This field is required</span>}

                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='block text-gray-700 text-sm' htmlFor="">Text area</label>
                        <input name='message' id='message'
                        {...register('message', { required: true })}
                        className='text-black border rounded text-sm focus:out py-2 px-2 h-[100px] text-wrap my-1' type="text" placeholder='Write your message' />
                        {errors.message && <span className='text-red-700 text-sm'>*This field is required</span>}

                    </div>
                    <button type='submit' className='bg-black text-white rounded-md px-3 py-2'>Send</button>
                </form>
            </div>
        </div>
    </> 
 )
}

export default Contact