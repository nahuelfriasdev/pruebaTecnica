import { Link } from "react-router-dom"
import { HomeIcon, Search, User } from "lucide-react"

export default function Nav () {

  const links = [
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Perfil", path: "/", icon: <User />},
    { name: "Explorar", path: "/", icon: <Search />}
  ]


  return(
    <>
      <h1 className="w-[25%] font-bold">TWITTER?</h1>
      <nav className="w-[25%]">
        <ul className="flex flex-col gap-4 w-[100%]">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-white text-xl hover:text-gray-400 flex items-center gap-2 font-semibold">
                {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}