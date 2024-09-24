import { useNavigate, useParams } from "react-router-dom"
import { Autocomplete, Button} from "@mui/material";
import { useState,useEffect } from "react";
import { getVideos } from "../gettingData";
import TextField from '@mui/material/TextField';
import {Container} from "@mui/material";
import Title from "./Title";
import LoadingMessage from "./LoadingMessage";



export default function ChooseVideo({setError})
{
    const {name}=useParams();
    const navigate=useNavigate();
    const [videos,setVideos]=useState([])
    const [chosenVideo,setChosenVideo]=useState(null)
    const [loadingVideos,setLoadingVideos]=useState(true)

    useEffect(() => {
        const asyncGetVideos = async () => {
            try {
                const videos = await getVideos(name);
                setVideos(videos);
                setLoadingVideos(false);
            } catch (error) {
                setError(error.message);
                navigate('/Error');
            }
        };
    
        asyncGetVideos();
    }, [navigate,setError,name]);
    


    return (
        <>
            <Container maxWidth="md"  sx={{
                backgroundColor: '#e6f7ff', 
                padding: '20px',
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                height: '400px',
                marginTop:'80px',
                marginLeft:'300px',
                position:"absolute",
              }}>
                <Title beforeSpan="Video " afterSpan="Selector"/>
                {(loadingVideos)?
                <LoadingMessage  top={100} message="Loading Videos" />
                :
                <Autocomplete
                    options={videos}
                    renderInput={(params)=>{
                        return <TextField
                            {...params}
                            label="choose video"
                            InputProps={{
                                ...params.InputProps,
                                sx: { fontWeight: 'bold',color:'green' },
                            }}
                        
                        />
                    }}
                    sx={{ width: 300,marginTop:'50px',marginBottom:'50px' }}
                    getOptionLabel={(option)=>option.title}
                    renderOption={(params,options)=><li {...params}>{options.title}</li>}
                    value={chosenVideo}
                    onChange={(e,newValue)=>setChosenVideo(newValue)}
                    getOptionKey={(options)=>options.id}
            />}
            
            {chosenVideo&& <Button variant="contained" color="success" onClick={()=>navigate(`./${chosenVideo.id}`)}>submit</Button>}

            </Container>

        </>
    )
}