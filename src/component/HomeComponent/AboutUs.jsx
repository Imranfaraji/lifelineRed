import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16  ">
      <div className="responsive flex flex-col md:flex-row gap-12 items-center justify-between">
        
        {/* Left Side - Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://i.ibb.co.com/ZpTnrdKM/nguy-n-hi-p-s-TTea-N4wwr-U-unsplash.jpg"
            alt="About LifelineRed"
            className="rounded-2xl shadow-lg w-full"
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About <span className="text-red-600">LifelineRed</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            LifelineRed is a community-driven platform designed to connect blood donors 
            with patients in urgent need. Our mission is to ensure that no life is lost 
            due to unavailability of blood. By bringing together compassionate donors, 
            volunteers, and organizations, we aim to make blood donation more accessible, 
            transparent, and reliable.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Together, we can create a future where every blood request is met 
            promptly and every patient gets a second chance at life.
          </p>
          <div className="flex items-center gap-2 mt-2">
                      <a
                        target="_blank"
                        href="https://www.facebook.com/imranhosen.borhany"
                      >
                        <FaFacebook size={25}/>
                      </a>
                      <a target="_blank" href="https://www.instagram.com/imran_2k20/">
                        <FaInstagramSquare size={25}/>
                      </a>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/in/imran-hosen-a4814b363/"
                      >
                        <FaLinkedin className="" size={25}/>
                      </a>
                    </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
