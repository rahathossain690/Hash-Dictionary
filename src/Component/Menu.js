import {AppBar, Typography} from '@material-ui/core';

function Menu(){
    return (
        <AppBar position='relative'>
            <Typography variant="h2" align="center" style={{padding: '20px 20px'}}>
                Hash Dictionary
            </Typography>
        </AppBar>
    )
}

export default Menu;