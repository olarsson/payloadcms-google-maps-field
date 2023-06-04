# Google Maps Field for Payload CMS

A simple custom field for Payload CMS for handling Google Maps coordinates.

## How to Use

Create a folder in "collections/GoogleMaps" and then you can import the field like this from a collection:

```
import googleMaps from './GoogleMaps/config';

export const ExampleCollection: CollectionConfig = {
  slug: 'example',
  fields: [
    googleMaps // Google Maps field imported here
  ]
}
```
