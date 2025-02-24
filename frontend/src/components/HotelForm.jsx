import React, { useState } from 'react';
import BasicHotelInfo from './BasicHotelInfo';
import HotelLocationDetails from './HotelLocationDetails';
import HotelPropertyDetails from './HotelPropertyDetails';

const HotelForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && <BasicHotelInfo next={nextStep} />}
      {step === 2 && <HotelLocationDetails next={nextStep} prev={prevStep} />}
      {step === 3 && <HotelPropertyDetails next={nextStep} prev={prevStep} />}
    </div>
  );
};

export default HotelForm;