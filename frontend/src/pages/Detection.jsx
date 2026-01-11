import { useState, useRef } from 'react';

function Detection() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startDetection = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setIsDetecting(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Cannot access camera. Please allow camera permissions.');
    }
  };

  const pauseDetection = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsDetecting(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-t-2xl">
          <h1 className="text-3xl font-bold text-center">LIVE DETECTION</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur rounded-b-2xl p-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-3 space-y-4">
              <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Records
              </button>
              <button
                onClick={startDetection}
                className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
                disabled={isDetecting}
              >
                Start
              </button>
              <button
                onClick={pauseDetection}
                className="w-full px-6 py-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                disabled={!isDetecting}
              >
                Pause
              </button>
            </div>

            {/* Camera Feed */}
            <div className="col-span-9">
              <div className="bg-white rounded-2xl overflow-hidden relative" style={{ height: '500px' }}>
                {!isDetecting ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-xl">
                    Camera feed will appear here
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: `scale(${zoom})` }}
                  />
                )}
              </div>

              {/* Zoom Controls */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleZoomOut}
                  className="w-16 h-16 bg-black text-white rounded-lg text-2xl font-bold hover:bg-gray-800 transition"
                  disabled={!isDetecting}
                >
                  −
                </button>
                <button
                  onClick={handleZoomIn}
                  className="w-16 h-16 bg-black text-white rounded-lg text-2xl font-bold hover:bg-gray-800 transition"
                  disabled={!isDetecting}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-6">
          <h3 className="text-white text-xl font-bold mb-4">Instructions:</h3>
          <ul className="text-white space-y-2">
            <li>• Click "Start" to begin camera detection</li>
            <li>• Position face in center of frame</li>
            <li>• Use + and - buttons to adjust zoom</li>
            <li>• Click "Pause" to stop detection</li>
            <li>• System will automatically detect uniform compliance</li>
          </ul>
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

export default Detection;