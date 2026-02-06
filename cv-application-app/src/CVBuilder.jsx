import { useState, useEffect } from 'react'
import './CVBuilder.css'
import DisplayContact from './components/ContactComponent';
import DisplayExperience from './components/ExperienceComponent';
import downloadIcon from './assets/download-icon.svg';
import horizontalLayout from './assets/3-bricks-layout.png';

export default function CvComponent() {
    const cv = {
    personal: {
      title: 'Personal details',
      description: 'Help recruiters understand who you are',
      fields: [
        {name: 'firstName', placeholder: 'First Name', type: 'text'}, 
        {name: 'lastName', placeholder: 'Last Name', type: 'text'}, 
        {name: 'jobTitle', placeholder: 'What role are you applying for?', type: 'text'}, 
        {name: 'photo', placeholder: '', type: 'file', accept: 'image/png, image/jpeg'},
      ]
    },
    contact: {
      title: 'Contact information',
      description: 'Your contact info for recruiters to get back to you',
      fields: [
        {name: 'address', placeholder: 'Address', type: 'text'}, 
        {name: 'email', placeholder: 'Email', type: 'email', pattern: '.+@example\.com'},
        {name: 'phone', placeholder: 'Phone', type: 'tel'},
        {name: 'country', placeholder: 'Country', type: 'text'},
      ]
    },
    experience: {
      title: 'Work Experience',
      description: 'Tell recruiters about your previous roles and achievements',
      fields: [
        {name: 'jobExperienceTitle', placeholder: 'Job Title', type: 'text'},
        {name: 'company', placeholder: 'Company', type: 'text'},
        {name: 'startDate', placeholder: 'Start Date', type: 'date'},
        {name: 'endDate', placeholder: 'End Date', type: 'date'},
        {name: 'location', placeholder: 'Location', type: 'text'},
        {name: 'jobDescription', placeholder: 'Describe your role, highlite your accomplishments', type: 'text'}
      ]
    },
    education: {
      title: 'Education',
      description: 'Show what you studied and what you learnt',
      fields: [
        {name: 'school', placeholder: 'School', type: 'text'},
        {name: 'schoolStartDate', placeholder: 'Start Date', type: 'date'},
        {name: 'schoolEndDate', placeholder: 'End Date', type: 'date'},
        {name: 'schoolDescription', placeholder: 'Describe what you studied', text: 'text'}
      ]
    },
    skills: { 
      title: 'Skills',
      description: 'Add your skills to show what you do best',
      fields: [
        {name: 'skill', placeholder: 'Your skill', type: 'text'}
      ]
    },
    language: {
      title: 'Languages',
      description: 'Tell about your language skills',
      fields: [
        {name: 'language', placeholder: 'Language', type: 'text'}
      ]
    }
  }

  const firstCategory = Object.keys(cv)[0];
  const [activeCategory, setActiveCategory] = useState(firstCategory);

  const savedInputData = localStorage.getItem('data');

  const [inputData, setInputData] = useState( savedInputData ? JSON.parse(savedInputData) : {
    personal: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      photo: null,
    },
    contact: {
      email: '',
      phone: '',
      country: '',
      address: '',
    },
    experience: {
      jobExperienceTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      jobDescription: '',
    },
    education: {
      school: '',
      schoolStartDate: '',
      schoolEndDate: '',
      schoolDescription: ''
    },
    skills: {
      skill: ''
    },
    language: {
      language: ''
    },
  });

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  let categoryNumber = 1;

  useEffect(() => {
    const dataToSave = {
      ...inputData,
      personal: {
        ...inputData.personal,
        photo: null
      }
    }
    localStorage.setItem('data', JSON.stringify(dataToSave))
  }, [inputData]);
  

  return (
    <>
    <div className='container'>
      <div className='nav'>
        <h1 className='title'>Your resume</h1>
        <button className='download-button'>
          <img src={downloadIcon} alt='download'/>
          Download
        </button>
      </div>
      <ul className='input-list'>
        {Object.keys(cv).map((category) => {
          return (
            <li key={category} className='category-item'>
              <button className='categor-button' onClick={() => handleCategory(category)}>
                <span className='number'>
                  {categoryNumber++}
                </span>
                {cv[category].title}
              </button>
            </li>
          )
        })}
      </ul>
      <div className='category'>
        <div className='category-header'>
          <h2 className='category-title'>{cv[activeCategory].title}</h2>
          <p className='category-descirption'>{cv[activeCategory].description}</p>
        </div>
          <div className='category-body'>
            <form onSubmit={e => e.preventDefault()} className='category-form'>
              {cv[activeCategory].fields.map((property) => {
                const isFile = property.type === 'file';
                return (
                  <li key={property.name}>
                    <input
                      name={property.name}
                      placeholder={property.placeholder}
                      type={property.type}
                      className='input-item'
                      onChange={(e) => {
                        const inputType = isFile ? e.target.files[0] : e.target.value;
                         setInputData({
                          ...inputData,
                          [activeCategory]: {
                            ...inputData[activeCategory],
                            [property.name]: inputType
                          }
                        })
                      }}
                      {...(!isFile ? {value: inputData[activeCategory][property.name] ?? ''} : {})}
                    />
                  </li>
                )
              })}
            </form>
          </div>
        </div>
        <div className='cv'>
          <div className='cv-display'>
            <div className='cv-brick section-1'>
              <section className='cv-section'>
                <div>
                  {inputData.personal.photo ? (<img className='personal-photo' src={URL.createObjectURL(inputData.personal.photo)} alt='Profile photo'/>) : null}
                </div>
                <h2 className='personal-title'>
                  {inputData.personal.firstName}{' '}
                  {inputData.personal.lastName}{' '}
                </h2>
                <p className='description'>
                  {inputData.personal.jobTitle}{' '}
                </p>
                <div className='line'></div>
              </section>
                {Object.values(inputData.contact).some(value => value !== '') ? <DisplayContact category={cv.contact} data={inputData.contact} title="Contact information" /> : ''}
            </div>
            <div className='cv-brick section-2'>
                {Object.values(inputData.experience).some(value => value !== '') ? <DisplayExperience category={cv.experience} data={inputData.experience} title="Professional experience" /> : ''}
            </div>
            <div className='cv-brick section-3'></div>
          </div>
        </div>
      </div>
    </>
  )
}