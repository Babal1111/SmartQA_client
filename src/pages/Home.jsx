import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Home() {
  const userDetails = useSelector((state) => state.userDetails);
  const [stats, setStats] = useState({
    totalQuestions: 1243,
    totalSessions: 189,
    totalParticipants: 876,
    activeSessions: 12
  });

  useEffect(() => {
    console.log('userDetails changed in Home', userDetails);
    // Here you would typically fetch stats from your API
    // Example:
    // const fetchStats = async () => {
    //   const response = await axios.get('/api/stats');
    //   setStats(response.data);
    // };
    // fetchStats();
  }, [userDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
            Smart QA Platform
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Elevate your question and answer sessions with powerful collaboration tools
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Questions Asked</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalQuestions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Participants</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalParticipants.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sessions Created</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalSessions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Now</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeSessions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12">
          <div className="p-8 sm:p-10">
            {userDetails ? (
              <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                    {userDetails.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userDetails.name}!</h2>
                <p className="text-gray-600">Ready to start or join a session?</p>
              </div>
            ) : (
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Smart QA</h2>
                <p className="text-gray-600">Please sign in to create or join a room</p>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create Room</h3>
                <p className="text-gray-600 mb-4">
                  Start a new session and invite participants to join your room for interactive Q&A.
                </p>
                <Link 
                  to="/create" 
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!userDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!userDetails ? (e) => e.preventDefault() : null}
                >
                  Create Now
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Join Room</h3>
                <p className="text-gray-600 mb-4">
                  Enter a room code provided by the host to participate in an ongoing session.
                </p>
                <Link 
                  to="/join" 
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!userDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={!userDetails ? (e) => e.preventDefault() : null}
                >
                  Join Session
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="text-xl font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create or Join</h3>
                <p className="text-gray-600">
                  Start a new session as a host or join an existing one as a participant.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <span className="text-xl font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Engage</h3>
                <p className="text-gray-600">
                  Ask questions, vote on topics, and interact in real-time.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <span className="text-xl font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Collaborate</h3>
                <p className="text-gray-600">
                  Work together to find answers and solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;