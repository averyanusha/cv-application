import React from "react";
import { useState, useEffect } from 'react';

export default function DisplayExperience({category, data, title}) {
  const formatDate = (value) => {
    if(!value) return '';
    const date = new Date(value + '-01');
    return new Intl.DateTimeFormat('en-US', {
      'year': 'numeric',
      'month': 'short'
    }).format(date);
  };

  return (
    <>
    <section className='cv-section'>
      <h2 className='section-title'>{title}</h2>
      <div className='work'>
        {data.map((entry, entryIndex) => {
          return (
            <div key={entry.id} className='entry-block'>
              {category.fields.map((property) => {
                if (data[entryIndex][property.name])
                return (
                  property.name === 'jobExperienceTitle' || property.name === 'school' ? <h3 key={property.name} className='section-sub-title'>{data[property.name]}</h3> : 
                  property.type === 'date' ? <p key={property.name} className='description date'>{formatDate(data[property.name])}</p> : <p key={property.name} className='description'>{data[property.name]}</p>
                )
                if (!data[entryIndex][property.name]) 
                  return null;
              })}
            </div>
          )
        })}
      </div>
    </section>
    </>
  )
}