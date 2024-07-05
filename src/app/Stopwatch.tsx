"use client"
import React, { useState, useRef } from 'react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const reset = () => {
    setTime(0);
    stop();
  };

  const formatTime = (time: number) => {
    const getMilliseconds = `00${(time % 1000)}`.slice(-3);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl font-mono mb-8">
        {formatTime(time)}
      </div>
      <div className="space-x-4">
        <button onClick={start} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Start
        </button>
        <button onClick={stop} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Stop
        </button>
        <button onClick={reset} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
