import { Link } from "react-router-dom"
import { HomeIcon } from "lucide-react"

export default function Nav () {

  const links = [
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Inicio", path: "/", icon: <HomeIcon />},
  ]


  return(
    <>
      <h1 className="w-[25%]">LOGO</h1>
      <nav className="w-[25%]">
        <ul className="flex flex-col gap-4 w-[100%]">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-white text-xl hover:text-gray-400 flex items-center gap-2 font-bold">
                {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}