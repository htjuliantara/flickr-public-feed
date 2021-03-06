import React from "react";
import Posts from "./components/Posts";
import Search from "./components/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      meta: {
        total: 20,
        page: 1
      },
      tags: "",
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
    const tags = this.state.tags
    this.fetchPosts(1, tags)
  }

  handlePagination(event, value) {
    event.preventDefault();
    const page = value
    const tags = this.state.tags
    this.fetchPosts(page, tags)
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts(page = 1, tags = "") {
    this.setState({ loading: true });
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/photos?tags=${tags}&page=${page}`)
      .then(res => {
        const posts = res.data.items;
        const meta = res.data.meta;
        this.setState({ posts });
        this.setState({ meta });
        this.setState({ loading: false });
      })
      .catch((err) => {
        if(!err.response) {
          alert("Something error");
        }
        this.setState({ posts: [] });
        this.setState({ tags: '' });
        this.setState({ meta: { total: 1, page: 1} });
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xs">
          <Search tags={this.state.tags} typing={this.handleChange} submit={this.handleSubmit}/>
          <Posts posts={this.state.posts} loading={this.state.loading} />
          <Pagination 
              count={this.state.meta.total} 
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
