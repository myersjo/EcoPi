import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

class Uploadimg extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  render() {
    return (
      <div className="asbar">
        <ImageUploader
          buttonText="Select"
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </div>
    );
  }
}

export default Uploadimg;
