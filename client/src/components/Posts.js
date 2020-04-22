import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment"
import { red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from '@material-ui/core/Typography';

export default class Posts extends React.Component {
  render () {
    if (this.props.loading) {
      return (
        <div>
          <CircularProgress color="secondary" style={{ marginLeft: "45%", marginTop: 20 }}/>
        </div>
      );
    }

    if (this.props.posts.length === 0) {
      return (
        <Typography variant="overline" display="block" gutterBottom>
          Post not found!
        </Typography>
      );
    }
  
    return (
      <div>
      { this.props.posts.map((photo, index) => {
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
              subheader={moment(photo.published).format("MMMM, D YYYY")}
            />
            <CardMedia
              style = {{ height: 0, paddingTop: "56%"}}
              image={photo.media.m}
            />
            <div>
              
            </div>
          </Card>);
        })}
        </div>
    );
  }
}
