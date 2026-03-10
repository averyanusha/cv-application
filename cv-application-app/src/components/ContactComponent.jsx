import React from "react";
import { useState, useEffect } from 'react';

export default function DisplayContact({category, data, activeLayout}) {
  return (
    <>
      {category.fields.map((property) => {
        if (data[property.name])
        return (
          <p key={property.name} className='description'>{data[property.name]}</p>
        )
      })}
    </>
  )
}
