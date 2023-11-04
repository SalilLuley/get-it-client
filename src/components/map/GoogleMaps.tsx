import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Container } from "@mui/material";

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   console.log(process.env.REACT_APP_SECRET_NAME);
  const apiKey = "";

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
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
    <Container sx={{ height: "100vh", width: "80vh" }}>
      <div ref={ref} style={{ width: "inherit", height: "inherit" }} />
    </Container>
  );
};

export const MapComponent = () => (
  <GoogleMapsWrapper>
    <GoogleMaps />
  </GoogleMapsWrapper>
);
