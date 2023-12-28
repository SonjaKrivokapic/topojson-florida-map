import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { feature } from 'topojson-client';

const geoUrl = 'https://raw.githubusercontent.com/MiamiHerald/florida-topojson-sources/master/florida-counties.json';

const FloridaMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((topojsonData) => {
        const counties = feature(topojsonData, topojsonData.objects['florida-counties']).features;
        setData(counties);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ 
          // rotate: [80, -26, 0],
          scale: 1300, 
          // center: [-50, 100]
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
        <Geographies geography={data}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: 'steelblue',
                    stroke: 'white',
                    strokeWidth: 0.5,
                  },
                  hover: {
                    fill: 'lightblue',
                    stroke: 'white',
                    strokeWidth: 0.5,
                  },
                  pressed: {
                    fill: 'lightblue',
                    stroke: 'white',
                    strokeWidth: 0.5,
                  },
                }}
              />
            ))
          }
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default FloridaMap;

