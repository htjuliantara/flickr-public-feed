import React, { Component } from 'react';
import Posts from './components/Posts';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      meta: {
        total: 20,
        page: 1
      },
      tags: '',
      loading: false
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
    this.setState({ loading: true });
    axios.get(`http://localhost:8000/photos?tags=${tag}`)
      .then(res => {
        const posts = res.data.items;
        const meta = res.data.meta;
        this.setState({ posts });
        this.setState({ meta });
        this.setState({ loading: false });
      });
  }

  handlePagination(event, value) {
    event.preventDefault();
    const tag = this.state.tags
    const page = value
    this.setState({ loading: true });
    axios.get(`http://localhost:8000/photos?tags=${tag}&page=${page}`)
      .then(res => {
        const posts = res.data.items;
        const meta = res.data.meta;
        this.setState({ posts });
        this.setState({ meta });
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`http://localhost:8000/photos`)
      .then(res => {
        const posts = res.data.items;
        const meta = res.data.meta;
        this.setState({ posts });
        this.setState({ meta });
        this.setState({ loading: false });
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
          <Posts posts={this.state.posts} loading={this.state.loading} />
          <Pagination 
              count={20} 
              color="secondary"
              style={{margin: 10}}
              page={this.state.meta.page} 
              onChange={this.handlePagination}
              hideNextButton={true}
              hidePrevButton={true}
            />
        </Container>
      </React.Fragment>
    );
  }
}
