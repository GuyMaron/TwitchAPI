import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAllClips } from "../gettingData";
import { Autocomplete, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Container } from "@mui/material";
import Title from "./Title";
import LoadingMessage from "./LoadingMessage";


export default function ChooseClip({setError})
{
    const {name}=useParams()
    const navigate=useNavigate()
    const [chosenClip,setChosenClip]=useState(null)
    const [clips,setClips]=useState([])
    const [loadingClips,setLoaidngClips]=useState(true)

    useEffect(() => {
        const gettingClips = async () => {
            try {
                const allClips = await getAllClips(name);
                setClips(allClips);
                setLoaidngClips(false);
            } catch (error) {
                setError(error.message);
                navigate('/Error');
            }
        };
        
        gettingClips();
    }, [name, navigate, setError]);

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
                
                <Title beforeSpan="Clip " afterSpan="Selector"/>
                {loadingClips?
                <LoadingMessage  top={100} message="Loading Clips" />
                :
                <Autocomplete
                    options={clips}
                    renderInput={(params)=>{
                        return <TextField
                            {...params}
                            label="choose clip"
                            InputProps={{
                                ...params.InputProps,
                                sx: { fontWeight: 'bold',color:'green' },
                              }}
                        
                        />
                    }}
                    
                    sx={{ width: 300,marginTop:'50px',marginBottom:'50px' }}
                    getOptionLabel={(option)=>option.title}
                    renderOption={(params,options)=><li {...params}>{options.title}</li>}
                    value={chosenClip}
                    onChange={(e,newValue)=>setChosenClip(newValue)}
                    getOptionKey={(options)=>options.id}
                />}
                {chosenClip && <Button variant="contained" color="success" onClick={()=>navigate(`./${chosenClip.id}`)}>submit</Button>}

            </Container>
        </>
    )
}