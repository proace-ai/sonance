import { useState, useEffect } from 'react';
import Image from 'next/image';
import { songs } from '../data/songs';

interface PlaylistPageProps {
  playlistName: string;
  onClose: () => void;
  onSongSelect: (songIndex: number) => void;
  currentSongIndex?: number;
}

// Mock playlist data - in a real app, this would come from a database
const playlists = {
  "Top Hits 2024": {
    description: "The hottest tracks of the year, all in one playlist.",
    color: "from-purple-400 to-pink-500",
    creator: "Sonance",
    followers: "2.3M",
    songIds: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28] // These are IDs from the songs array
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

function PlaylistPage({ playlistName, onClose, onSongSelect, currentSongIndex = -1 }: PlaylistPageProps) {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const playlist = playlists[playlistName as keyof typeof playlists] || {
    description: "Custom playlist",
    color: "from-gray-400 to-gray-600",
    creator: "User",
    followers: "0",
    songIds: []
  };

  useEffect(() => {
    // Filter songs by playlist
    const filteredSongs = songs.filter(song => playlist.songIds.includes(song.id));
    setPlaylistSongs(filteredSongs);
    setIsLoading(false);
  }, [playlistName, playlist.songIds]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
      <div className="p-4 md:p-6">
        {/* Back button row */}
        <div className="mb-6">
          <button 
            onClick={onClose}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Header with gradient background */}
        <div className={`bg-gradient-to-br ${playlist.color} rounded-2xl p-6 text-white mb-8`}>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-40 h-40 md:w-52 md:h-52 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
              {playlistSongs.length > 0 ? (
                <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                  {playlistSongs.slice(0, 4).map((song, index) => (
                    <div key={index} className="overflow-hidden">
                      <Image 
                        src={song.cover}
                        alt={song.title}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${playlist.color}`}></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider opacity-90">Playlist</span>
                <h1 className="text-4xl md:text-6xl font-bold mt-2">{playlistName}</h1>
              </div>
              
              <p className="opacity-90 mb-6">{playlist.description}</p>
              
              <div className="flex items-center text-sm">
                <span className="font-semibold">{playlist.creator}</span>
                <span className="mx-2 opacity-80">•</span>
                <span className="opacity-80">{playlist.followers} followers</span>
                <span className="mx-2 opacity-80">•</span>
                <span className="opacity-80">{playlistSongs.length} songs</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-screen-xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              {/* Optimized controls section for mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Playlist Songs</h2>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base">Play All</span>
                  </button>
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 border border-neutral-200 text-neutral-800 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-sm sm:text-base">Share</span>
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Mobile-optimized song list */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm mb-10">
                {/* Table header - hidden on mobile, visible on larger screens */}
                <div className="hidden sm:grid grid-cols-12 px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-500">
                  <div className="col-span-1 flex items-center justify-center">#</div>
                  <div className="col-span-5">Title</div>
                  <div className="col-span-3">Album</div>
                  <div className="col-span-2">Added</div>
                  <div className="col-span-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                </div>
                
                {playlistSongs.length > 0 ? (
                  playlistSongs.map((song, index) => (
                    <div 
                      key={song.id}
                      className={`px-3 sm:px-4 py-3.5 sm:py-3 flex sm:grid sm:grid-cols-12 items-center hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200 last:border-b-0 ${currentSongIndex === song.id - 1 ? 'bg-gray-100' : ''}`}
                      onClick={() => onSongSelect(song.id - 1)}
                    >
                      {/* Index number - hidden on mobile */}
                      <div className="hidden sm:flex col-span-1 justify-center text-gray-500">{index + 1}</div>
                      
                      {/* Song info - optimized for mobile */}
                      <div className="flex items-center flex-1 min-w-0 sm:col-span-5">
                        <div className="w-12 h-12 sm:w-10 sm:h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                          <Image 
                            src={song.cover} 
                            alt={song.title} 
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                            loading="lazy" 
                          />
                        </div>
                        <div className="min-w-0 mr-2">
                          <p className="font-medium text-base sm:text-sm line-clamp-1 text-gray-800">{song.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{song.artist}</p>
                        </div>
                      </div>
                      
                      {/* Album - hidden on mobile */}
                      <div className="hidden sm:block col-span-3 text-sm text-gray-600 line-clamp-1">
                        {song.album || song.artist + " - Album"}
                      </div>
                      
                      {/* Added date - hidden on mobile */}
                      <div className="hidden sm:block col-span-2 text-sm text-gray-500">
                        3 days ago
                      </div>
                      
                      {/* Duration - shown for all screens */}
                      <div className="ml-auto sm:col-span-1 flex items-center justify-center text-right text-gray-500 text-sm">
                        {song.duration}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-gray-500">
                    This playlist is empty. Add some songs to get started.
                  </div>
                )}
              </div>
              
              {/* About section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-800">About</h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700 mb-4">
                    {playlist.description} This playlist is curated by {playlist.creator} and has {playlist.followers} followers.
                  </p>
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-xs font-medium">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Followed by 4 of your friends
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Recommended section - show similar playlists */}
              <div className="pb-24">
                <h2 className="text-xl font-bold mb-4 text-gray-800">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {Object.entries(playlists)
                    .filter(([name]) => name !== playlistName)
                    .map(([name, data], index) => (
                      <div 
                        key={index}
                        className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all"
                        onClick={() => {
                          onClose();
                          setTimeout(() => {
                            onSongSelect(data.songIds[0] - 1);
                            window.dispatchEvent(new CustomEvent('navigate-to-playlist', { detail: { playlistName: name } }));
                          }, 100);
                        }}
                      >
                        <div className={`w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${data.color}`}></div>
                        <h3 className="font-medium mb-1 text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistPage; 