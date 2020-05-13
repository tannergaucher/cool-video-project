import React, { useState, useRef, useEffect } from "react";

import "semantic-styles";
import "./App.css";

import gato from "../src/assets/gato.mp4";
import kitty from "../src/assets/kitty.png";
import thumbnail from "../src/assets/thumbnail.mp4";

export default function App() {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <div className="page padding container">
      <h1 className="title">Video Pawject</h1>
      {playVideo ? <Video /> : <Thumbnail setPlayVideo={setPlayVideo} />}
    </div>
  );
}

function Thumbnail({ setPlayVideo }) {
  return (
    <>
      <video autoPlay loop className="preview-video">
        <source src={thumbnail} type="video/mp4" />
      </video>
      <button className="btn btn-primary" onClick={() => setPlayVideo(true)}>
        Play Meow
      </button>
    </>
  );
}

function Video() {
  const [currentTime, setCurrentTime] = useState("");
  const [totalLength, setTotalLength] = useState("");
  const [showBeggining, setShowBeggining] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const { current: video } = videoRef;
    let interval;

    const handleLoadedMetadata = () => {
      setTotalLength(video.duration);
    };

    const handlePlay = () => {
      interval = setInterval(() => {
        setCurrentTime(video.currentTime);
      }, 300);
    };

    // const handleTimeUpdate = () => {};

    const handleSeeking = () => {
      setShowBeggining(false);
      setShowEnding(false);
    };

    const handleEnded = () => {
      clearInterval(interval);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (currentTime < 3) {
      setShowBeggining(true);
    }
    if (currentTime > 3) {
      setShowBeggining(false);
    }
    if (currentTime && currentTime >= totalLength - 3) {
      setShowEnding(true);
    }
  }, [currentTime, totalLength]);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay controls>
        <source src={gato} type="video/mp4" />
      </video>
      {showBeggining && (
        <img className="animated beginning" src={kitty} alt="kitty"></img>
      )}
      {showEnding && (
        <img className="animated ending" src={kitty} alt="kitty"></img>
      )}
    </div>
  );
}
