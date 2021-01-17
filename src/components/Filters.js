/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import fetchSpaceXData from '../api';

const Filters = ({ updateMissionData, query }) => {
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

  const [missionLaunchYear, setMissionLaunchYear] = useState(
    query.launch_year || '',
  );
  const [missionLaunchSuccess, setMissionLaunchSuccess] = useState(
    query.launch_success || '',
  );
  const [missionLandSuccess, setMissionLandSuccess] = useState(
    query.land_success || '',
  );

  const setQueryParam = () => {
    let queryParam = '/?';

    queryParam += missionLaunchYear ? `&launch_year=${missionLaunchYear}` : '';
    queryParam += missionLaunchSuccess
      ? `&launch_success=${missionLaunchSuccess}`
      : '';
    queryParam += missionLandSuccess
      ? `&land_success=${missionLandSuccess}`
      : '';

    router.push(queryParam, undefined, { shallow: true });
  };

  useEffect(() => {
    setQueryParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionLaunchYear, missionLaunchSuccess, missionLandSuccess]);

  const filterYear = (year) => {
    const currYear = missionLaunchYear === year ? '' : year;
    setMissionLaunchYear(currYear);
    fetchSpaceXData(currYear, missionLaunchSuccess, missionLandSuccess).then(
      (res) => {
        updateMissionData(res);
      },
    );
  };

  const filterLaunch = (launch) => {
    const currLaunch = missionLaunchSuccess === launch ? '' : launch;
    setMissionLaunchSuccess(currLaunch);
    fetchSpaceXData(missionLaunchYear, currLaunch, missionLandSuccess).then(
      (res) => {
        updateMissionData(res);
      },
    );
  };

  const filterLand = (land) => {
    const currLand = missionLandSuccess === land ? '' : land;
    setMissionLandSuccess(currLand);
    fetchSpaceXData(missionLaunchYear, missionLaunchSuccess, currLand).then(
      (res) => {
        updateMissionData(res);
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
            className={
              missionLaunchYear === data
                ? 'active filters-value'
                : 'filters-value'
            }
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
        <div
          aria-hidden="true"
          className={
            missionLaunchSuccess === 'true'
              ? 'active filters-value'
              : 'filters-value'
          }
          onClick={() => filterLaunch('true')}
        >
          True
        </div>
        <div
          aria-hidden="true"
          className={
            missionLaunchSuccess === 'false'
              ? 'active filters-value'
              : 'filters-value'
          }
          onClick={() => filterLaunch('false')}
        >
          False
        </div>
      </div>
      <div className="filters-heading">
        <span>Successfull Landing</span>
      </div>
      <div className="filter-value-container">
        <div
          aria-hidden="true"
          className={
            missionLandSuccess === 'true'
              ? 'active filters-value'
              : 'filters-value'
          }
          onClick={() => filterLand('true')}
        >
          True
        </div>
        <div
          aria-hidden="true"
          className={
            missionLandSuccess === 'false'
              ? 'active filters-value'
              : 'filters-value'
          }
          onClick={() => filterLand('false')}
        >
          False
        </div>
      </div>
    </div>
  );
};

export default Filters;
