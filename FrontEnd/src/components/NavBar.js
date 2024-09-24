import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate,useParams } from "react-router-dom";


export default function NavBar()
{
    const navigate=useNavigate();
    const {name}=useParams();
   return(
    <>
        <AppBar>
            <Toolbar>
                <Typography onClick={()=>navigate('/')} sx={{cursor:'pointer'}}>HOME</Typography>
                <Typography onClick={()=>navigate(`/chooseStreamer/${name}/stream`)}sx={{marginLeft:'50px', cursor:'pointer'}}>STREAM</Typography>
                <Typography onClick={()=>navigate(`/chooseStreamer/${name}/chooseClip`)}sx={{marginLeft:'50px', cursor:'pointer'}}>CLIPS</Typography>
                <Typography onClick={()=>navigate(`/ChooseStreamer/${name}/chooseVideo`)}sx={{marginLeft:'50px', cursor:'pointer'}}>VIDEOS</Typography>
                <Typography onClick={()=>navigate(`/chooseStreamer/${name}`)} variant="h6" sx={{marginLeft:'20%', cursor:'pointer'}}>{name}</Typography>
            </Toolbar>
        </AppBar>
        <Outlet/>
    </>
   )
}