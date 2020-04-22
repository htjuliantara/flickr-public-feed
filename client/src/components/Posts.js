import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import { red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return (
      <CircularProgress color="secondary" />
    );
  }

  return (
    <div>
    { posts.map((photo, index) => {
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
            
          </div>
        </Card>);
      })}
      </div>
  );
};

export default Posts;