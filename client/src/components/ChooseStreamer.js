import { useEffect, useState } from "react"
import SelectGame from "./SelectGame"
import SelectStream from "./SelectStream"
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Title from "./Title";
import axios from 'axios'
import {Button} from "@mui/material"
import LoadingMessage from "./LoadingMessage";
import RefreshButton from "./RefreshButton";


export default function  ChooseStreamer({setError})
{

    const [streamers,setStreamers]=useState([]);
    const [chosenStreamer,setChosenStreamer]=useState(null)
    const [allGames,setAllGames]=useState([])
    const [chosenGame,setChosenGame]=useState(null)
    const [loadingStreams,setLoadingStreams]=useState(true)
    const [refresh,setRefresh]=useState(0)
    const navigate=useNavigate();

    useEffect(()=>{
            const abortController = new AbortController();
            if (chosenGame)
            {
                const signal = abortController.signal;
                setChosenStreamer(null)
                setLoadingStreams(true)
                const getStreamersFromTwitchAPI=async ()=>{
                    try{
                    const {data}=await axios.get(`http://localhost:5000/twitchApi/getAllStreamsFromTwitchAPI/${chosenGame.id}`,{signal})
                    setStreamers(data.streamers)
                    setLoadingStreams(false)
                    }
                    catch(error)
                    {
                        if (!axios.isCancel(error))
                        {
                            setError(error.message)
                            navigate('/Error')
                        }
                    }
                }
                getStreamersFromTwitchAPI();
            }
            return ()=>{abortController.abort()}

    

    },[chosenGame,navigate,setError])

    useEffect(()=>{
        const abortController=new AbortController();
        const gettingAllOptions=async ()=>{
            try
            {
                const signal = abortController.signal;
                const {data}=await axios.get('http://localhost:5000/twitchApi/getExistGames',{signal})
                const existGames=data.games
                if (existGames.length===0)
                {
                    const {data}=await axios.get('http://localhost:5000/twitchApi/getAllGamesFromTwitchAPI',{signal})
                    setAllGames(data.games);
                }
                else
                {
                    setAllGames(existGames)
                }
            }
            catch(error){
                if (!axios.isCancel(error))
                {
                    setError(error.message)
                    navigate('/Error')
                }
            }
        }
        gettingAllOptions();
        return ()=>{abortController.abort()}
        
        
    },[refresh,navigate,setError])
    const refreshOnClick=async ()=>{
        setAllGames([])
        setChosenGame(null)
        setChosenStreamer(null)
        setLoadingStreams(true)
        await axios.post('http://localhost:5000/twitchApi/updateGames',{games:[]})
        setRefresh(prev=>prev+1)

    }

        return(
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f5f5f5' // Off-white color
            
            }}>
                <Container maxWidth="md"  sx={{
                backgroundColor: '#e6f7ff', 
                padding: '2vh 2vw',
                borderRadius: '1vw', 
                boxShadow: '0 0.4vw 0.8vw rgba(0, 0, 0, 0.1)', 
                height: '50vh',
                width:'700px', 
                position: 'relative',
                maxWidth:'1200px',
                overflow:'auto'
              }}>
                <Title beforeSpan="Twitch" afterSpan="API"/>
                <RefreshButton onClick={refreshOnClick}/>
                {allGames.length ? 
                    <SelectGame 
                        allGames={allGames} 
                        chosenGame={chosenGame} 
                        setChosenGame={setChosenGame}/> 
                    : <LoadingMessage message="Loading Games..." />
                }
                {!loadingStreams ? 
                    <SelectStream 
                        streamers={streamers} 
                        chosenStreamer={chosenStreamer} 
                        setChosenStreamer={setChosenStreamer}/> 
                    : chosenGame && <LoadingMessage message="Loading Streams"/>
                }
                {chosenStreamer && <Button
                    sx={{
                        position: 'absolute',
                        marginTop:'25px',
                        marginLeft:'80px'   
                    }} 
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/chooseStreamer/${chosenStreamer.name}`)}
                >
                    Submit
                </Button>}
            </Container>
            </div>

    )
}
