import { useState, useEffect, useRef } from "react";
import { FaPlay, FaForwardStep, FaBackwardStep, FaPause } from "react-icons/fa6";

const App = () => {
  const audioRef = useRef();

  const [musicList, setMusicList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true); // Nuevo estado

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setMusicList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const playSong = (index) => {
    const songUrl = `https://playground.4geeks.com/apis/fake/sound/${musicList[index].url}`;
    audioRef.current.src = songUrl;
    audioRef.current.play();
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isFirstPlay) {
      // Si es la primera reproducción, inicia la primera canción
      playSong(currentSongIndex);
      setIsFirstPlay(false);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % musicList.length;
    if (isPlaying) {
      audioRef.current.pause(); // Pausa la canción actual si está reproduciendo
    }
    playSong(nextIndex);
  };

  const playPreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + musicList.length) % musicList.length;
    if (isPlaying) {
      audioRef.current.pause(); // Pausa la canción actual si está reproduciendo
    }
    playSong(previousIndex);
  };

  return (
    <>
      <div className="musicPlayerWrapper">
        <div className="musicPlayerControlsWrapper">
          <div className="iconWrapper" onClick={playPreviousSong}>
            <FaBackwardStep />
          </div>
          <div className="iconWrapper" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <div className="iconWrapper" onClick={playNextSong}>
            <FaForwardStep />
          </div>
        </div>
        <div className="musicPlayerListWrapper">
          <div className="musicPlayerListScroll">
            <ul>
              {musicList?.map((item) => (
                <li key={item.id}>
                  <div className="itemInfo">
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                  </div>
                  <audio ref={audioRef}></audio>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
