import axios from 'axios'

export async function getAllGames()
{
    try{
        let cursor=null;
        let allGames=[]
        do{
            const {data}=await axios.get('http://localhost:5000/twitchApi/getAllGames',{params:{cursor}})
            const newGames=data.games.filter(newGame=>!allGames.some(oldGame=>oldGame.name===newGame.name))
            allGames.push(...newGames)
            cursor=data.cursor;

        }
        while(cursor)
        return allGames;
    }
    catch(error)
    {
        error.message="failed to fetch games"
        throw error
    }
}

export async function getAllStreamers(gameId)
{
    try{

        let cursor=null;
        let streamers=[]
        do{
            const {data}=await axios.get(`http://localhost:5000/twitchApi/getAllStreams/${gameId}`,{params:{cursor}})
            const newStreamers=data.streamers.filter(newStreamer=>!streamers.some(oldStreamer=>oldStreamer.name===newStreamer.name))
            streamers.push(...newStreamers)
            cursor=data.cursor;

        }
        while(cursor)
        return streamers;
    }
    catch(error)
    {
        error.message="failed to fetch streamers"
    } 
}
function getPreviousSundayToToday() {
    const today = new Date();
    const currentDay = today.getDay(); 
  
    const currentSunday = new Date(today);
    currentSunday.setDate(today.getDate() - currentDay);
    const previousSunday = new Date(currentSunday);
    previousSunday.setDate(currentSunday.getDate() - 7);
  

    const previousSundayRFC3339 = previousSunday.toISOString();
    const todayRFC3339 = today.toISOString();
  
    return { previousSunday: previousSundayRFC3339, today: todayRFC3339 };
  }



export async function getAllClips(name)
{
    try{
        let cursorAmount=0;
        const {previousSunday,today}=getPreviousSundayToToday();
        let cursor=null;
        let clips=[]
        do{
            const {data}=await axios.get(`http://localhost:5000/twitchApi/getAllClips/${name}`,{params:{name,cursor,previousSunday,today}})
            const newClips=data.clips
            clips=[...clips,...newClips]
            cursor=data.cursor;
            cursorAmount++;
            
        }
        while(cursor && cursorAmount<10)
        const setClips=[...new Set(clips.map(clip=>clip.id))].map(id=>clips.find(clip=>clip.id===id))
        return setClips

    }
    catch(error)
    {
        error.message="failed to fetch clips"
        throw error
    }
}

export async function getVideos(name)
{
    try
    {
        const {data}=await axios.get(`http://localhost:5000/twitchApi/getVideos/${name}`,{params:{name}})
        return data.videos;

    }
    catch(error)
    {
        error.message="failed to fetch videos"
        throw error
    }
}


