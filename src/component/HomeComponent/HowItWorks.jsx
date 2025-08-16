import React from "react";
import { motion } from "framer-motion";
import { Heart, UserPlus, Droplet, HandHeart } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Register",
    description:
      "Create your donor profile in just a few minutes and become part of the LifelineRed community.",
    icon: <UserPlus className="w-10 h-10 text-red-600" />,
  },
  {
    id: 2,
    title: "Request Blood",
    description:
      "Patients or their families can request blood by filling out a simple form.",
    icon: <Droplet className="w-10 h-10 text-red-600" />,
  },
  {
    id: 3,
    title: "Donate",
    description:
      "Nearby donors are notified instantly and can step forward to donate blood safely.",
    icon: <HandHeart className="w-10 h-10 text-red-600" />,
  },
  {
    id: 4,
    title: "Save Lives",
    description:
      "Every successful donation brings hope and saves precious lives in the community.",
    icon: <Heart className="w-10 h-10 text-red-600" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 ">
      <div className=" text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          How <span className="text-red-600">It Works</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Our process is simple, fast, and effective. Follow these easy steps
          and be part of saving lives.
        </p>
      </div>

      {/* Steps */}
      <div className="grid responsive md:grid-cols-2 lg:grid-cols-4 gap-8  m">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-all"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
