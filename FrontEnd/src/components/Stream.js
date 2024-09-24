import { useParams } from "react-router-dom";
import { TwitchEmbed } from "react-twitch-embed";


export default function Stream()
{
    const {name}=useParams();
    return (
            <div style={{alignItems:'center',display:"flex",justifyContent:"center",height:'100vh'}}>
                <TwitchEmbed  channel={name}/>
            </div>
    )
}