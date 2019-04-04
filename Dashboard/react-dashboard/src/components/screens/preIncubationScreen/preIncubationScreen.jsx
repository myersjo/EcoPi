import React, { Component } from 'react';
import Screen from '../../screen/Screen.jsx';
import Tile from '../../tile/Tile';
import FormInput from './../../formInput/FormInput.jsx';
import StyledButton from './../../styledButton/StyledButton.jsx';
import StyledSwitch from './../../styledSwitch/StyledSwitch.jsx';
import StyledStepper from './../../styledStepper/StyledStepper.jsx';

class PreIncubationScreen extends Component {
  render() {
    return (
      <Screen>
        <Tile
          style={{
            gridRow: '3/9',
            gridColumn: '1/3'
          }}
        >
          <h1 className="tile-heading">Incubation setup:</h1>
          <div className="flex-row" style={{ justifyContent: 'flex-start' }}>
            <p className="tile-label">Incubation Length:</p>
            <StyledStepper
              width="50%"
              min={5}
              max={20}
              step={0.5}
              initial={8}
              unit="hours"
            />
          </div>
          <hr className="divider" />
          <div className="flex-row" style={{ justifyContent: 'flex-start' }}>
            <p className="tile-label">Record Photos:</p>
            <StyledSwitch />
          </div>
          <div className="flex-row" style={{ justifyContent: 'flex-start' }}>
            <p className="tile-label">Photo Interval:</p>
            <StyledStepper
              width="50%"
              min={10}
              max={60}
              step={10}
              initial={30}
              unit="minutes"
            />
          </div>
          <StyledButton>Start Incubation</StyledButton>
        </Tile>
        {/* Metadata */}
        <Tile style={{ gridRow: '3/9', gridColumn: '3/4' }}>
          <h1 className="tile-heading">Metadata:</h1>
          <FormInput isMultiLine={false}>Title</FormInput>
          <FormInput isMultiLine={false}>Location</FormInput>
          <FormInput isMultiLine rows={6}>
            Description
          </FormInput>
        </Tile>
      </Screen>
    );
  }
}

export default PreIncubationScreen;
