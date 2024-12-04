import React, { useRef } from 'react';
import CommonWords from '../assets/common.png';

const CommonWordsSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold">Common words</h2>
        <a href="#" className="text-green-400 hover:text-green-300">See All</a>
      </div>
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Slider Container */}
        <div 
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-8 pb-4"
        >
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              How Are You
            </h3>
            <img 
              src={CommonWords} 
              alt="How Are You in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Good Night
            </h3>
            <img 
              src={CommonWords} 
              alt="Good Night in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Thank You
            </h3>
            <img 
              src={CommonWords} 
              alt="Thank You in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Hello
            </h3>
            <img 
              src={CommonWords} 
              alt="Hello in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Please
            </h3>
            <img 
              src={CommonWords} 
              alt="Please in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Sorry
            </h3>
            <img 
              src={CommonWords} 
              alt="Sorry in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Good Morning
            </h3>
            <img 
              src={CommonWords} 
              alt="Good Morning in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
          <div className="bg-cyan-500 rounded-xl relative overflow-hidden h-48 min-w-[300px] snap-start">
            <h3 className="absolute top-4 left-4 text-xl font-bold text-white">
              Nice to Meet You
            </h3>
            <img 
              src={CommonWords} 
              alt="Nice to Meet You in Sign Language" 
              className="absolute right-0 h-full w-auto object-cover"
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommonWordsSlider; 