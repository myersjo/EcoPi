import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; //default styles

function CircularProgressBar(props) {
  return (
    <CircularProgressbar
      percentage={props.percentage}
      text={props.text}
      strokeWidth={8}
      styles={{
        root: {
          maxWidth: '100%',
          maxHeight: '100%'
        },
        // Customize the path, i.e. the part that's "complete"
        path: {
          // Tweak path color:
          stroke: '#00d7c2' // TODO: Change this to global reference
        },
        // Customize the circle behind the path
        trail: {
          // Tweak the trail color:
          stroke: '#606875'
        },
        // Customize the text
        text: {
          // Tweak text color:
          fill: '#00d7c2',
          // Tweak text size:
          fontSize: '10px',
          display: 'none'
        }
      }}
    />
  );
}
export default CircularProgressBar;
