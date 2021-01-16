const fetchSpaceXData = (year, launch, land) => fetch(
  `https://api.spaceXdata.com/v3/launches?limit=100${
    year && `&launch_year=${year}`
  }${launch && `&launch_success=${launch}`}${land && `&land_success=${land}`}`,
).then((res) => res.json());

export default fetchSpaceXData;
