import { useState, useEffect  } from "react";


const App = () => {

    const [musicList, setMusicList] = useState([])

    useEffect(()=>{

        fetch('https://playground.4geeks.com/apis/fake/sound/songs')
        .then(response => response.json())
        .then(data => setMusicList(data))
        .catch(error => console.log(error))

    },[])




  return (
    <>

        <div className="musicPlayerWrapper">
        
            <div className="musicPlayerControlsWrapper">
                <div className="iconWrapper">Prev</div>
                <div className="iconWrapper">Play</div>
                <div className="iconWrapper">Next</div>
            </div>

            <div className="musicPlayerListWrapper">
                    <div className="musicPlayerListScroll">
                        <ul>
                            { musicList?.map((item)=>{
                                return   <li key={item.id}><p>{item.id}</p><p>{item.name}</p><audio src={'https://playground.4geeks.com/apis/fake/sound/'+item.url} controls></audio></li>

                            })
                            }
                        </ul>
                    </div>
            </div>
            
        </div>
    </>
  )
}

export default App
