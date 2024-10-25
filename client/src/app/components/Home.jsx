'use client';
import React, { useState, useEffect } from 'react'
import { Container, Stack, TextField, Divider } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from './List'
import PersonIcon from '@mui/icons-material/Person';
import Blinker from './Blinker'
import io from 'socket.io-client'; 
import axios from 'axios'

const Home = () => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('');
    const [navUser, setNavUser] = useState('')
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const url = 'http://localhost:5000'
    const socket = io(url);
    
    useEffect(() => {
        fetchComments();
        socket.on('updateComments', (newComment) => {
            setComments((prevComments) => [newComment, ...prevComments]);
        });
        return () => {
            socket.off('updateComments');
        };
    }, []);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${url}/api/comments`);
            setComments(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    const postComment = async () => {
        try {
            await axios.post(`${url}/api/comments`, 
            { username, comment });
            setComment('');
        } catch (error) {
            console.log(error)
        }
    };
    const handleLogin = async () => {
        try {
            const res = await axios.post(`${url}/api/login`)
            if (res.data.sessionId) {
                setNavUser(username)
                setShow(true)
            }
            console.log(username)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            S
                        </IconButton>
                        <Typography variant="h6" component="div" display={{xs: "none", sm: "block"}} sx={{ flexGrow: 1 }}>
                            Simple Comments
                        </Typography>
                        <Stack display={{xs: "none", sm: "flex"}} direction="row" alignItems="center" spacing={2}>
                            <PersonIcon />
                            <Typography>{navUser}</Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <Stack padding={2} direction={{xs: "column",sm: "row", md: "row"}} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                    {!show ? <Stack spacing={2} flex={1}>
                        <TextField onChange={e => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                        <Button onClick={handleLogin} variant='contained'>Login</Button>
                    </Stack> :
                        <Stack flex={1} spacing={2}>
                            <textarea
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                style={{
                                    padding: "10px"
                                }}
                            />
                            <Button onClick={postComment} variant='contained'>Post Comment</Button>
                        </Stack>}
                    <Stack flex={2}>
                        <Stack direction="row" justifyContent="space-evenly">
                        <Typography variant='h4' fontSize={{xs: "1.4rem", md: "2rem"}} fontWeight={700}>Comments</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Blinker />
                            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>Live</Typography>
                        </Stack>
                        </Stack>
                        <List comments={comments} />
                        
                    </Stack>

                </Stack>
            </Container>
        </div>
    )
}

export default Home