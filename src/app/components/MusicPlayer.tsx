'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Song } from '../data/songs';
import Image from 'next/image';
import { VolumeControl } from './VolumeControl';

interface MusicPlayerProps {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onProgressChange: (time: number) => void;
}

export default function MusicPlayer({
  songs,
  currentSongIndex,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onProgressChange
}: MusicPlayerProps) {
  const currentSong = songs[currentSongIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(err => console.error('Error playing audio:', err));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setProgress(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    onProgressChange(time);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 text-white rounded-lg overflow-hidden shadow-xl">
      <div className="p-4">
        {/* Album Cover */}
        <div className="relative aspect-square w-full mb-4">
          <Image 
            src={currentSong.cover} 
            alt={`${currentSong.album || currentSong.title} cover`} 
            className="rounded-md"
            width={500}
            height={500}
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Song Info */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold truncate">{currentSong.title}</h2>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-4">
          <button 
            onClick={onPrevious}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
            </svg>
          </button>
          <button 
            onClick={onPlayPause}
            className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>
          <button 
            onClick={onNext}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex justify-end">
          <VolumeControl 
            volume={volume} 
            onChange={handleVolumeChange}
            className="text-zinc-400 hover:text-white"
          />
        </div>
      </div>
      
      {/* Audio Element (hidden) */}
      <audio 
        ref={audioRef}
        src={currentSong.audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        className="hidden"
      />
    </div>
  );
} 