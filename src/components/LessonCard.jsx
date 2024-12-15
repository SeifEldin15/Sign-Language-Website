const LessonCard = ({ level, title, units, description, isActive = false }) => {
  return (
    <div className={`rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow transition-colors duration-300 border cursor-pointer ${
      isActive 
        ? "bg-[#1c4455] border-[#0085CC]" 
        : "bg-gray-800 border-transparent hover:border-[#0085CC] transition-border duration-300"
    }`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-full h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
            <span className="text-gray-700 font-semibold">{level}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <h3 className={`text-lg font-semibold ${
              isActive 
                ? "text-[#4ac6ff]" 
                : "text-blue-600"
            }`}>{title}</h3>
          </div>
          <p className="mt-2 text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
