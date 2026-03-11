export default function CategoriesComponent ({cv, handleCategory}) {
  let categoryNumber = 1;
  return (
    <>
    <ul className='category-list'>
      {Object.keys(cv).map((category) => {
        return (
          <li key={category} className='category-item'>
            <button className='category-button' onClick={() => handleCategory(category)}>
              <span className='number'>
                {categoryNumber++}
              </span>
              {cv[category].title}
            </button>
          </li>
        )
      })}
      </ul>
    </>
  )
}