import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import Uploadimg from './../../uploadimg/Uploadimg.jsx';

import './UploadScreen.scss';

class UploadScreen extends Component {
  render() {
    return (
      <Screen>
        <Tile
          style={{
            gridRow: '3/9',
            gridColumn: '1/3',
            justifyContent: 'center'
          }}
        >
          <div className="upload-container">
            <Uploadimg />
          </div>
          <hr className="divider" />
          <p className="tile-note">
            Disclaimer: User photo upload is a work in progress functionality
            and will not function with the same accuracy as the dedicated
            incubator operation
          </p>
        </Tile>
        {/* Metadata */}
        <Tile style={{ gridRow: '3/9', gridColumn: '3/4' }}>
          <h1 className="tile-heading">Metadata:</h1>
          <FormInput>Title</FormInput>
          <FormInput>Location</FormInput>
          <FormInput isMultiLine rows="6">
            Description
          </FormInput>
        </Tile>
      </Screen>
    );
  }
}

export default UploadScreen;
