import React from 'react'
import { useLocation } from 'react-router-dom';

function RentalCar() {
    const { idCar } = useLocation();
    console.log("idcar RentalCar", idCar);
  return (
    <div>RentalCar</div>
  )
}

export default RentalCar