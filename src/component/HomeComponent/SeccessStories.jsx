import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Blood Recipient",
    story:
      "I was in urgent need of blood during surgery. Thanks to LifelineRed, I got a donor within hours. This platform truly saves lives!",
    img: "https://i.ibb.co.com/NnHWtZg3/pexels-rdne-6414906.jpg",
  },
  {
    id: 2,
    name: "Hasan Ahmed",
    role: "Blood Donor",
    story:
      "Donating blood has never been this easy. I got notified instantly and helped someone in need. It feels amazing to give back!",
    img: "https://i.ibb.co.com/nMZvFPpn/pexels-cottonbro-9950569.jpg",
  },
  {
    id: 3,
    name: "Shamima Akter",
    role: "Patient’s Mother",
    story:
      "My child needed blood urgently. Within minutes, LifelineRed connected us with a kind donor. I will always be grateful.",
    img: "https://i.ibb.co.com/hxRGG5nM/pexels-shkrabaanthony-5215024.jpg",
  },
  {
    id: 4,
    name: "Rafiq Hossain",
    role: "Volunteer",
    story:
      "I coordinate with local donors through LifelineRed. It’s amazing how technology can bring hope and save lives in our community.",
    img: "https://i.ibb.co.com/q3JYL8KL/pexels-wendywei-1656684.jpg",
  },
];

const SuccessStories = () => {
  return (
    <section className="w-full py-16">
      <div className="text-center px-2 md:px-0 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Success <span className="text-red-600">Stories</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Real stories from our donors, recipients, and volunteers who experienced the power
          of LifelineRed.
        </p>
      </div>

      {/* Stories */}
      <div className="responsive  grid sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 relative hover:shadow-lg transition-all"
          >
            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-red-500 absolute top-4 left-4 opacity-30" />

            {/* Story */}
            <p className="text-gray-600 italic mb-6">{story.story}</p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={story.img}
                alt={story.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {story.name}
                </h4>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
