import React from "react";
import { useState, useEffect } from 'react';
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";



const ServiceCard = ({ index, title, icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size to determine if it's a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial render
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Conditional rendering based on screen size
  const renderCard = () => (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  );

  return isMobile ? renderCard() : <Tilt className='xs:w-[250px] w-full'>{renderCard()}</Tilt>;
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I am a passionate, enthusiastic full stack developer who enjoys problem solving. 
        I have several years of development experience on the job, front-end and back, including blockchain. 
        I possess excellent soft and hard skills, and consistently aim to delight customers. 
        I really enjoy this field, and as a lifelong learner, I continue to be engaged in a variety of courses, projects, and challenges; 
        I am genuinely excited to expand my knowledge while helping your business create great technology!
      </motion.p>

      <div className={styles.serviceCardContainer}>
        {services.map((service, index) => (
          <ServiceCard className={styles.serviceCard} key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
