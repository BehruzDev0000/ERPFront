import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Path } from "../../components"

const AuthHome = () => {
  const navigate=useNavigate()
  useEffect(() => {
    navigate(Path.login)
  }, [])
  return null
}

export default AuthHome