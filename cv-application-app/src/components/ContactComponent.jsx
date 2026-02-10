import React from "react";
import { useState, useEffect } from 'react';

export default function DisplayContact({category, data, title}) {
  return (
    <>
      <section className='cv-section'>
        <h2 className='section-title'>{title}</h2>
        <div className="contact">
          {category.fields.map((property) => {
            if (data[property.name])
            return (
              <p key={property.name} className='description'>{data[property.name]}</p>
            )
          })}
        </div>
      </section>
    </>
  )
}
