import React, {useEffect, useMemo, useState} from 'react';
import SearchBox from './SearchBox.js';
import {area, bboxPolygon} from '@turf/turf';

const AutocompleteGeocode = ({
  place_type,
  geoCodeFn,
  provider,
  inputText='',
  setInputText,
  selectedFeature=null,
  setSelectedFeature,
}) => {
  const providerConfig = useMemo(() => {
    const config = {
      maptiler: {
        place_type: 'place_type',
        bbox: 'bbox',
        place_name: 'place_name',
      },
      geocoding: {
        place_type: 'type',
        bbox: 'boundingbox',
        place_name: 'display_name',
      },
    };
    return config[provider];
  }, [provider]);
  
  // const [inputText, setInputText] = useState('');
  const [options, setOptions] = useState([]);
  // const [selectedFeature, setSelectedFeature] = useState(null);
  
  const handleInputChange = (value) => {
    setInputText(value);
  };
  
  console.log('selectedFeature', selectedFeature);
  
  const searchQueryChanged = selectedFeature?.text.toLowerCase() !==
    inputText.toLowerCase();
  const searchQueryIsFeature = options.find(
    option => option.place_name.toLowerCase() === inputText.toLowerCase());
  
  // fetch options
  useEffect(() => {
    const delayFn = setTimeout(async () => {
      console.log('where', inputText);
      // send request
      if (inputText && searchQueryChanged && !searchQueryIsFeature) {
        console.log('fetching', inputText);
        let features = await geoCodeFn(inputText);
        features.sort((a, b) => (
          area(bboxPolygon(b[providerConfig.bbox])) -
          area(bboxPolygon(a[providerConfig.bbox]))
        ));
        if (place_type && place_type !== 'street') {
          features = features.filter(
            feature => feature[providerConfig.place_type].includes(
              place_type));
        }
        setOptions(features);
      }
    }, 500);
    
    return () => clearTimeout(delayFn);
  }, [
    inputText,
    searchQueryChanged,
    searchQueryIsFeature,
    place_type,
    geoCodeFn,
    provider,
    providerConfig]);
  
  // clear options when cleared search box
  useEffect(() => {
    
    if (options.length && !inputText) {
      setOptions([]);
    }
  }, [inputText, options]);
  
  return (
    <SearchBox
      optionlist={options}
      inputValue={inputText}
      onInputChange={handleInputChange}
      value={selectedFeature}
      onValueChange={setSelectedFeature}
      getOptionLabel={(option) => option[providerConfig.place_name]}
    />
  );
};

export default AutocompleteGeocode;