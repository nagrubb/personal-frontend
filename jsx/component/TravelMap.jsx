import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
  },
  headerIcon: {
    color: theme.palette.primary.main,
    fontSize: 18,
    marginRight: theme.spacing(2),
  },
  headerText: {
    color: theme.palette.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
}));

const visitedColour = '#2196F3';
const livedColour = '#555555';
const defaultColour = '#f1f1f1';
const plannedColor = '#9196F3';

const overrideCountryColour = {
  "CAN" : livedColour,    //Canada
  "DOM" : visitedColour,  //Dominican Republic
  "CRI" : visitedColour,  //Costa Rica
  "USA" : livedColour,    //United States
  "ISL" : visitedColour,  //Iceland
  "FRA" : visitedColour,  //France
  "GBR" : visitedColour,  //Great Britian/England
  "CHN" : visitedColour,  //China
  "TWN" : visitedColour,  //Taiwan
  "ESP" : visitedColour,  //Spain
  "IND" : visitedColour,  //India
  "THA" : visitedColour,  //Thailand
  "VNM" : livedColour,    //Vietnam
  "NZL" : visitedColour,  //New Zealand
  "KOR" : visitedColour,  //South Korea
  "FIN" : visitedColour,  //Finland
  "NLD" : visitedColour,  //Netherlands
  "ITA" : visitedColour,  //Italy
  "PER" : plannedColor,   //Peru
  "MEX" : plannedColor    //Mexico
};

const MapChart = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.headerText}>
          <FontAwesomeIcon className={classes.headerIcon} icon={faGlobeAmericas} />Travel
        </Typography>
      </Box>
      <ComposableMap
        projectionConfig={{
          scale: 130,
          rotation: [0, 0, 0],
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={ "json/world.json" }>
          {(geographies, projection) => geographies.map(geography => (
            <Geography
              key={geography.id}
              geography={geography}
              projection={projection}
              fill={geography.properties.ISO_A3 in overrideCountryColour ? overrideCountryColour[geography.properties.ISO_A3] : defaultColour}
              onClick={() => console.log(geography.properties.ISO_A3)}
              style={{
                default: {
                   outline: "none",
                },
                hover: {
                   opacity: 0.8,
                   outline: "none",
                },
                pressed: {
                   opacity: 0.6,
                   outline: "none",
                   stroke: "#607D8B",
                   strokeWidth: 1,                }
              }}
            />
          ))}
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default MapChart;
