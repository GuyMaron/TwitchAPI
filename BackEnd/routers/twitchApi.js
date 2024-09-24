const express=require('express')
let games=require('../Data/games.js')
require('dotenv').config('../.env')
const router=express.Router()
const axios=require('axios');

const twitchAPI=axios.create({
    headers:{
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': process.env.AUTHORIZATION
    }
})

router.get('/getAllStreamsByCursor/:gameID',async (req,res,next)=>{
    try
    {
        const {data}=await twitchAPI.get('https://api.twitch.tv/helix/streams',{params: {game_id:req.params.gameID,first:100,after:req.query.cursor}})
        const usersId=data.data.map(stream=>stream.user_id)
        if (usersId.length===0)
        {
            return res.status(200).json({streamers:[],cursor:null})
        }
        const usersResponse=await twitchAPI.get('https://api.twitch.tv/helix/users',{params:{id:usersId}})
        const fullStreamers=data.data.map((stream)=>{
            const id=stream.user_id
            const name=stream.user_login
            const imageUrl=usersResponse.data.data.find(user=>user.id===id).profile_image_url
            return {id,name,imageUrl}
        })

        res.status(200).json({streamers:fullStreamers,cursor:data.pagination.cursor});
    }
    catch (error)
    {
        next(error)
    }
})
router.get('/getAllStreamsFromTwitchAPI/:gameID',async(req,res,next)=>{
    try{

        let cursor=null;
        let streamers=[]
        const gameID=req.params.gameID
        do{
            const {data}=await axios.get(`http://localhost:5000/twitchApi/getAllStreamsByCursor/${gameID}`,{params:{cursor}})
            const newStreamers=data.streamers.filter(newStreamer=>!streamers.some(oldStreamer=>oldStreamer.name===newStreamer.name))
            streamers=[...streamers,...newStreamers];
            cursor=data.cursor;

        }
        while(cursor)
        res.status(200).json({streamers,'status':'success'})
    }
    catch(error)
    {
        next(error)
    } 
})

router.get('/getGamesByCursor',async(req,res,next)=>{
    try{
        const {data}=await twitchAPI.get('https://api.twitch.tv/helix/games/top',{params:{first:100,after:req.query.cursor}})
        const games=data.data.map(game=>({id: game.id, name:game.name}))
        res.status(200).json({'games':games, cursor:data.pagination.cursor})
    }
    catch (error)
    {
        next(error)
    }
})

router.get('/getAllGamesFromTwitchAPI',async(req,res,next)=>{
    try{
        let cursor=null;
        let allGames=[]
        do{
            const {data}=await axios.get('http://localhost:5000/twitchApi/getGamesByCursor',{params:{cursor}})
            const newGames=data.games.filter(newGame=>!allGames.some(oldGame=>oldGame.name===newGame.name))
            allGames=[...allGames,...newGames];
            cursor=data.cursor;

        }
        while(cursor)
        games=allGames
        res.status(200).json({games,status:"success"})
    }
    catch(error)
    {
        next(error)
    }
})

router.get('/getAllClips/:name', async (req,res,next)=>{
    try{
        const responseUser=await twitchAPI.get('https://api.twitch.tv/helix/users',{params:{login:req.params.name}})
        const id=responseUser.data.data[0].id;
        const {data}=await twitchAPI.get('https://api.twitch.tv/helix/clips',{params:{'broadcaster_id':id,first:100,after:req.query.cursor,'started_at':req.query.previousSunday,'ended_at':req.query.today}})
        const clips=data.data.map(clip=>({title:clip.title,id:clip.id,date:clip.created_at,view_count:clip.view_count}));
        res.status(200).json({clips:clips,cursor:data.pagination.cursor});
    }
    catch (error){
        next(error)
    }
})

router.get('/getVideos/:name',async(req,res,next)=>{
    try{
        const responseUser=await twitchAPI.get('https://api.twitch.tv/helix/users',{params:{login:req.params.name}})
        const id=responseUser.data.data[0].id;
        const {data}=await twitchAPI.get('https://api.twitch.tv/helix/videos',{params:{'user_id':id,first:100}})
        const videos=data.data.map(video=>({title:video.title,id:video.id}));
        res.status(200).json({videos:videos});
    }
    catch (error){
        next(error)
    }
})

router.get('/getExistGames',(req,res,next)=>{

    try{
        res.status(200).json({games})
    }
    catch(error)
    {
        next(error)
    }
})

router.post('/updateGames',(req,res,next)=>{
    try{
        games=req.body.games
        res.status(200).json({status: 'success'})
    }
    catch (error)
    {
        next(error)
    }
})


module.exports=router;