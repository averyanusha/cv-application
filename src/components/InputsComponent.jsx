export default function InputsComponent ({cv, activeCategory, inputData, setInputData, handleCategory}) {
  const deletePhoto = (inputField) => {
    setInputData({
      ...inputData,
      [activeCategory]: {
        ...inputData[activeCategory],
        [inputField]: null
      }
    })
  };

  const handleAddition = () => {
    const newItem = {};
    cv[activeCategory].fields.forEach(field => {
      newItem[field.name] = '';
    });
    newItem.id = `${activeCategory}${Date.now()}`;

    setInputData({
      ...inputData,
      [activeCategory]: [...inputData[activeCategory], newItem]
    })
    setCurrentIndex(currentIndex + 1);
  }

  const handleDelete = (id) => {
    setInputData({
      ...inputData,
      [activeCategory]:inputData[activeCategory].filter((item) => item.id !== id)
    })
  }

  const isArrayCategory = Array.isArray(inputData[activeCategory]);

  const cvArray = Object.keys(cv);
  return (
    <div className='inputs'>
      <div className='inputs-header'>
        <h2 className='inputs-title'>{cv[activeCategory].title}</h2>
        <p className='inputs-descirption'>{cv[activeCategory].description}</p>
      </div>
        <div className='category-body'>
          <form onSubmit={e => e.preventDefault()} className='category-form'>
          {isArrayCategory ? (
            inputData[activeCategory].map((entry, entryIndex) => {
              return (
                <div key={entry.id} className='entry-block'>
                  {cv[activeCategory].fields.map((property) => {
                    return (
                      <div key={property.name}>
                        {property.type === 'select' ? <select className='inputs-item' onChange={(e) => {
                          setInputData({
                            ...inputData,
                            [activeCategory]: inputData[activeCategory].map((item, index) => {
                              if(index === entryIndex) {
                                return {...item, [property.name] : e.target.value};
                              }
                              return {...item};
                            })
                          })
                        }}>{property.options.map((option) => {
                          return(
                            <option key={option} value={option}>{option}</option>
                          )
                        })}</select> : 
                        <input
                          name={property.name}
                          type={property.type}
                          placeholder={property.placeholder}
                          className='inputs-item'
                          onChange={(e) => {
                            setInputData({
                              ...inputData,
                              [activeCategory]: inputData[activeCategory].map((item, index) => {
                                if (index === entryIndex) {
                                  return {...item, [property.name] : e.target.value};
                                }
                                return item;
                              })
                            })
                          }}
                          value={entry[property.name] ?? ''} 
                        />
                        }
                      </div>
                    )
                  })}
                  <button type='button' className='add-section' onClick={() => handleAddition()}>+ Add</button>
                  {inputData[activeCategory].length > 1 ? <button onClick={() => handleDelete(entry.id)}>Delete</button> : ''}
                </div>
              )
            })
          ) : cv[activeCategory].fields.map((property) => {
              const isFile = property.type === 'file';
              return (
                <div key={property.name} className='category-input'>
                  <input
                    key={property.name}
                    name={property.name}
                    placeholder={property.placeholder}
                    type={property.type}
                    className={isFile ? 'input-photo' :'inputs-item'}
                    onChange={(e) => {
                      let inputType;
                      if (isFile) {
                        inputType = e.target.files[0];
                      } else {
                        inputType = e.target.value;
                      }
                      setInputData({
                        ...inputData,
                        [activeCategory]: {
                          ...inputData[activeCategory],
                          [property.name]: inputType
                        }
                      });
                    }}
                    {...(!isFile ? { value: inputData[activeCategory][property.name] ?? '' } : {})}
                  />
                  {isFile && (
                    <button type='button' className='delete-button' onClick={() => deletePhoto(property.name)} />
                  )}
                </div>
              );
          })}
        </form>
        {cvArray.indexOf(activeCategory) < cvArray.length - 1 ? <button className='next-button' onClick={() => handleCategory(cvArray[cvArray.indexOf(activeCategory) + 1])}>
          Next
        </button> : ''}
      </div>
    </div>
  )
}