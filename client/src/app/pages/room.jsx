import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Room = () => {
  const [userStream, setUserStream] = useState(null); // Initialize userStream as null

  const streamUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setUserStream(stream);
    } catch (error) {
      console.error("Error accessing user media:", error);
    }
  };

  return (
    <div>
      <div>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=zTjRZNkhiEU"
          width="1080px"
          height="720px"
          controls={true}
        />
      </div>

      <button
        type="button"
        onClick={streamUser}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10"
      >
        Stream
      </button>

      <div className="m-10">
        {userStream && (
          <ReactPlayer
            width="1280px"
            height="720px"
            url={URL.createObjectURL(userStream)} // Convert stream to URL
            controls={true}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
