import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import dictionary_data from '../Hash_dictionary/E2Bdataset.json'

function Suggestion() {
     const file = Object.keys(dictionary_data).filter(item => {
        const probability = Math.floor(Math.random() * 1000) + 1
        return probability === 69
    })
    return (
        <Container>
            <Typography style={{color: "grey"}} variant="h6">Suggestion</Typography> <br/>
            <Typography style={{color: "grey"}} align='justify'>
                {file.join(', ')}
            </Typography>
        </Container>
    )
}

export default Suggestion;