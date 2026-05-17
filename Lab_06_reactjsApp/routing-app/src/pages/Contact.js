import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  message: ''
};

function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      nextErrors.email = 'Valid email is required.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});
    setSuccessMessage('Thank you. Your message has been sent.');
    setFormData(initialState);
  };

  return (
    <article>
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        {errors.name ? <p className="error">{errors.name}</p> : null}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        {errors.email ? <p className="error">{errors.email}</p> : null}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message"
        />
        {errors.message ? <p className="error">{errors.message}</p> : null}

        <button type="submit">Send Message</button>
      </form>
      {successMessage ? <p className="success">{successMessage}</p> : null}
    </article>
  );
}

export default Contact;
