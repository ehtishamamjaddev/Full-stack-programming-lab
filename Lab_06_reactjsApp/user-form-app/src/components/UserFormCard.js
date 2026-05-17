import { useState } from 'react';

const initialState = {
  name: '',
  email: ''
};

function UserFormCard() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
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

    setSuccessMessage('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      nextErrors.email = 'Email must include @.';
    }

    return nextErrors;
  };

  // Handles form submission and validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage('');
      return;
    }

    setSubmittedData(formData);
    setFormData(initialState);
    setErrors({});
    setSuccessMessage('Form submitted successfully.');
  };

  return (
    <section className="form-card" aria-label="User form card">
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name ? <p className="error">{errors.name}</p> : null}
        </div>

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email ? <p className="error">{errors.email}</p> : null}
        </div>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      {successMessage ? <p className="success">{successMessage}</p> : null}

      {submittedData ? (
        <article className="submitted-data" aria-live="polite">
          <h2>Submitted Data</h2>
          <p>
            <span>Name:</span> {submittedData.name}
          </p>
          <p>
            <span>Email:</span> {submittedData.email}
          </p>
        </article>
      ) : null}
    </section>
  );
}

export default UserFormCard;
