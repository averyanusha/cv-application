export default function DisplaySkillLanguage({category, data, title}) {
  return (
    <>
      <h2 className='section-title'>{title}</h2>
      <div className='cv-body'>
      {data.map((entry) => {
        return (
          <ul key={entry.id} className='skills'>
            {category.fields.map((property) => {
              if(entry[property.name]) {
                return(
                  property.type === 'select' ? <span key={property.name} className="level">{entry[property.name]}</span> : <li key={property.name} className='description'>• {entry[property.name]}</li>
                )
                }
              return null;
            })}
          </ul>
        )
      })}
      </div>
    </>
  )
}