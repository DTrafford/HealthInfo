import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./DiscussionBoard.css";
import PaperSheet from "../../components/UI/Paper";
import { connect } from "react-redux";
import UserStore from "../../store/user/UserStore";
import Jimp from "jimp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class CreatePost extends Component {
  state = {
    title: "",
    content: "",
    image: null,
    creatorId: "",
    creatorName: this.props.firstName + " " + this.props.lastName,
    imagePath: null,
    replies: []
  };

  onTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  onContentChange = event => {
    this.setState({
      content: event.target.value
    });
  };

  onImageChange = event => {
    event.persist();
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        var imageBlob = new Blob([event.target.files[0]], {
          type: event.target.files[0].type
        });
        var src = URL.createObjectURL(imageBlob);
        Jimp.read(src, (err, image) => {
          return image.resize(256, 256).quality(60);
        });
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  onImageChange2 = () => {
    this.inputElement.click();
  };

  onSubmit = () => {
    const newPost = {
      title: this.state.title,
      content: this.state.content,
      image: this.state.image,
      userId: this.props.user.userId,
      creatorName: this.props.user.firstName + " " + this.props.user.lastName,
      replies: []
    };
    this.props.createPost(newPost, this.props.user);
  };

  render() {
    const { classes } = this.props;
    return (
      <PaperSheet>
        <div>
          <h1 className="addTipTitle">Create New Post</h1>
          <hr />
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            enctype="multipart/form-data"
          >
            <TextField
              id="outlined-title-input"
              label="Title"
              className={classes.textField}
              type="text"
              name="title"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => this.onTitleChange(e)}
            />
            <TextField
              id="outlined-content-flexible"
              label="Post Message"
              multiline
              rowsMax="6"
              onChange={e => this.onContentChange(e)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            {this.state.image ? (
              <div>
                <img
                  src={this.state.image}
                  alt="for health tip post"
                  className="tip_Image"
                />
              </div>
            ) : null}
            <label for="image_picker" className="imagePicker_Button">
              <span className="imagePicker_Text">SELECT IMAGE</span>
            </label>
            <input
              ref={input => (this.inputElement = input)}
              type="file"
              onChange={e => this.onImageChange(e)}
              className="filetype"
              id="image_picker"
            />
            <button onClick={this.onSubmit} type="button" class="submitButton">
              SUBMIT
            </button>
          </form>
        </div>
      </PaperSheet>
    );
  }
}

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: (post, user) => {
      dispatch(UserStore.createPost(post, user));
    },
    getPosts: () => {
      dispatch(UserStore.getPosts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreatePost));
