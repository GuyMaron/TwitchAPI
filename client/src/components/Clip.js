import { useParams } from "react-router-dom";
import { TwitchClip } from "react-twitch-embed";



export default function Clip()
{
    const {clipID}=useParams();
    return(
        <>
            <TwitchClip clip={clipID} style={{marginTop:'100px',marginLeft:'15%'}}/>
        </>
    )
}