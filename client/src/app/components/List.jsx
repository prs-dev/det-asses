import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function AlignItemsList({ comments }) {
    return (
        <List sx={{ width: '100%', maxWidth: {sm: 360, lg: 720}, bgcolor: 'background.paper' }}>
            {comments.map(item => (
                <>
                    <ListItem key={item.id} alignItems="flex-start">
                        <ListItemText
                            primary={item.comment}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'flex', fontWeight: 800 }}
                                    >
                                        - {item.username}
                                    </Typography>
                                    {`Posted on: ${new Date(item.timestamp).toLocaleDateString()} @ ${new Date(item.timestamp).toLocaleTimeString()}`}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                </>
            ))}
        </List>
    );
}