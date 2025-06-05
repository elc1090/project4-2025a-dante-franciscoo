import React from 'react';

const WelcomeMessage = () => {
  return (
    <section className="text-center px-4 py-8 bg-transparent mt-8">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-500 mb-4">
        Developer Roadmaps
      </h1>
      <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
        We are a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
      </p>
    </section>
  );
};

export default WelcomeMessage;
