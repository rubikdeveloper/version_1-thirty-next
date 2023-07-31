"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

export default function DataFetchingComponent() {
  const [body, setBody] = useState(null);
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const fetchData = async () => {
    try {
      const randomPostId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${randomPostId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const jsonData = await response.json();
      setBody(jsonData.body); // Set only the "body" property in the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPeriodically = useCallback(() => {
    fetchData();
    timeoutIdRef.current = setTimeout(fetchPeriodically, 5000);
  }, []);

  useEffect(() => {
    fetchPeriodically();

    return () => {
      // Cleanup function to clear the interval when the component unmounts
      clearTimeout(timeoutIdRef.current);
    };
  }, [fetchPeriodically]);

  return (
    <div className="p-4 m-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg w-64 h-24 overflow-hidden transform transition-transform hover:scale-105">
      <h2 className="text-1xl font-bold mb-2">Message</h2>
      {body !== null && (
        <p className="whitespace-nowrap overflow-ellipsis overflow-hidden h-12">
          {body}
        </p>
      )}
    </div>
  );
}
