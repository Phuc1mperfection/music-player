import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import Queue from "../../components/queue";
import SongCard from "../../components/songCard";
import AudioPlayer from "../../components/audioPlayer";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // Initialize as null
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          const items = res.data.items;
          if (items.length > 0) {
            setTracks(items);
            setCurrentTrack(items[0].track);
          }
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (tracks[currentIndex]) {
      setCurrentTrack(tracks[currentIndex].track);
    }
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        {currentTrack && <AudioPlayer currentTrack={currentTrack} />} {/* Render only if currentTrack is not null */}
      </div>
      <div className="right-player-body">
        {currentTrack && currentTrack.album && <SongCard album={currentTrack.album} />} {/* Render only if currentTrack and currentTrack.album are not null */}
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
