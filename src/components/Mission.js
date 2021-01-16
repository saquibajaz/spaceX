/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const Mission = ({ data }) => data
  && data.map((spaceX) => (
    <div key={spaceX.launch_year} className="spacex-container">
      <div className="mission-image">
        <img alt={spaceX.mission_name} src={spaceX.links.mission_patch} />
      </div>
      <div className="mission-name">
        {spaceX.mission_name}
        {' '}
        #
        {spaceX.flight_number}
      </div>
      <div className="mission-detail">
        Mission Ids:
        <ul>
          {spaceX.mission_id.map((mid) => (
            <li key={mid}>{mid}</li>
          ))}
        </ul>
      </div>
      <div className="mission-detail">
        Launch Year:
        <span>{spaceX.launch_year}</span>
      </div>
      <div className="mission-detail">
        Successfull Launch:
        <span>{spaceX.launch_success && spaceX.launch_success.toString()}</span>
      </div>
      <div className="mission-detail">
        Successfull Landing:
        <span>{spaceX.launch_success && spaceX.launch_success.toString()}</span>
      </div>
    </div>
  ));

export default Mission;
