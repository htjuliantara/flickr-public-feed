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
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      meta: {
        total: 20,
        page: 1
      },
      tags: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePagination= this.handlePagination.bind(this);
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const tag = this.state.tags
    axios.get(`http://localhost:8000/photos?tags=${tag}`)
      .then(res => {
        const photos = res.data.items;
        const meta = res.data.meta;
        this.setState({ photos });
        this.setState({ meta });
      });
  }

  handlePagination(event, value) {
    event.preventDefault();
    const tag = this.state.tags
    const page = value
    axios.get(`http://localhost:8000/photos?tags=${tag}&page=${page}`)
      .then(res => {
        const photos = res.data.items;
        const meta = res.data.meta;
        this.setState({ photos });
        this.setState({ meta });
      });
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
            <form onSubmit={this.handleSubmit}>
              <InputBase
                style={{
                  marginLeft: 15,
                  width: '80%'
                }}
                placeholder="Search Tags Flickr"
                inputProps={{ 'aria-label': 'search tags flickr' }}
                value={this.state.tags} 
                onChange={this.handleChange}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
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
                  count={20} 
                  variant="outlined" 
                  shape="rounded" 
                  style={{margin: 10}}
                  page={this.state.meta.page} 
                  onChange={this.handlePagination}
                  hideNextButton={true}
                  hidePrevButton={true}
                />
              </div>
            </Card>);
          })}
          
        </Container>
      </React.Fragment>
    );
  }
}
