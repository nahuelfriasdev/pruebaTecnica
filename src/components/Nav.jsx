import { Link } from "react-router-dom"
import { HomeIcon } from "lucide-react"

export default function Nav () {

  const links = [
    { name: "Inicio", path: "/", icon: <HomeIcon />},
  ]


  return(
    <>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-white hover:text-gray-400 flex items-center gap-2 font-semibold">
                {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}