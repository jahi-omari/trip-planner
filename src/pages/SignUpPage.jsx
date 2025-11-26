import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Signup failed.');
        return;
      }
      navigate('/login');
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="container m-auto max-w-2xl w-full">
        <div className="bg-white px-6 sm:px-8 py-8 border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl sm:text-4xl text-center font-black uppercase mb-8">Sign Up</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-gray-900 font-black uppercase mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border-4 border-black rounded w-full py-3 px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  placeholder="eg. John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-black uppercase mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border-4 border-black rounded w-full py-3 px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  placeholder="eg. Smith"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-black uppercase mb-2 text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-4 border-black rounded w-full py-3 px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                placeholder="eg. name@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-black uppercase mb-2 text-sm">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border-4 border-black rounded w-full py-3 px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-black uppercase mb-2 text-sm">Re-Enter Your Password</label>
              <input
                type="password"
                id="re-enter-password"
                name="re-enter-password"
                className="border-4 border-black rounded w-full py-3 px-4 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                placeholder="Confirm your password"
                value={rePassword}
                onChange={e => setRePassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-4 border-red-600 rounded">
                <p className="font-bold text-red-900 text-center uppercase text-sm">{error}</p>
              </div>
            )}

            <div>
              <button
                className="bg-black text-white font-black uppercase py-3 px-6 rounded w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;