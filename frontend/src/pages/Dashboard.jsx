import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Attendance',
      subtitle: '*details',
      button: 'start',
      route: '/students'
    },
    {
      title: 'Student Info',
      subtitle: '*details',
      button: 'Capture',
      route: '/detection'
    },
    {
      title: 'Schedule',
      subtitle: '*details',
      button: 'Add Schedule',
      route: '/schedules'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-8" style={{ backgroundColor: '#1e3a8a' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-xl p-8 flex flex-col justify-between h-96 transform hover:scale-105 transition-transform duration-200"
          >
            {/* Card Header */}
            <div>
              <h2 
                className="text-4xl font-bold mb-2 text-black"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {card.title}
              </h2>
              <p 
                className="text-2xl text-black"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {card.subtitle}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(card.route)}
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <span className="text-2xl">{card.button}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;