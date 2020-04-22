import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

export default class Search extends React.Component {
  render() {
    return (
      <Paper component="form" square={true}>
        <InputBase
            style={{
            marginLeft: 15,
            width: "80%"
            }}
            placeholder="Search Tags Flickr"
            inputProps={{ "aria-label": "search tags flickr" }}
            value={this.props.tags} 
            onChange={this.props.typing}
        />
        <IconButton type="submit" aria-label="search" onClick={this.props.submit}>
            <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}
