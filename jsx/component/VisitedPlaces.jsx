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
  header: {
    padding: theme.spacing(1)
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

const highlighted = [
  "CAN",
  "USA",
  "TWN",
  "CHN",
  "ISL",
  "FRA",
  "GBR",
  "ESP",
  "IND",
  "THA",
  "VNM",
  "NZL",
  "CRI",
  "KOR"
];

const MapChart = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.header}>
        <Typography className={classes.headerText}>
          <FontAwesomeIcon className={classes.headerIcon} icon={faGlobeAmericas} />Visited Places
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
              fill={highlighted.indexOf(geography.properties.ISO_A3) !== -1 ? "#2196F3" : "#f1f1f1"}
              onClick={() => console.log(geography.properties.ISO_A3)}
              style={{
                default: {
                   stroke: "#607D8B",
                   strokeWidth: 0.75,
                   outline: "none",
                },
                hover: {
                   fill: "#CFD8DC",
                   stroke: "#607D8B",
                   strokeWidth: 1,
                   outline: "none",
                },
                pressed: {
                   fill: "#FF5722",
                   stroke: "#607D8B",
                   strokeWidth: 1,
                   outline: "none",
                }
              }}
            />
          ))}
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default MapChart;
