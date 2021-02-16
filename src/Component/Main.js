
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {useState, useEffect} from 'react'

import Hash_dictionary from '../Hash_dictionary/Hash_dictionary'
import dataset from '../Hash_dictionary/E2Bdataset.json'

const hash_dictionary = new Hash_dictionary(dataset)

export default function Main() {

    const [bn, setBn] = useState("")
    const [en, setEn] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [stat, setStat] = useState({time: null, word: null, finished: false})

    // const process_starter = useMemo( () => {
    //     hash_dictionary.start_process().then((res) => {
    //         setLoading(false)
    //     })
    // }, [])
    

    useEffect(() => {
        hash_dictionary.start_process().then((res) => {
            setStat({
                time: res.time,
                word: res.store,
                finished: true
            })
            setLoading(false)
        })
    }, [])

    const handleClick = () => {
        const output = hash_dictionary.search(en.toLocaleLowerCase());
        if(output) {
            setBn(output)
            setError("")
        }
        else {
            setBn("")
            setError("Word not found. You can use words from suggestion list.")
        }
    }

    const inputEn = (str) => {
        setBn("")
        setError("")
        setEn(str.trim())
    }

    return (
        <div style={{height: '500px'}}>
            <Typography variant="h5" align="center" style={{padding: '10px 10px'}}>English to Bangla dictionary implementing Perfect Hashing</Typography>
        { stat.finished && 
            <Typography style={{color: 'grey', textAlign: 'center', padding: '20px 20px', fontSize: '12px'}} variant="h6" align="center"> {stat.word} words processed on {stat.time} miliseconds </Typography>
        }
        <Container style={{ padding: '100px 100px', align: 'center'}} align="center">
            {loading && 
                <div>
                    <Typography variant="caption">You have a sip of your tea, meanwhile I hash the data for you.</Typography>
                    <CircularProgress color="secondary" />
                </div>

            }
            {!loading &&
                <div><TextField id="standard-basic" placeholder="English" onChange={e => inputEn(e.target.value)}></TextField>
                <br/>
                <Button color="primary" onClick={handleClick} style={{width: '100px'}}>Find Word</Button>
                <br/><br/><br/>
                { bn && 
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>English</TableCell>
                          <TableCell>Bangla</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <TableRow>
                            <TableCell >{en}</TableCell>
                            <TableCell >{bn}</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                }

                { error && 
                    <Paper elevation={3} style={{backgroundColor: 'red', padding: '10px 10px'}}>
                        <Typography style={{color: 'white'}}>{error}</Typography>
                    </Paper>
                }
                
                
                </div>
            }
        </Container>
        </div>
    )
}

{}