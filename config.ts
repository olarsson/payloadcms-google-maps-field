import { Field } from 'payload/types';
import InputField from './InputField';

const googleMapsField: Field = {
  name: 'googleMaps',
  type: 'json',
  required: true,
  admin: {
    components: {
      Field: InputField
    },
  }
};

export default googleMapsField;