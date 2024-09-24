import { Autocomplete} from "@mui/material"
import TextField from '@mui/material/TextField';



export default function SelectStreamer({streamers,chosenStreamer,setChosenStreamer})
{
    return (
        <>
            <Autocomplete
                    options={streamers}
                    renderInput={(params)=>{
                        return <TextField
                            {...params}
                            label="choose streamer"
                            InputProps={{
                                ...params.InputProps,
                                style: { fontWeight: 'bold',color:'green' },
                              }}
                                           
                        />
                    }}
                    sx={{ width: 300 }}
                    getOptionLabel={(option)=>option.name}
                    renderOption={(params,options)=><li {...params} key={options.name}>
                        <img src={options.imageUrl} alt={options.name}   style={{ marginRight: 8, width: 32, height: 32, borderRadius: '50%' }}/>
                        {options.name}
                        </li>}
                    value={chosenStreamer}
                    onChange={(e,newValue)=>setChosenStreamer(newValue)}

                />
        
        
        </>
    )
}