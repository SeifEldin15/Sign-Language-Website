// components/QuestionSection.jsx
import React from 'react';
import SignModel from './SignModel';
import Model3d from '../assets/2.fbx?url';

const QuestionSection = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-white text-3xl font-bold text-center mb-8">
        Select the correct meaning
      </h1>
      <div className="flex justify-center mb-12 relative">
        <div className="">
        <SignModel modelUrl={Model3d}  />
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;