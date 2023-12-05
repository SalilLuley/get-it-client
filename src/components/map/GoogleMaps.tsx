import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Container } from "@mui/material";

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  console.log("AIzaSyAWCCRckGxKlnGnfQ96KpHZ2mBrQc19YFk"); //process.env.REACT_APP_MAPS_API ?? "",);
  const apiKey = "AIzaSyAWCCRckGxKlnGnfQ96KpHZ2mBrQc19YFk"; //process.env.REACT_APP_MAPS_API ?? "",

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

const DEFAULT_CENTER = { lat: 53.3498, lng: 6.2603 };
const DEFAULT_ZOOM = 7;

export const GoogleMaps = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
    }
  }, [ref]);

  return (
    <Container sx={{ height: "80vh", width: "80vh" }}>
      <div ref={ref} style={{ width: "inherit", height: "inherit" }} />
    </Container>
  );
};

export const MapComponent = () => (
  <GoogleMapsWrapper>
    <GoogleMaps />
  </GoogleMapsWrapper>
);
