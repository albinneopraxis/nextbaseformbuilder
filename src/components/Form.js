import React, { useState } from 'react';
import './Form.css'; 

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    description: '',
    incidentDate: '',
    dashCam: '',
    files: [],
    city: '',
    state: '',
    country: '',
    termsAccepted: false,
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      files: [...e.target.files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.fullName.trim()) {
      alert('Full Name is required');
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert('A valid Email address is required');
      return;
    }
    if (!formData.contactNumber.trim()) {
      alert('Contact Number is required');
      return;
    }
    if (!formData.country.trim()) {
      alert('Country is required');
      return;
    }
    if (!formData.termsAccepted) {
      alert('You must accept the Terms and Conditions');
      return;
    }
    if (formData.files.length === 0) {
      alert('At least one file is required');
      return;
    }
  
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        for (const file of value) {
          formDataToSend.append('files', file);
        }
      } else {
        formDataToSend.append(key, value);
      }
    }
  
    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        alert('Form submitted successfully');
        setFormData({
          fullName: '',
          email: '',
          contactNumber: '',
          description: '',
          incidentDate: '',
          dashCam: '',
          files: [],
          city: '',
          state: '',
          country: '',
          termsAccepted: false,
          name: ''
        });
      } else {
        const errorText = await response.text();
        alert('Error submitting form: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Full Name *</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Email address *</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Contact Number *</label>
      <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

      <label>Tell us about what happened</label>
      <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

      <label>Date of incident:</label>
      <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} />

      <label>Which Dash Cam was used</label>
      <input type="text" name="dashCam" value={formData.dashCam} onChange={handleChange} />

      <label>Upload your Dash Cam video (Minimum 1 file)*:</label>
      <input type="file" name="files" onChange={handleFileChange} multiple required />

      <label>What city is this recording from</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} />

      <label>What state is this recording from</label>
      <input type="text" name="state" value={formData.state} onChange={handleChange} />

      <label>Country *</label>
      <input type="text" name="country" value={formData.country} onChange={handleChange} required />

      <label>
        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={() => setFormData(prevState => ({ ...prevState, termsAccepted: !prevState.termsAccepted }))} required />
        I have read and agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
      </label>

      <label>Type your name</label> 
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <div className="recaptcha">
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
