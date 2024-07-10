import { Input } from './Input'
import { Link, useNavigate } from 'react-router-dom'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'
import { useAtomValue } from 'jotai'
import { loadingAtom, userAtom } from '../store/authStore'
import { MdAccountCircle } from 'react-icons/md'
import { IoIosLogIn } from 'react-icons/io'
import { useAuth } from '../hooks/useAuth'

export const Header = () => {
  const { logout } = useAuth()
  const user = useAtomValue(userAtom)

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()

      alert('User logged out successfully!')
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <header className="flex h-16 justify-between items-center bg-header">
      <Link to={`/`}>
        <img className="size-16" src={picnicHeaderLogo} alt="Logo" />
      </Link>
      <Input />
      {user ? (
        <div>
          <p>{user.email}</p>
          {/* <Link to={'/profile'}>
//             <MdAccountCircle color="white" fontSize="3rem" />
//           </Link> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link
          className="size-16 flex items-center justify-center"
          to={`/login`}
        >
          <MdAccountCircle color="white" fontSize="3rem" />
        </Link>
      )}
    </header>
  )
}

// export const Header = () => {
//   const user = useAtomValue(userAtom)
//   const loading = useAtomValue(loadingAtom)

//   console.log('User in Header:', user)

//   return (
//     <header className="flex h-16 justify-between items-center bg-header">
//       <Link to={`/`}>
//         <img className="size-16" src={picnicHeaderLogo} alt="Logo" />
//       </Link>
//       <Input />
//       {user ? (
//         <div>
//           <p>{user.email}</p>
//           {/* <Link to={'/profile'}>
//             <MdAccountCircle color="white" fontSize="3rem" />
//           </Link> */}
//         </div>
//       ) : (
//         <Link
//           className="size-16 flex items-center justify-center"
//           to={`/login`}
//         >
//           <IoIosLogIn color="white" fontSize="3rem" />
//         </Link>
//       )}
//     </header>
//   )
// }
