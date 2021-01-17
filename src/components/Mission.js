/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 50}`;

const Mission = ({ data }) => data
  && data.map((spaceX, i) => {
    const landSuccess = spaceX.rocket.first_stage && spaceX.rocket.first_stage.cores
      ? spaceX.rocket.first_stage.cores[0].land_success
      : '';
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className="spacex-container">
        <div className="mission-image">
          <Image
            loader={myLoader}
            src={spaceX.links.mission_patch}
            alt={spaceX.mission_name}
            width={150}
            height={150}
          />
        </div>
        <div className="mission-name">
          <p>
            {spaceX.mission_name}
            {' '}
            #
            {spaceX.flight_number}
          </p>
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
          <span>
            {spaceX.launch_success && spaceX.launch_success.toString()}
          </span>
        </div>
        <div className="mission-detail">
          Successfull Landing:
          <span>{landSuccess && landSuccess.toString()}</span>
        </div>
      </div>
    );
  });

export default Mission;
