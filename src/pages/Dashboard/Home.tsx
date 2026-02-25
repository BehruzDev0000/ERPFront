import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Path } from "../../components"

const Home = () => {
  const navigate=useNavigate()
  useEffect(() => {
    navigate(Path.stacks)
  }, [])
  return null
}

export default Home