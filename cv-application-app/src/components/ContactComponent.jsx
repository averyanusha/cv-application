import React from "react";
import { useState, useEffect } from 'react';

export default function DisplayContact({category, data, title}) {
  return (
    <>
      <section className='cv-section'>
        <div> 
          <h2 className='section-title'>{title}</h2>
          {category.fields.map((property) => {
            if (data[property.name])
            return (
              <div key={property.name}>
                <p className='description'>{data[property.name]}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
