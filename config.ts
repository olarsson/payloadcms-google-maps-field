import { Field } from 'payload/types';
import MapsField from './MapsField';

const googleMapsField: Field = {
  name: 'googleMaps',
  type: 'json',
  required: true,
  admin: {
    components: {
      Field: MapsField
    },
  }
};

export default googleMapsField;