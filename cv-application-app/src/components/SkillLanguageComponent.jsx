export default function DisplaySkillLanguage({category, data, title}) {
  return (
    <>
      <section className='cv-section'>
        <h2 className='section-title'>{title}</h2>
        {data.map((entry) => {
          return (
            <div key={entry.id} className='section-item'>
              {category.fields.map((property) => {
                if(entry[property.name]) {
                  return (
                    property.name === 'skills' || property.name === 'language' ? <h3 key={property.name} className="section-sub-title">{entry[property.title]}</h3> : <p key={property.name}>{entry[property.name]}</p>
                  )
                }
                return null;
              })}
            </div>
          )
        })}
      </section>
    </>
  )
}