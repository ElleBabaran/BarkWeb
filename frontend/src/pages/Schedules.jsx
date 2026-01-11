import { useState, useEffect } from 'react';
import { schedulesAPI } from '../services/api';

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState('ALL');

  const colleges = [
    { code: 'ALL', name: 'All Colleges' },
    { code: 'CEAS', name: 'CEAS' },
    { code: 'CBA', name: 'CBA' },
    { code: 'COE', name: 'COE' },
    { code: 'COA', name: 'COA' },
    { code: 'CCIT', name: 'CCIT' },
    { code: 'CAH', name: 'CAH' },
    { code: 'CTHM', name: 'CTHM' },
  ];

  const dayNames = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await schedulesAPI.getAll();
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedules = selectedCollege === 'ALL'
    ? schedules
    : schedules.filter(s => s.block?.includes(selectedCollege));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-green-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Class Schedules</h1>

        {/* College Filter */}
        <div className="mb-8">
          <p className="text-white mb-4 text-lg">Filter by College:</p>
          <div className="flex flex-wrap gap-3">
            {colleges.map((college) => (
              <button
                key={college.code}
                onClick={() => setSelectedCollege(college.code)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  selectedCollege === college.code
                    ? 'bg-yellow-400 text-blue-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {college.name}
              </button>
            ))}
          </div>
        </div>

        {/* Schedules Table */}
        <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50">
                <th className="px-6 py-4 text-left text-white font-semibold">Subject</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Room</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Day</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Time</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Professor</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Block</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-white">
                    Loading...
                  </td>
                </tr>
              ) : filteredSchedules.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-white">
                    No schedules found
                  </td>
                </tr>
              ) : (
                filteredSchedules.map((schedule) => (
                  <tr
                    key={schedule.scheduleId}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 text-white">
                      <div className="font-semibold">{schedule.subject?.subjectCode}</div>
                      <div className="text-sm text-gray-300">{schedule.subject?.subjectName}</div>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {schedule.room?.roomNumber} - {schedule.room?.building}
                    </td>
                    <td className="px-6 py-4 text-white">{dayNames[schedule.dayOfWeek]}</td>
                    <td className="px-6 py-4 text-white">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 text-white">{schedule.professor}</td>
                    <td className="px-6 py-4 text-white">
                      <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">
                        {schedule.block}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Schedules;