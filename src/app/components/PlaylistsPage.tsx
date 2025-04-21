import { FC } from 'react';

interface PlaylistsPageProps {
  onClose: () => void;
  onPlaylistSelect: (playlistName: string) => void;
}

// Using the same mock playlist data from PlaylistPage.tsx
const playlists = {
  "Top Hits 2024": {
    description: "The hottest tracks of the year, all in one playlist.",
    color: "from-purple-400 to-pink-500",
    creator: "Sonance",
    followers: "2.3M",
    songIds: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28]
  },
  "Chill Vibes": {
    description: "Relaxing tunes to help you unwind and destress.",
    color: "from-blue-400 to-teal-500",
    creator: "Sonance",
    followers: "1.8M",
    songIds: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
  },
  "Party Mix": {
    description: "Upbeat tracks to keep the energy high all night long.",
    color: "from-amber-400 to-red-500", 
    creator: "Sonance",
    followers: "1.5M",
    songIds: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
  },
  "Workout Mix": {
    description: "High-energy tracks to power up your fitness routine.",
    color: "from-red-400 to-orange-500",
    creator: "Sonance",
    followers: "1.2M",
    songIds: [2, 3, 5, 7, 13, 15, 25, 27, 29]
  },
  "Indie Discoveries": {
    description: "Fresh sounds from emerging independent artists.",
    color: "from-emerald-400 to-teal-600",
    creator: "Sonance",
    followers: "957K",
    songIds: [4, 9, 12, 16, 19, 21, 24, 27, 28, 32]
  },
  "Throwback Classics": {
    description: "Nostalgic hits that stand the test of time.",
    color: "from-violet-500 to-purple-700",
    creator: "Sonance",
    followers: "2.1M",
    songIds: [1, 5, 17, 20, 25, 26, 29, 30]
  },
  "Focus Flow": {
    description: "Calm, ambient tracks to help you concentrate and stay productive.",
    color: "from-indigo-400 to-blue-600",
    creator: "Sonance",
    followers: "1.7M",
    songIds: [6, 9, 11, 14, 18, 21, 22, 31, 32]
  }
};

const PlaylistsPage: FC<PlaylistsPageProps> = ({ onClose, onPlaylistSelect }) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white pt-2 px-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-center flex-1 text-gray-800">Playlists</h1>
          <div className="w-8 h-8"> {/* Empty div for alignment */}
          </div>
        </div>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search playlists"
            className="w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {/* Featured Playlist */}
        <div 
          className="mb-6 rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-blue-600 to-blue-800 relative"
          onClick={() => onPlaylistSelect("Focus Flow")}
        >
          <div className="p-5 text-white relative z-10">
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">Featured Playlist</span>
            <h2 className="text-2xl font-bold mt-1 mb-1">Focus Flow</h2>
            <p className="text-sm opacity-80 mb-3 line-clamp-2">Calm, ambient tracks to help you concentrate and stay productive.</p>
            <div className="flex items-center text-xs">
              <span className="opacity-80">1.7M followers</span>
              <span className="mx-2 opacity-60">•</span>
              <span className="opacity-80">{playlists["Focus Flow"].songIds.length} songs</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute right-5 bottom-5 z-10">
            <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Your Playlists */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Your Playlists</h2>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className="bg-gray-50 rounded-xl p-3 shadow-sm flex flex-col"
              onClick={() => onPlaylistSelect("Liked Songs")}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 truncate text-gray-800">Liked Songs</h3>
              <p className="text-xs text-gray-500">Your favorite tracks</p>
            </div>
            <div 
              className="bg-gray-50 rounded-xl p-3 shadow-sm flex flex-col"
              onClick={() => onPlaylistSelect("Recently Played")}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 truncate text-gray-800">Recently Played</h3>
              <p className="text-xs text-gray-500">Your history</p>
            </div>
          </div>
        </div>
        
        {/* All Playlists */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-800">All Playlists</h2>
          <div className="space-y-3">
            {Object.entries(playlists).map(([name, playlist]) => (
              <div 
                key={name}
                className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm active:bg-gray-100"
                onClick={() => onPlaylistSelect(name)}
              >
                <div className={`w-14 h-14 rounded-lg overflow-hidden mr-3 bg-gradient-to-br ${playlist.color} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{playlist.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>{playlist.followers}</span>
                    <span className="mx-1">•</span>
                    <span>{playlist.songIds.length} songs</span>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          {/* Create New Playlist Button */}
          <div className="fixed bottom-20 right-4">
            <button className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistsPage; 