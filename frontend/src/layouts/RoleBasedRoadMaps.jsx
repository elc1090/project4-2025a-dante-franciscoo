import React from 'react';

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Full Stack Developer',
  'QA Engineer',
  'Data Scientist',
  'Mobile Developer',
  'Cybersecurity Specialist',
  'Cloud Engineer',
  'Game Developer',
  'Product Manager',
  'IOS Developer',
];

const RoleBasedRoadmaps = () => {
  return (
    <section className="text-2xl text-center px-4 py-8 bg-transparent">

    <div className="my-10 w-full flex justify-center">
        <div className="w-full h-1 bg-gray-400 shadow-[0_12px_30px_rgba(255,255,255,0.4),0_-12px_30px_rgba(255,255,255,0.4)] rounded-full" />
    </div>

      <p className="font-bold text-indigo-500 mb-4 mt-12">
        Role-based Roadmaps
      </p>
      <p className="text-white text-base md:text-lg max-w-2xl mx-auto mb-10">
        Choose your path based on your goal — whether you're aiming to become a Frontend Developer, Backend Developer, DevOps Engineer, or explore other roles. Our curated roadmaps will help you stay on track and master your skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
        {roles.map((role) => (
          <div
            key={role}
            className="bg-gray-800 hover:bg-indigo-600 text-white text-base font-semibold py-6 px-4 rounded-xl shadow-md transition duration-300 cursor-pointer"
          >
            {role}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoleBasedRoadmaps;
