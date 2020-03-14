import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import "./Tips.css";
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

class AddTip extends Component {
  state = {
    title: "",
    url: "",
    content: "",
    image: null,
    creatorId: ""
  };

  componentDidMount = () => {
  };

  onTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  onUrlChange = event => {
    this.setState({
      url: event.target.value
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
    // this.setState({ image: event.target.files[0] });
    // this.props.updateImage(event.target.files[0]);
  };
  onImageChange2 = () => {
    this.inputElement.click();
  };

  onSubmit = () => {
    const healthTip = {
      title: this.state.title,
      url: this.state.url,
      content: this.state.content,
      image: this.state.image,
      creatorId: this.props.user.userId
    };

    this.props.createTip(healthTip);
  };

  render() {
    const { classes } = this.props;
    return (
      <PaperSheet>
        <div>
          <h1 className='addTipTitle'>Add A New Health Tip</h1>
          <hr />
          <form
            className={classes.container}
            noValidate
            autoComplete='off'
            enctype='multipart/form-data'>
            <TextField
              id='outlined-title-input'
              label='Title'
              className={classes.textField}
              type='text'
              name='title'
              margin='normal'
              variant='outlined'
              fullWidth
              onChange={e => this.onTitleChange(e)}
            />
            <TextField
              id='outlined-url-input'
              label='URL'
              className={classes.textField}
              type='text'
              name='url'
              margin='normal'
              variant='outlined'
              fullWidth
              onChange={e => this.onUrlChange(e)}
            />
            <TextField
              id='outlined-content-flexible'
              label='Content'
              multiline
              rowsMax='6'
              //   value={this.state.multiline}
              onChange={e => this.onContentChange(e)}
              className={classes.textField}
              margin='normal'
              variant='outlined'
              fullWidth
            />
            {/* {this.state.image ? (
              <div>
                <img
                  src={this.state.image}
                  alt='for health tip post'
                  className='tip_Image'
                />
              </div>
            ) : null}
            <label for='image_picker' className='imagePicker_Button'>
              <span className='imagePicker_Text'>SELECT IMAGE</span>
            </label>
            <input
              ref={input => (this.inputElement = input)}
              type='file'
              onChange={e => this.onImageChange(e)}
              // onChange={this.onImageChange.bind(this)}
              className='filetype'
              id='image_picker'
            /> */}
            <button onClick={this.onSubmit} type='button' class='submitButton'>
              SUBMIT
            </button>
          </form>
        </div>
      </PaperSheet>
    );
  }
}

AddTip.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTip: tip => {
      dispatch(UserStore.createTip(tip));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddTip));
