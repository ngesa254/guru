'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore  from '../store/useStore';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAD, setIsLoadingAD] = useState(false);
  const router = useRouter();
  const setFirstName = useStore((state) => state.setFirstName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginwithAD = async () => {
    setIsLoadingAD(true);
    try {
      await signIn('azure-ad', 
        {callbackUrl: '/application'});
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoadingAD(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
      } else {
        // Store the token in localStorage or a secure cookie
        localStorage.setItem('token', data.token);
        // Set the firstName in the store
        setFirstName(data.user.firstname);
        // Redirect to dashboard
        router.push('/application');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative">
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          aria-label="Go back to home"
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </button>
          
        </form>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-gray-500">Or continue with</p>
          <button 
            onClick={loginwithAD}
            className="flex items-center gap-2 border border-gray-300 rounded-md py-2 px-4"
            disabled={isLoading}
          >
            {isLoadingAD ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <img 
                  src="/microsoft.png" 
                  alt="Microsoft logo" 
                  className="w-5 h-5"
                />
                Microsoft AD
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
