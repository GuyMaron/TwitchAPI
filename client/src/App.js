
import React, { useState} from 'react';
import { Route,Routes} from 'react-router-dom';
import ChooseStreamer from './components/ChooseStreamer';
import MenuStreamer from './components/MenuStreamer';
import Stream from './components/Stream';
import NavBar from './components/NavBar';
import ChooseClip from './components/ChooseClip';
import Clip from './components/Clip';
import ChooseVideo from './components/ChooseVideo';
import Video from './components/Video';
import Error from './components/Error';

export default function App()
{
  const [error,setError]=useState(null)


  return(
    <>
      <Routes>
          <Route path="/" element={<ChooseStreamer setError={setError}/>}/>
          <Route path="/chooseStreamer/:name" element={<NavBar/>}>
            <Route index element={<MenuStreamer/>}/>
            <Route path="stream" element={<Stream/>}/>
            <Route path="chooseClip" element={<ChooseClip setError={setError}/>}/>
            <Route path="chooseVideo" element={<ChooseVideo setError={setError}/>}/>
            <Route path="chooseClip/:clipID" element={<Clip/>}/>
            <Route path="chooseVideo/:videoID" element={<Video/>}/>
          </Route>
          <Route path="/Error" element={<Error setError={setError} errorMessage={error}/>}/>
      </Routes>
    
    </>

  )
}