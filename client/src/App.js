import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import moment from 'moment'
import { red } from '@material-ui/core/colors';

export default class App extends Component{
  state = {
    photos: [],
    meta: {}
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/photos`)
      .then(res => {
        const photos = res.data.items;
        const meta = res.data.meta;
        this.setState({ photos });
        this.setState({ meta });
      })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xs">
          <Paper component="form" square={true}>
            <InputBase
              style={{
                marginLeft: 15,
                width: '80%'
              }}
              placeholder="Search Tags Flickr"
              inputProps={{ 'aria-label': 'search tags flickr' }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          { this.state.photos.map((photo, index) => {
            return (<Card square={true} key={index}>
              <CardHeader
                avatar={
                  <Avatar 
                    aria-label="recipe"
                    style={{ backgroundColor: red[500] }}>
                    HJ
                  </Avatar>
                }
                title={photo.author}
                subheader={moment(photo.published).format('MMMM, D YYYY')}
              />
              <CardMedia
                 style = {{ height: 0, paddingTop: '56%'}}
                image={photo.media.m}
              />
              <div>
                <Pagination 
                  count={6} 
                  variant="outlined" 
                  shape="rounded" 
                  style={{margin: 10}}
                />
              </div>
            </Card>);
          })}
          
        </Container>
      </React.Fragment>
    );
  }
}
