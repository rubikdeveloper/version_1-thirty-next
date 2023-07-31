"use client";
import React, { useState, useEffect } from "react";

export default function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  let timeoutId: NodeJS.Timeout;

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);

    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set timeout to generate new number after 2 seconds
    timeoutId = setTimeout(generateRandomNumber, 2000);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-1xl font-bold mb-1">Random Number</h2>
      {randomNumber !== null && (
        <p className="text-2xl">Number: {randomNumber}</p>
      )}
    </div>
  );
}
