'use client';

import React, { useState, useEffect, useRef } from 'react';

interface VolumeControlProps {
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ 
  className = ""
}) => {
  // State for mobile detection and UI interaction
  const [/* isMobile */, setIsMobile] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50); // UI-only slider position
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // References
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Properly detect mobile on client-side only
  useEffect(() => {
    if (!isMounted) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMounted]);
  
  // Handle UI dragging (no actual functionality)
  const handleSliderChange = (clientY: number) => {
    // Safety check - if ref is null, don't proceed
    if (!sliderRef.current) return;
    
    try {
      // Get slider track position
      const sliderTrack = sliderRef.current.getBoundingClientRect();
      const trackHeight = sliderTrack.height;
      const trackTop = sliderTrack.top;
      
      // Calculate percentage (inverted for bottom-up slider)
      const percentage = 100 - Math.max(0, Math.min(100, 
        ((clientY - trackTop) / trackHeight) * 100
      ));
      
      setSliderPosition(percentage);
    } catch (error) {
      // Fail silently if any error occurs during calculation
      console.error("Error updating slider position:", error);
    }
  };
  
  // Handle mouse down on the slider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    handleSliderChange(e.clientY);
  };
  
  // Set up global mouse move handler for smoother dragging
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleSliderChange(e.clientY);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMounted]);
  
  // Render volume icon - medium volume
  const volumeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
    </svg>
  );
  
  return (
    <div 
      className={`relative ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsSliderVisible(true)}
      onMouseLeave={() => {
        if (!isDragging) {
          setIsSliderVisible(false);
        }
      }}
    >
      {/* Volume button */}
      <button
        type="button"
        className="focus:outline-none p-2 rounded-full transition-all duration-200 hover:bg-white/10"
        aria-label="Volume (decorative)"
        onClick={(e) => e.stopPropagation()}
      >
        {volumeIcon}
      </button>
      
      {/* Volume slider panel - controlled by state */}
      <div 
        className={`absolute bottom-full -left-1 mb-2 z-20 transition-all duration-200 origin-bottom ${
          isSliderVisible || isDragging ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-zinc-800/40 w-8 flex flex-col items-center">
          {/* Vertical slider */}
          <div 
            ref={sliderRef}
            className="relative h-24 flex flex-col justify-end cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            {/* Track background */}
            <div className="w-1.5 h-full bg-zinc-800 rounded-full overflow-hidden relative">
              {/* Filled part of slider */}
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-white/70 to-white rounded-full"
                style={{ height: `${sliderPosition}%` }}
              />
            </div>
            
            {/* Thumb indicator dot */}
            <div 
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-75"
              style={{
                left: '50%',
                bottom: `calc(${sliderPosition}% - 1.5px)`,
                boxShadow: '0 0 3px rgba(255, 255, 255, 0.5)'
              }}
            />
          </div>
        </div>
        
        {/* Subtle connecting triangle */}
        <div className="w-0 h-0 absolute left-2.5 bottom-0 transform translate-y-full border-t-4 border-l-4 border-r-4 border-t-zinc-900/90 border-l-transparent border-r-transparent" />
      </div>
    </div>
  );
}; 