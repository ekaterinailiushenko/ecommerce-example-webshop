import { useState } from 'react'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div className="bg-white shadow-md rounded flex flex-col items-center size-fit w-5/6">
      <h2 className="font-bold text-lg">Login</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Username or email</label>
        <input
          className="bg-main border-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="bg-main border-2 rounded"
          value={pass}
          onChange={e => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="border-2" type="submit">
          Log In
        </button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here.
      </button>
    </div>
  )
}
