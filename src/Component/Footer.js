import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    return (
        <AppBar style={{height: '100px', marginTop: '100px', bottom: 0, padding: '10px 10px'}} position='relative' color="primary">
            <Typography align="center"> Rahat Hossain | CSE-3203 Assignment | Perfect Hashing | <a href="https://github.com/rahathossain690/Hash-Dictionary" style={{color: 'white'}} target="_blank">github</a> </Typography>
        </AppBar>
    )
}