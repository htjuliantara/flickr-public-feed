import React from 'react';
import Posts from './components/Posts';
import Search from './components/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

export default class App extends React.Component{
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
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const tag = this.state.tags
    this.fetchPosts(1, tag)
  }

  handlePagination(event, value) {
    event.preventDefault();
    const page = value
    const tag = this.state.tags
    this.fetchPosts(page, tag)
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts(page = 1, tag = '') {
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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xs">
          <Search tag={this.state.tags} typing={this.handleChange} submit={this.handleSubmit}/>
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
