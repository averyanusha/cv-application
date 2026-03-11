export default function DisplayExperience({category, data, title}) {
  const formatDate = (value) => {
    if(!value) return '';
    const date = new Date(value + '-01');
    return new Intl.DateTimeFormat('en-GB', {
      'year': 'numeric',
      'month': 'long'
    }).format(date);
  };

  return (
    <>
      <h2 className='section-title'>{title}</h2>
      {data.map((entry) => {
        return (
          <div key={entry.id} className='cv-body'>
            <div key='row1' className='row'>
              {category.fields.filter(field => field.contentPosition === 1).map(property => (
                property.type === 'month' ? <p className='description'>{formatDate(entry[property.name])}</p> : <h3 className="section-sub-title">{entry[property.name]}</h3>
              ))}
            </div>
            <div key='row2' className='row'>
              {category.fields.filter(field => field.contentPosition === 2).map(property => (
                property.type === 'month' ? <p className='description'>{formatDate(entry[property.name])}</p> : <p className='description'>{entry[property.name]}</p>
              ))}
            </div>
            <div key='row3' className='row'>
              {category.fields.filter(field => field.contentPosition === 3).map(property => (
                <p className='description'>{entry[property.name]}</p>
              ))}
            </div>
          </div>
        )
      })}
    </>
    // <>
    //   <h2 className='section-title'>{title}</h2>
    //   <div className='cv-body'>
    //     {data.map((entry) => {
    //     return (
    //       <div key={entry.id} className='section-item'>
    //         {category.fields.map((property) => {
    //           if (entry[property.name])
    //           return (
    //             property.name === 'jobExperienceTitle' || property.name === 'school' ? <h3 key={property.name} className='section-sub-title'>{entry[property.name]}</h3> : 
    //             property.type === 'month' ? <p key={property.name} className='description date'>{formatDate(entry[property.name])}</p> : <p key={property.name} className='description'>{entry[property.name]}</p>
    //           )
    //           return null;
    //         })}
    //       </div>
    //       )
    //     })}
    //   </div>
    // </>
  )
}