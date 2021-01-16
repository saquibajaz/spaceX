/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import fetchSpaceXData from '../api';

const Filters = (props) => {
  const router = useRouter();
  const launchYears = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];

  const [missionLaunchYear, setMissionLaunchYear] = useState('');
  const [missionLaunchSuccess, setMissionLaunchSuccess] = useState('');
  const [missionLandSuccess, setMissionLandSuccess] = useState('');

  const setQueryParam = () => {
    let queryParam = '/?';
    if (missionLaunchYear) {
      queryParam += `&launch_year=${missionLaunchYear}`;
    }
    if (missionLaunchSuccess) {
      queryParam += `&launch_success=${missionLaunchSuccess}`;
    }
    if (missionLandSuccess) {
      queryParam += `&land_success=${missionLandSuccess}`;
    }
    router.push(queryParam, undefined, { shallow: true });
  };

  useEffect(() => {
    if (missionLaunchYear && setMissionLaunchSuccess && setMissionLandSuccess) {
      setQueryParam();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionLaunchYear, missionLaunchSuccess, missionLandSuccess]);

  const filterYear = (year) => {
    setMissionLaunchYear(year);
    fetchSpaceXData(year, missionLaunchSuccess, missionLandSuccess).then(
      (res) => {
        props.updateMissionData(res);
      },
    );
  };

  const filterLaunch = (launch) => {
    setMissionLaunchSuccess(launch);
    fetchSpaceXData(missionLaunchYear, launch, missionLandSuccess).then(
      (res) => {
        props.updateMissionData(res);
      },
    );
  };

  const filterLand = (land) => {
    setMissionLandSuccess(land);
    fetchSpaceXData(missionLaunchYear, missionLaunchSuccess, land).then(
      (res) => {
        props.updateMissionData(res);
      },
    );
  };
  return (
    <div className="filter-container">
      <div className="filter-title">Filters</div>
      <div className="filters-heading">
        <span>Launch Year</span>
      </div>
      <div className="filter-value-container">
        {launchYears.map((data) => (
          <div
            key={data}
            className="filters-value"
            onClick={() => filterYear(data)}
            aria-hidden="true"
          >
            {data}
          </div>
        ))}
      </div>
      <div className="filters-heading">
        <span>Successfull Launch</span>
      </div>
      <div className="filter-value-container">
        <div aria-hidden="true" className="filters-value" onClick={() => filterLaunch('true')}>
          True
        </div>
        <div aria-hidden="true" className="filters-value" onClick={() => filterLaunch('false')}>
          False
        </div>
      </div>
      <div className="filters-heading">
        <span>Successfull Landing</span>
      </div>
      <div className="filter-value-container">
        <div aria-hidden="true" className="filters-value" onClick={() => filterLand('true')}>
          True
        </div>
        <div aria-hidden="true" className="filters-value" onClick={() => filterLand('false')}>
          False
        </div>
      </div>
    </div>
  );
};

export default Filters;
