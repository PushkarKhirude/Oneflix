import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black/80 w-screen aspect-video">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-md w-3/4 ">{overview}</p>
      <div className="">
        <button className="bg-white/80 text-black p-4 px-12 text-xl rounded-lg hover:bg-white">
          ▶ Play
        </button>
        <button className="mx-2 bg-white/80 text-black p-4 px-12 text-xl rounded-lg hover:bg-white">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
