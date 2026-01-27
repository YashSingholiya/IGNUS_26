import React from 'react'
import './Prakriti.css'
import PrakritiLogo from './assests/1704084756722-removebg-preview.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CounterAnimation from './CounterAnimation';
import instaIcon from '/images/Insta.svg' ;
import mailIcon from '/images/Mail.svg' ;


function Prakrit() {

    document.title = 'Prakriti | Ignus IIT Jodhpur'
    return (
        <div className='Prakriti_Container'>
            <div className='Prakriti_Image_Container'>
               

                <div className='Prakriti_Logo_Container'>
                    <img src={PrakritiLogo} alt='Prakriti' className='Prakriti_Logo' />
                    <p className='font-relington text-white media_600:text-[35px] text-[180%] text-center'><b>Srishti Samarthan Sadbhawana</b></p>
                </div>
            </div>

            <div className='Prakriti_main_container'>
                <div className='Prakriti_Container_2'>
                        <div className='Prakriti_Container_2_left'>
                            <h1 className='text-#192A2E media_876:text-[35px] text-[25px] font-semibold font-montserrat'>About Us</h1>
                            <p className='media_876:text-[17px] text-[14px] font-montserrat pt-[20px]'>Prakriti, which translates to &quot;The natural world,&quot; is IGNUS&apos; social wing. The feeling of social advancement motivates us to use our social drive to improve society. We practice what we preach. By planning activities that inspire the populace and young people, Prakriti has made the decision to enlighten the future of our country.</p>
                            <p className='media_876:text-[17px] text-[14px] font-montserrat pt-[20px]'>The feeling of social advancement motivates us to use our social drive to improve society. It inculcates various impactful events, exhibitions, workshop and competition to instil a sense of responsibility in young generation towards the society and to create awareness about the basic human rights.</p>
                        </div>
                        <div className='Prakriti_Container_2_Right'>
                            <Carousel
                                axis='horizontal'
                                autoPlay={true}
                                infiniteLoop={true}
                                interval={2000}
                                showArrows={false}
                                // showIndicators={false} 
                                swipeable={false}
                                useKeyboardArrows={false}
                                stopOnHover={false}
                                showStatus={false} 
                                showThumbs={false}
                            >

                                <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/prakriti/img1.PNG?raw=true' alt='Image-1' className='Image_Prakriti rounded-[20px]' />
                                <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/prakriti/img2.PNG?raw=true' alt='Image-2' className='Image_Prakriti rounded-[20px]' />
                                <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/prakriti/img3.PNG?raw=true' alt='Image-3' className='Image_Prakriti rounded-[20px]' />
                                <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/prakriti/img4.PNG?raw=true' alt='Image-4' className='Image_Prakriti rounded-[20px]' />
                                <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/prakriti/img5.PNG?raw=true' alt='Image-5' className='Image_Prakriti rounded-[20px]' />

                            </Carousel>
                    </div>
                </div>

                <div className='Prakriti_Container_info_2'>
                    <h1 className='info_2'>Events</h1>
                    <ol className='gradient-list'>
                        <li>Tree Plantations</li>
                        <li>Student Programs</li>
                        <li>Heart Check-up Awareness Seminar</li>
                        <li>Dustbin Program</li>
                        <li>Financial Literacy Awareness Camp</li>
                        <li>Free Eye Check Up</li>
                        <li>Poster Competition</li>
                        <li>T-Shirt Painting Competition</li>
                        <li>Nukkad</li>
                        <li>Workshop for Laborers&apos; Children</li>
                        <li>Sustainability Event</li>
                        <li>Orphanage Visit Camp</li>
                    </ol>
                </div>

                <div className="stats">
                    <div className="stats-sec">
                        <h1 className='stats-sec_h1'>Past Achievements</h1>
                        <div className="stats-cont">
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="1000" className='flex row justify-center'><CounterAnimation max={1000} /> +</h2>
                                    <h2>Blood Donations</h2>
                                </div>
                            </div>
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="500" className='flex row justify-center'><CounterAnimation max={500} /> +</h2>
                                    <h2>Participations in Balsa Camp</h2>
                                </div>
                            </div>
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="2000" className='flex row justify-center'><CounterAnimation max={2000} /> +</h2>
                                    <h2>Food Donations</h2>
                                </div>
                            </div>
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="6000" className='flex row justify-center'><CounterAnimation max={6000} /> +</h2>
                                    <h2>Trees Planted</h2>
                                </div>
                            </div>
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="1500" className='flex row justify-center'><CounterAnimation max={1500} /> +</h2>
                                    <h2>Online Participations</h2>
                                </div>
                            </div>
                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="20" className='flex row justify-center'><CounterAnimation max={20} /> +</h2>
                                    <h2>Orphanage Visits</h2>
                                </div>
                            </div>

                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="200" className='flex row justify-center'><CounterAnimation max={200} /> +</h2>
                                    <h2>Sanitary Pads Distributed</h2>
                                </div>
                            </div>

                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="200" className='flex row justify-center'><CounterAnimation max={200} /> +</h2>
                                    <h2>Dustbins Distributed</h2>
                                </div>
                            </div>

                            <div className="stats-tile">
                                <div>
                                    <h2 data-max="50" className='flex row justify-center'><CounterAnimation max={50} /> +</h2>
                                    <h2>Free Educational Camps</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>

                    <a href='https://ignus.iitj.ac.in'>
                        <img src='https://github.com/PanyalaSainathReddy/Ignus-23/blob/main/frontend/static/igmun/ignus%20icon%202.png?raw=true' alt='Logo' />
                    </a>

                    <a href=''>
                        <img src={PrakritiLogo} alt='Prakriti' />
                    </a>
                    <div className="Prakriti_contact" >
                        <b>Jigyasa Tiwari</b>
                        <br></br>
                        <a href="tel:+917000366905" className='text-[14px]' >+91 7000366905</a>
                        <br></br>
                        <a href="mailto:b23ee1029@iitj.ac.in" className='text-[14px]'>b23ee1029@iitj.ac.in</a>
                    </div>

                    <div className="Prakriti_address" >
                        <b> Address: </b>
                        <br></br>
                        <p className='text-[14px]'>IIT Jodhpur Technology Park Jodhpur, Nagaur Road, Karwar, C/O Indian Institute of Technology Jodhpur</p>
                    </div>

                    <div className="social-media-handles">
                        <button> 
                            <a href="mailto:b23ee1029@iitj.ac.in"> 
                                <img src={mailIcon} /> 
                            </a>
                        </button>
                        <button> 
                            <a href="https://www.instagram.com/prakriti_iitj/" target="_blank" rel="noreferrer"> 
                            <img src={instaIcon} /> 
                            </a>
                        </button>
                    </div>

                </footer>
            </div>

        </div>
    )
}

export default Prakrit