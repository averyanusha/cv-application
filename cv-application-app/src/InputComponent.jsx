import { useState } from 'react'
import './App.css'

export default function InputComponent() {
  const firstCategory = Object.keys(cv)[0];
  const [activeCategory, setActiveCategory] = useState(firstCategory);

  const handleCategory = (category) => {
    setActiveCategory(category);
  }
  const DisplayForm = ({title, description, fields}) => {
    return (
      <div className='category'>
        <div className='category-header'>
          <h1 className='category-title'>{title}</h1>
          <h2 className='category-descirption'>{description}</h2>
        </div>
        <div className='category-body'>
          <form onSubmit={e => e.preventDefault()}>
            {fields.map((property) => {
              return (
                <li>
                  <input
                    name={property.name}
                    placeholder={property.placeholder}
                    type={property.type}
                    onChange={onChange}
                  />
                </li>
              )
            })}
          </form>
        </div>
      </div>
    )
  }

  const cv = {
    personal: {
      title: 'Personal',
      description: 'Help recruiters understand who you are',
      fields: [
        {name: 'firstName', placeholder: 'First Name', type: 'text'}, 
        {name: 'lastName', placeholder: 'Last Name', type: 'text'}, 
        {name: 'jobTitle', placeholder: 'What role are you applying for?', type: 'text'}, 
        {name: 'photo', placeholder: '', type: 'file', accept: 'image/png, image/jpeg'},
      ]
    },
    contact: {
      title: 'Contact',
      description: 'Your contact info for recruiters to get back to you',
      fields: [
        {name: 'email', placeholder: '@ Email', type: 'email', pattern: '.+@example\.com'},
        {name: 'phone', placeholder: 'Phone', type: 'tel'},
        {name: 'country', placeholder: 'Country', type: 'text'},
        {name: 'address', placeholder: 'Address', type: 'text'}, 
      ]
    },
    experience: {
      title: 'Work Experience',
      description: 'Tell recruiters about your previous roles and achievements',
      fields: [
        {name: 'jobTitle', placeholder: 'Job Title', type: 'text'},
        {name: 'company', placeholder: 'Company', type: 'text'},
        {name: 'startDate', placeholder: 'Start Date', type: 'date'},
        {name: 'endDate', placeholder: 'End Date', type: 'date'},
        {name: 'location', placeholder: 'Location', type: 'text'},
        {name: 'jobDescription', placeholder: 'Describe your role, highlite your accomplishments', type: 'text'}
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
    }
  }
  function handlePersonalInfo(e, input) {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [photo, setPhoto] = useState('');
  }

  function handleContactInfo() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
  }

  function handleWorkExperience() {
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
  }

  function handleSkills() {
    const [skill, setSkill] = useState('');
    const [level, setLevel] = useState('')
  }

  function handleLanguages() {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('')
  }

  function handleEducation() {
    const [school, setSchool] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
  }
  // const categories = [
  //   {title: "personal", description: "Help recruiters understand who you are"},
  //   {title: "contact", description: "Your contact info for recruiters to get back to you"},
  //   {title: "experience", description: "Tell recruiters about your previous roles and achievements"},
  //   {title: "skills", description: "Add your skills to show what you do best"}, 
  //   {title: "languages", description: "Tell about your language skills"}, 
  //   {title: "education", description: "Show what you studied and what you learnt"}
  // ]

  return (
    <>
    <div>
        <ul>
          {Object.keys(cv).map((category) => {
            return (
              <button onClick={() => handleCategory(category)}>
                {cv[category].title}
              </button>
            )
          })}
        </ul>
      </div>
      <div>
        <DisplayForm {...cv[activeCategory]} />
      </div>
    </>
  )
}