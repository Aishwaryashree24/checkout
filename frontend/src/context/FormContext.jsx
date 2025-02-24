import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    state: '',
    country: '',
    code: '',
    distance: '',
    photos: [],
    title: '',
    description: '',
    rating: 0,
    rooms: [], 
    cheapestPrice: 0,
    featured: false,
    offerings: [],
    cancellationPolicy: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};