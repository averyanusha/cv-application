import React from "react";
import { useState, useEffect } from 'react';

export default function DisplayExperience({category, data, title}) {
  return (
    <>
    <section className='cv-section'>
      <h2 className='section-title'>{title}</h2>
      {category.fields.map((property) => {
        if (data[property.name])
        return (
          <div key={property.name}>
            {property.name === 'jobExperienceTitle' ? <h3 className='section-sub-title'>{data[property.name]}</h3> : <p className='description'>{data[property.name]}</p> }
          </div>
        )
      })}
    </section>
    </>
  )
}