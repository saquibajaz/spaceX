/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Head from 'next/head';
import './index.scss';

import Filters from '../src/components/Filters';
import Mission from '../src/components/Mission';

export async function getServerSideProps({ query }) {
  let defaultQuery = 'https://api.spaceXdata.com/v3/launches?limit=100';

  defaultQuery += query.launch_year ? `&launch_year=${query.launch_year}` : '';
  defaultQuery += query.launch_success ? `&launch_success=${query.launch_success}` : '';
  defaultQuery += query.land_success ? `&land_success=${query.land_success}` : '';

  const res = await fetch(defaultQuery);
  const data = await res.json();
  return { props: { data, query } };
}
const SpaceX = ({ data, query }) => {
  const [missionData, updateMissionData] = useState(data);
  return (
    <div className="container">
      <Head>
        <title>SpaceX</title>
        <meta charset="utf-8" />
        <meta name="description" content="SpaceX Mission Details" />
        <meta name="keywords" content="SpaceX, Mission, Landing, Launch" />
        <meta name="author" content="Saquib Ajaz" />
      </Head>
      <h2 className="title">SpaceX Launch Programs</h2>
      <div className="page-wrapper">
        <Filters query={query} updateMissionData={updateMissionData} />
        <div className="grid-container">
          <Mission data={missionData} />
        </div>
        {missionData.length === 0 ? <div className="no-result-found">No Result Found :-(</div> : null}
      </div>
      <footer>
        <div>Developed by:</div>
        <span>Saquib Ajaz</span>
      </footer>
    </div>
  );
};

export default SpaceX;
