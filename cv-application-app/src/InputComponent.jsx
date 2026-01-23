import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function FormInputs(placeholder, type, value) {
  return (
    <>
    <input 
      placeholder={placeholder}
      type={type}
      value={value}
    />
    </>
  )
}

export default function InputComponent() {
  const personalInfoInput = [
  {placeholder: 'First Name', type: 'text', value: {firstName}},
  {placeholder: 'Last Name', type: 'text', value: {lastName}},
  {placeholder: 'What role are you applying for?', type: 'text', value: {jobTitle}},
  {placeholder: '', type: 'file', value: {photo}, accept: 'image/png, image/jpeg'}
]

const contactInfoInput = [
  {placeholder: '@ Email', type: 'email', value: {email}, pattern: '.+@example\.com'},
  {placeholder: 'Phone', type: 'tel', value: {phone}},
  {placeholder: 'Country', type: 'text', value: {country}},
  {placeholder: 'Address', type: 'text', value: {address}}
]

const workExperienceInput = [
  {placeholder: 'Job Title', type: 'text', value: {jobTitle}},
  {placeholder: 'Company', type: 'text', value: {company}},
  {placeholder: 'Start Date', type: 'date', value: {startDate}},
  {placeholder: 'End Date', type: 'date', value: {endDate}},
  {placeholder: 'Location', type: 'text', value: {location}},
  {placeholder: 'Describe your role, highlite your accomplishments', type: 'text', value: {description}}
]

const skillsInput = [
  {placeholder: 'Your skill', type: 'text', value: {skill}}
]

 const languageInput = [
  {placeholder: 'Language', type: 'text', value: {language}}
 ]

 function handlePersonalInfo() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [photo, setPhoto] = useState('');

  return (
    <div>
    </div>
  )
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

  return (
    <div className='category'>
      <div className='category-header'>
        <h1 className='category-title'></h1>
        <h2 className='category-descirption'></h2>
      </div>
      <div className='category-body'>
        <form onSubmit={e => e.preventDefault()}>
          <FormInputs placeholder='First Name' type='text' />
        </form>
      </div>
    </div>
  )
}