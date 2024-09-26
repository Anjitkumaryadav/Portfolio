import React from 'react'
import pic from "../../public/photo.jpeg"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { ReactTyped,Typed } from "react-typed";

function Home() {
  return (
    <>
        <div name="Home" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2 mt-12 md:mt-24 space-y-2 order-2 md:order-1'>
                    
                    <div className='flex space-x-1 text-2xl md:text-4xl'>
                        <h1>Hello,I'm a </h1>
                        {/*<span className='text-red-700 font-bold'> Developer</span>*/}
                        <ReactTyped className='text-red-700 font-bold'

                            strings={["Developer","Coder"]}
                            typeSpeed={40}
                            backSpeed={40}
                            loop={true}
                        />
                    </div>
                    <br/>
                    <p className='text-sm md:text-md text-justify'>Hi! My name is Anjit kumar yadav. I am a full stack web developer. I have skills of React js Node js, MongoDB, Express js etc.
                    </p><br/>

                    {/*social media icons*/}
                    <div className='flex flex-col items-center md:flex-row justify-between space-y-6 md:space-y-0'>
                    <div className='space-y-2 '>
                        <h1 className='font-bold text-center'>Available on</h1>
                        <ul className='flex space-x-5'>

                            <li className='text-2xl cursor-pointer'><a href="https://www.facebook.com/" target='_blank'>{" "}<FaFacebook /></a></li>
                            <li className='text-2xl cursor-pointer'><a href="https://www.linkedin.com/in/anjit-kumar-yadav-7ba31a227/" target='_blank'>{" "}<FaLinkedin/></a></li>
                            <li className='text-2xl cursor-pointer'><a href="https://x.com/AnjitYG" target='_blank'>{" "}<FaXTwitter /></a></li>
                            <li className='text-2xl cursor-pointer'><a href="https://t.me/anonymusGroupV" target='_blank'>{" "}<FaTelegram /></a></li>
                        </ul>                       
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Currently working on</h1>
                        <div className='flex space-x-5 '>
                            <SiExpress className='text-xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px]'/>
                            <FaNode className='text-xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px]'/>
                            <FaReact className='text-xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px]'/>
                            <DiMongodb className='text-xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px]'/>
                        </div>

                    </div>
                    </div>
                    
                </div>
                <div className='md:w-1/2 md:ml-48  md:mt-20 order-1 mt-8 md:order-2'>
                    <img className='rounded-full md:w-[450px] md:h-[450px]' src={pic} alt="" />
                </div>
            </div>
        </div>
        <hr className='my-5'/>
    
    </>
  )
}

export default Home