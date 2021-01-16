/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import './index.scss';

import Filters from '../src/components/Filters';
import Mission from '../src/components/Mission';

export async function getServerSideProps({ query }) {
  let defaultQuery = 'https://api.spaceXdata.com/v3/launches?limit=100';

  if (query.launch_year) {
    defaultQuery += `&launch_year=${query.launch_year}`;
  }
  if (query.launch_success) {
    defaultQuery += `&launch_success=${query.launch_success}`;
  }
  if (query.land_success) {
    defaultQuery += `&land_success=${query.land_success}`;
  }

  const res = await fetch(defaultQuery);
  const data = await res.json();
  return { props: { data } };
}
const SpaceX = ({ data }) => {
  const [missionData, updateMissionData] = useState(data);
  return (
    <div className="container">
      <h2 className="title">SpaceX Launch Programs</h2>
      <div className="page-wrapper">
        <Filters updateMissionData={updateMissionData} />

        <div className="grid-container">
          <Mission data={missionData} />
        </div>
      </div>
      <footer>
        <div>Developed by:</div>
        <span>Saquib Ajaz</span>
      </footer>
    </div>
  );
};

export default SpaceX;
