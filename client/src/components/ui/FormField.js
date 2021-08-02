/* eslint-disable react/prop-types */

// this is an example
import React from 'react';
import {ErrorMessage, Field} from 'formik';

export const SelectField = ({
  name,
  label,
  options,
}) => (
  <div>
    <label>{label}
      <Field as="select" name={name} className="ui dropdown">
        {(options).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </label>
  </div>
);

export const TextField = ({
  field,
  label,
  placeholder,
}) => (
  <div>
    <label>{label}
      <Field placeholder={placeholder} {...field} />
    </label>
    <div style={{color: 'red'}}>
      <ErrorMessage name={field.name}/>
    </div>
  </div>
);

export const NumberField = ({field, label, min, max}) => (
  <div>
    <label>{label}
      <Field {...field} type="number" min={min} max={max}/>
    </label>
    <div style={{color: 'red'}}>
      <ErrorMessage name={field.name}/>
    </div>
  </div>
);

export const DateField = ({field, label}) => (
  <div>
    <label>{label}
      <Field {...field} type="date"/>
    </label>
    <div style={{color: 'red'}}>
      <ErrorMessage name={field.name}/>
    </div>
  </div>
);