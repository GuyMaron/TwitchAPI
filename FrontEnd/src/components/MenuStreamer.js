import { useNavigate} from "react-router-dom"
import {Button} from "@mui/material"


export default function MenuStreamer()
{

    const navigate=useNavigate();
    return (
        <>
            <Button
                variant="contained"
                sx={{'width':'300px','left':'600px','marginTop':'100px','display':'block'}}
                onClick={()=>navigate('./stream')}
            
            
            >Stream</Button>
             <Button
                variant="contained"
                sx={{'width':'300px','left':'600px','marginTop':'50px','display':'block'}}
                onClick={()=>navigate('./chooseClip')}
            
            
            >Clips</Button>
            <Button
                variant="contained"
                sx={{'width':'300px','left':'600px','marginTop':'50px',}}
                onClick={()=>navigate('./chooseVideo')}
            
            >Videos</Button>
        </>
    )
}