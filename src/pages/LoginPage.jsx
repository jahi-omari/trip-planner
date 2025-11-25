import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // change URL if your backend uses a different port/path
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Invalid credentials');
        setLoading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      // Store the JWT token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      setLoading(false);
      // navigate to homepage or upcoming trips
      navigate('/homepage');
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="container m-auto max-w-xl w-full">
        <div
          className="bg-white px-6 sm:px-8 py-8 border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] m-4 md:m-0"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl sm:text-4xl text-center font-black uppercase mb-8">Login</h2>

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
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-4 border-red-600 rounded">
                <p className="font-bold text-red-900 text-center uppercase text-sm">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <button
                className="bg-black text-white font-black uppercase py-3 px-6 rounded w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                type="submit"
                disabled={!email || !password || loading}
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </div>

            <div className="mb-6">
              <Link
                to="/signup"
                className="block bg-white text-black font-black uppercase py-3 px-6 rounded w-full text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                style={{ textDecoration: 'none' }}
              >
                Sign Up
              </Link>
            </div>

            <div className='flex flex-row items-center mb-6'>
                <div className='flex-grow border-t-4 border-black'></div>
                <p className='text-black font-black uppercase text-xs px-4'>or sign in with</p>
                <div className='flex-grow border-t-4 border-black'></div>    
            </div>
            
           <div>
              <button
                className="bg-green-400 text-black font-black uppercase py-3 px-6 rounded w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                type="submit"
              >
                <FaGoogle className="inline text-xl mr-2 mb-1" /> Google
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default LoginPage