import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import IconButton from '@mui/material/IconButton';

export default function RefreshButton({ onClick }) {
    return (
        <IconButton 
            color="primary" 
            sx={{
                position: 'absolute',  
                top: '5%',             
                right: '5%',           
                backgroundColor: "azure"
            }} 
            onClick={onClick}
        >
            <RefreshSharpIcon fontSize="large" />
        </IconButton>
    );
}
