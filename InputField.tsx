import React from "react";
import GoogleMapReact from "google-map-react";

// this is how we'll interface with Payload itself
import { useFieldType } from "payload/components/forms";

// we'll re-use the built in Label component directly from Payload
import { Label } from "payload/components/forms";

// we can use existing Payload types easily
import { Props } from "payload/components/fields/Text";

// Import the SCSS stylesheet
import "./styles.scss";

const GOOGLE_MAPS_KEY = ""; /* YOUR KEY HERE */

const defaultProps: {
  center: any;
  zoom: Number;
} = {
  center: {
    lat: 55.605649985202234,
    lng: 13.008717611811619,
  },
  zoom: 11,
};

const LatLngField: React.FC<{
  isLat: Boolean;
  title: String;
  customValue: any;
  setCustomValue: any;
  value: any;
  setValue: any;
}> = React.memo(
  ({ title, isLat, customValue, setCustomValue, value, setValue }) => {
    const arr: String[] = [isLat ? "lat" : "lng", isLat ? "lng" : "lat"];

    return (
      <div className="field-type text">
        <label htmlFor={`field-${arr[0]}`} className="field-label">
          {title}
        </label>
        <input
          id={`field-${arr[0]}`}
          type="text"
          onChange={(e) => {
            setCustomValue({
              [arr[0].toString()]: e.target.value,
              [arr[1].toString()]: value[arr[1].toString()],
            });
          }}
          value={customValue[arr[0].toString()]}
        />
        <button
          type="button"
          className="btn btn--style-primary  btn--size-small"
          onClick={() => {
            console.log(Number(customValue[arr[0].toString()]));
            
            setValue({
              [arr[0].toString()]: Number(customValue[arr[0].toString()]),
              [arr[1].toString()]: Number(customValue[arr[1].toString()]),
            });
          }}
        >
          Update
        </button>
      </div>
    );
  }
);

const InputField: React.FC<Props> = (props) => {
  const { path, label, required } = props;

  const { value = defaultProps.center, setValue } = useFieldType({
    path,
  });

  const [customValue, setCustomValue] = React.useState(defaultProps.center);

  const mapRef = React.useRef(null);

  return (
    <div className="google-maps-field">
      <Label htmlFor={path} label={label} required={required} />
      <ul>
        <li>
          <LatLngField
            title="Latitude"
            isLat={true}
            customValue={customValue}
            setCustomValue={setCustomValue}
            value={value}
            setValue={setValue}
          />
        </li>
        <li>
          <LatLngField
            title="Longitude"
            isLat={false}
            customValue={customValue}
            setCustomValue={setCustomValue}
            value={value}
            setValue={setValue}
          />
        </li>
      </ul>
      <div className="google-map-wrapper">
        <div className="centered-pin" />
        <div className="google-maps-container">
          <GoogleMapReact
            ref={mapRef}
            bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
            center={value}
            defaultZoom={defaultProps.zoom}
            zoomControl={true}
            onChange={(e) => {
              setValue(e.center);
              setCustomValue(e.center);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
