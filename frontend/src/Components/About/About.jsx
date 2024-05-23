import React from 'react';
import AboutImg from '../../assets/donate.jpg';
import { Link } from 'react-router-dom';


const About = () => {
    return <section className=' pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
                {/* hero images */}
                <div className='flex gap-[30px] justify-end'>
                    <div>
                        <img src={AboutImg} alt=""  />
                    </div>
                </div>
                {/* hero content */}
                <div>
                    <div className='lg:w-[570px] '>
                        <h2 className='heading'>
                            Excellence unveiled: leading in healthcare</h2>
                        <p className='text_para '>We take pride in our national recognition as one of the finest. Dive into our remarkable achievements and unwavering commitment to excellence. Discover the inspiring story behind our relentless pursuit of becoming the leaders in our field. Learn more about our journey towards unparalleled success.</p>

                    </div>
                </div>

            </div>
        </div>
    </section>

}

export default About