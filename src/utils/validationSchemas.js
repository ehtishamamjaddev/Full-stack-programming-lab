import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
});

export const registerSchema = Yup.object({
  fullName: Yup.string().min(3, 'Too short').required('Name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm password')
});

export const checkoutSchema = Yup.object({
  fullName: Yup.string().required('Recipient name is required'),
  phone: Yup.string().min(10, 'Phone looks too short').required('Phone is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().min(8, 'Address is too short').required('Address is required')
});

export const contactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  message: Yup.string().min(20, 'Message should be at least 20 chars').required('Message is required')
});
