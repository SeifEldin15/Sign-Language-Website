import { useNavigate } from 'react-router-dom';

const LessonCard = ({ level, title, units, description, isActive = false, isLocked = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/question`); // or whatever your questions route path is
    //   /${level}
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow transition-colors duration-300 border cursor-pointer ${
        isLocked 
          ? "bg-gray-800 border-gray-700 opacity-75 cursor-not-allowed" 
          : isActive 
            ? "bg-[#1c4455] border-[#0085CC]" 
            : "bg-gray-800 border-transparent hover:border-[#0085CC] transition-border duration-300"
      }`}
    >
      {isActive && (
        <span className="absolute top-2 right-2 text-xs text-gray-400">
          Current Level
        </span>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className={`bg-white rounded-full w-12 h-12 flex items-center justify-center border border-gray-200 ${
            isLocked ? "opacity-50" : ""
          }`}>
            <span className="text-gray-700 font-semibold">{level}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <h3 className={`text-lg font-semibold ${
              isLocked 
                ? "text-gray-500"
                : isActive 
                  ? "text-[#4ac6ff]" 
                  : "text-blue-600"
            }`}>
              {title}
              {isLocked && " 🔒"}
            </h3>
          </div>
          <p className={`mt-2 ${isLocked ? "text-gray-600" : "text-gray-400"}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
