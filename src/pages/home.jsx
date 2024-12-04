import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import CommonWordsSlider from '../components/CommonWordsSlider';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <ServicesSection />
      <CommonWordsSlider />
    </div>
  );
};

export default Home; 