import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  input: {
    marginLeft: theme.spacing(1),
    width: '80%'
  },
  pagination: {
    margin: theme.spacing(1.5)
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed maxWidth="xs">
        <Paper component="form" square={true}>
          <InputBase
            className={classes.input}
            placeholder="Search Tags Flickr"
            inputProps={{ 'aria-label': 'search tags flickr' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Card square={true}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                HJ
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image="https://live.staticflickr.com/65535/49801121143_7b59f7b17f_m.jpg"
            title="Paella dish"
          />
          <div className={classes.pagination}>
            <Pagination count={6} variant="outlined" shape="rounded" />
          </div>
        </Card>
        
      </Container>
    </React.Fragment>
  );
}
