import { Autocomplete} from "@mui/material"
import TextField from '@mui/material/TextField';


export default function SelectGame({allGames,chosenGame,setChosenGame})
{
    return (
        <>
            <Autocomplete
                options={allGames}
                renderInput={(params)=>{
                    return <TextField
                        {...params}
                        label="choose game"
                        InputProps={{
                            ...params.InputProps,
                            style: { fontWeight: 'bold',color:'green' },
                          }}
                    
                    />
                }}
                sx={{ 
                    width: 300 ,
                    marginBottom:'50px', 
                    display:"flex",
                    
                }}
                getOptionLabel={(option)=>option.name}
                renderOption={(params,options)=>
                <li {...params}                    
                >{options.name}</li>}

                
                value={chosenGame}
                onChange={(e,newValue)=>setChosenGame(newValue)}
                getOptionKey={(options)=>options.id}
            />
        </>
    )
}



