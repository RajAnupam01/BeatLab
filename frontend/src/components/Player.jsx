import { useEffect, useRef, useState } from "react";
import { SongData } from "../contexts/songContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  useEffect(() => {
    if (selectSong) {
      fetchSingleSong();
    }
  }, [selectSong]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    setProgress(newTime);
  };

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          {/* Left */}
          <div className="lg:flex items-center gap-4">
            <img
              src={song.thumbnail || "https://via.placeholder.com/50"}
              className="w-12"
              alt=""
            />

            <div className="hidden md:block">
              <p>{song.title}</p>
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center gap-1 m-auto">
            {song.audio && (
              isPlaying ? (
                <audio ref={audioRef} src={song.audio} autoPlay />
              ) : (
                <audio ref={audioRef} src={song.audio} />
              )
            )}

            <div className="w-full flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                className="progress-bar w-[120px] md:w-[300px]"
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleProgressChange}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <span className="cursor-pointer" onClick={prevMusic}>
                <GrChapterPrevious />
              </span>

              <button
                className="bg-white text-black rounded-full p-2"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <span className="cursor-pointer" onClick={nextMusic}>
                <GrChapterNext />
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-32"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;