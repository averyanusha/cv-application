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
      {data.map((entry) => {
        return (
          <div key={entry.id} className='section-item'>
            {category.fields.map((property) => {
              if (entry[property.name])
              return (
                property.name === 'jobExperienceTitle' || property.name === 'school' ? <h3 key={property.name} className='section-sub-title'>{entry[property.name]}</h3> : 
                property.type === 'date' ? <p key={property.name} className='description date'>{formatDate(entry[property.name])}</p> : <p key={property.name} className='description'>{entry[property.name]}</p>
              )
              return null;
            })}
          </div>
        )
      })}
    </section>
    </>
  )
}