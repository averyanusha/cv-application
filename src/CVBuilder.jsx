import { useState, useEffect } from 'react'
import html2pdf from 'html2pdf.js'
import './CVBuilder.css'
import DisplayContact from './components/ContactComponent';
import DisplayExperience from './components/ExperienceDegreeComponent';
import DisplaySkillLanguage from './components/SkillLanguageComponent';
import ColorPicker from './components/ColorPicker';
import CategoriesComponent from './components/CategoriesComponent';
import InputsComponent from './components/InputsComponent';

export default function CvComponent() {
  const handlePdfDownload = () => {
    const element = document.getElementById('element-to-print');
    const opt = {
      margin: 0,
      filename: 'my-cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5 }
    };
    const originalTransform = element.style.transform;
    element.style.transform = 'none';
    html2pdf().set(opt).from(element).save().then(() => {
      element.style.transform = originalTransform;
    })
  }

  const cv = {
    personal: {
      title: 'Personal details',
      description: 'Help recruiters understand who you are',
      fields: [
        {name: 'firstName', placeholder: 'First Name', type: 'text'}, 
        {name: 'lastName', placeholder: 'Last Name', type: 'text'}, 
        {name: 'jobTitle', placeholder: 'What role are you applying for?', type: 'text'},
        {name: 'personalInfo', placeholder: 'A 3-4 line summary highlighting your qualifications', type: 'text'},
        {name: 'photo', placeholder: '', type: 'file', accept: 'image/png, image/jpeg'},
      ]
    },
    contact: {
      title: 'Contact information',
      description: 'Your contacts for recruiters to get back to you',
      fields: [
        {name: 'email', placeholder: 'Email', type: 'email', pattern: '.+@example\.com'},
        {name: 'phone', placeholder: 'Phone', type: 'tel'},
        {name: 'address', placeholder: 'Address', type: 'text'},
        {name: 'country', placeholder: 'Country', type: 'text'},
      ]
    },
    experience: {
      title: 'Work Experience',
      description: 'Tell recruiters about your previous roles and achievements',
      fields: [
        {name: 'jobExperienceTitle', placeholder: 'Job Title', type: 'text', contentPosition: 1},
        {name: 'company', placeholder: 'Company', type: 'text', contentPosition: 2},
        {name: 'location', placeholder: 'Location', type: 'text', contentPosition: 2},
        {name: 'startDate', placeholder: 'Start Date', type: 'month', contentPosition: 1},
        {name: 'endDate', placeholder: 'End Date', type: 'month', contentPosition: 1},
        {name: 'jobDescription', placeholder: 'Describe your role, highlite your accomplishments', type: 'text', contentPosition: 3}
      ]
    },
    education: {
      title: 'Education',
      description: 'Show what you studied and what you learnt',
      fields: [
        {name: 'school', placeholder: 'School', type: 'text', contentPosition: 1},
        {name: 'degree', placeholder:'Degree', type: 'text', contentPosition: 1},
        {name: 'schoolLocation', placeholder: 'Location', text: 'text', contentPosition: 2},
        {name: 'schoolStartDate', placeholder: 'Start Date', type: 'month', contentPosition: 2},
        {name: 'schoolEndDate', placeholder: 'End Date', type: 'month', contentPosition: 2},
        {name: 'schoolDescription', placeholder: 'Describe what you studied', text: 'text', contentPosition: 3}
      ]
    },
    skills: { 
      title: 'Skills',
      description: 'Add your skills to show what you do best',
      fields: [
        {name: 'skill', placeholder: 'Your skill', type: 'text'}
      ]
    },
    languages: {
      title: 'Languages',
      description: 'Tell about your language skills',
      fields: [
        {name: 'languages', placeholder: 'Language', type: 'text'},
        {name: 'level', type: 'select', options: ['Beginner', 'Intermidiate', 'Advanced', 'Native']}
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
      personalInfo: '',
      photo: null,
    },
    contact: {
      email: '',
      phone: '',
      country: '',
      address: '',
    },
    experience: [
      { id: 'exp1', jobExperienceTitle: '', company: '', location: '', startDate: '', endDate: '', jobDescription: '' }
    ],
    education: [
      { id: 'educ1', school: '', degree: '', schoolLocation: '', schoolStartDate: '', schoolEndDate: '', schoolDescription: '' }
    ],
    skills: [
      { id: 'skill1', skill: '' }
    ],
    languages: [
      { id: 'lang1', language: '', level: ''}
    ],
  });

  const savedLayout = localStorage.getItem('layout');
  const [activeLayout, setActiveLayout] = useState(savedLayout ? JSON.parse(savedLayout) : 'horizontal');

  const savedColor = localStorage.getItem('color');
  const [activeColor, setActiveColor] = useState(savedColor ? JSON.parse(savedColor) : '#003d00');

  const savedHeaderColor = localStorage.getItem('headerColor');
  const [personalSectionColor, setPersonalSectionColor] = useState(savedHeaderColor ? JSON.parse(savedHeaderColor) : 'white');

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    const dataToSave = {
      ...inputData,
      personal: {
        ...inputData.personal,
        photo: null
      }
    }
    localStorage.setItem('data', JSON.stringify(dataToSave));
  }, [inputData]);
  
  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(activeLayout));
  }), [activeLayout];

  useEffect(() => {
    localStorage.setItem('color', JSON.stringify(activeColor));
  }), [activeColor];

  useEffect(() => {
    localStorage.setItem('headerColor', JSON.stringify(personalSectionColor));
  }), [personalSectionColor];

  const handleLayout = (layout) => {
    setActiveLayout(layout);
  };

  return (
    <>
      <div className='container'>
        <div className='nav'>
          <h1 className='title'>Your resume</h1>
          <div className='buttons'>
            <ColorPicker activeColor={activeColor} setActiveColor={setActiveColor} setPersonalSectionColor={setPersonalSectionColor}/>
            <button className='layout-button horizontal' onClick={() => handleLayout('horizontal')}></button>
            <button className='layout-button left' onClick={() => handleLayout('left')}></button>
            <button className='layout-button right' onClick={() => handleLayout('right')}></button>
            <button className='download-button' onClick={() => handlePdfDownload()}></button>
          </div>
        </div>
        <CategoriesComponent cv={cv} handleCategory={handleCategory}/>
        <InputsComponent cv={cv} activeCategory={activeCategory} inputData={inputData} setInputData={setInputData} />
        <div className='cv'>
          <div className='cv-wrapper'>
            <div className={`cv-display ${activeLayout === 'left' ?  'layout-left' : activeLayout === 'right' ? 'layout-right' : ''}`} id='element-to-print'>
            <div className={`cv-brick section-1 ${activeLayout === 'left' ?  'layout-left-top' : activeLayout === 'right' ? 'layout-right-top' : ''}`} style={{ backgroundColor: activeColor, color: personalSectionColor }}>
              {inputData.personal.photo ? (<img className='personal-photo' src={URL.createObjectURL(inputData.personal.photo)} alt='Profile photo'/>) : null}
              <div className='cv-body'>
                <h2 className='personal-title'>
                  {inputData.personal.firstName}{' '}
                  {inputData.personal.lastName}{' '}
                </h2>
                <p className='section-sub-title'>
                  {inputData.personal.jobTitle}{' '}
                </p>
                <div className='line'></div>
                <div className={`row ${activeLayout === 'left' ||  activeLayout === 'right' ?  'no-flex' : ''}`}>
                  {Object.values(inputData.contact).some(value => value !== '') ? <DisplayContact category={cv.contact} data={inputData.contact} activeLayout={activeLayout} /> : ''}
                </div>
                <p className='section-text'>
                  {inputData.personal.personalInfo}{' '}
                </p>
              </div>
            </div>
            <div className={`cv-brick section-2 ${activeLayout === 'right' ? 'layout-right-switch' : ''}`}>
              {inputData.experience.some(entry => Object.entries(entry).some(([key, value]) => key !== 'id' && value !== '')) ? <DisplayExperience category={cv.experience} data={inputData.experience} title="Professional experience" /> : ''}
            </div>
            <div className={`cv-brick section-3 ${activeLayout === 'right' ? 'layout-right-switch' : ''}`}>
              {inputData.education.some(entry => Object.entries(entry).some(([key, value]) => key !== 'id' && value !== '')) ? <DisplayExperience category={cv.education} data={inputData.education} title="Education" /> : ''}
            </div>
            <div className={`cv-brick section-4 ${activeLayout === 'left' ?  'layout-left-middle' : activeLayout === 'right' ? 'layout-right-middle' : ''}`}>
              {inputData.skills.some(entry => Object.entries(entry).some(([key, value]) => key !== 'id' && value !== '')) ? <DisplaySkillLanguage category={cv.skills} data={inputData.skills} title="Skills" /> : ''}
            </div>
            <div className={`cv-brick section-5 ${activeLayout === 'left' ?  'layout-left-bottom' : activeLayout === 'right' ? 'layout-right-bottom' : ''}`}>
              {inputData.languages.some(entry => Object.entries(entry).some(([key, value]) => key !== 'id' && value !== '')) ? <DisplaySkillLanguage category={cv.languages} data={inputData.languages} title="Languages" /> : ''}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}