"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VirtualHug() {
  const [stage, setStage] = useState('idle');

  useEffect(() => {
    let timer;
    if (stage === 'flower') {
      timer = setTimeout(() => setStage('hug'), 4000);
    } else if (stage === 'hug') {
      timer = setTimeout(() => setStage('idle'), 10000);
    }
    return () => clearTimeout(timer);
  }, [stage]);

   const handleHug = () => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.play();
    setStage('flower');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 flex flex-col items-center justify-center p-6">
      {/* Background Music */}
      <audio src="/music.mp3" autoPlay loop />

      <div className="p-6 rounded-2xl shadow-xl max-w-md text-center bg-white">
        {stage === 'idle' && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Something for you, my love</h1>
            <p className="mb-4 text-gray-700 italic">
              In the garden of my heart, your love blooms eternally. Here’s a little something to make you smile today. 💖
            </p>
            <button
              onClick={handleHug}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              💐 Click here
            </button>
          </>
        )}

        {stage === 'flower' && (
          <motion.svg
            width="100"
            height="160"
            viewBox="0 0 100 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto"
          >
            {/* Stem */}
            <motion.line
              x1="50"
              y1="50"
              x2="50"
              y2="140"
              stroke="#228B22"
              strokeWidth="4"
              initial={{ y2: 100 }}
              animate={{ y2: 140 }}
              transition={{ duration: 1 }}
            />
            {/* Petals */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={50 + 20 * Math.cos((i * Math.PI) / 3)}
                cy={50 + 20 * Math.sin((i * Math.PI) / 3)}
                r="10"
                fill="#FF69B4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              />
            ))}
            {/* Center */}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="#FFD700"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </motion.svg>
        )}

        {stage === 'hug' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mt-6 flex flex-col items-center"
          >
            <img
              src="/teddy.gif"
              alt="Two teddy bears hugging each other"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <p className="mt-4 text-pink-700 text-lg font-semibold">🤗 A hug for you, my love</p>
            <p className="text-gray-600 mt-2">Always here for you. You’re loved.</p>
          </motion.div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-600">Made with ❤️ Just for you.</footer>
    </div>
  );
}
