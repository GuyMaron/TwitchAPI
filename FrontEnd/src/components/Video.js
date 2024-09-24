import { useParams } from "react-router-dom";
import {TwitchEmbed} from "react-twitch-embed";



export default function Video()
{
    const {videoID}=useParams();
    console.log(videoID)
    return(
        <div style={{alignItems:'center',display:"flex",justifyContent:"center",height:'100vh'}}>
            <TwitchEmbed video={videoID}/>
        </div>
    )
}