import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleStart}
    >
      {/* Logo */}
      <div className="text-center mb-12">
        <h1 className="text-8xl font-bold text-white mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          LOGO
        </h1>
      </div>

      {/* Tap to Start */}
      <div className="relative">
        <p className="text-3xl text-white font-light animate-pulse" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          tap to start
        </p>
        
        {/* Decorative lines */}
        <div className="absolute -left-32 top-1/2 transform -translate-y-1/2">
          <svg width="100" height="60" viewBox="0 0 100 60" className="text-white">
            <line x1="0" y1="20" x2="80" y2="30" stroke="currentColor" strokeWidth="3" />
            <line x1="0" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="3" />
            <line x1="0" y1="40" x2="80" y2="30" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>
        
        <div className="absolute -right-32 top-1/2 transform -translate-y-1/2">
          <svg width="100" height="60" viewBox="0 0 100 60" className="text-white">
            <line x1="20" y1="30" x2="100" y2="20" stroke="currentColor" strokeWidth="3" />
            <line x1="20" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="3" />
            <line x1="20" y1="30" x2="100" y2="40" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Landing;