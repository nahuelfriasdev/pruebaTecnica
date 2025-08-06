import { Link } from "react-router-dom"
import { HomeIcon, Search, User } from "lucide-react"

export default function Nav () {
  const links = [
    { name: "Inicio", path: "/", icon: <HomeIcon />},
    { name: "Perfil", path: "/profile", icon: <User />},
    { name: "Explorar", path: "/", icon: <Search />}
  ]

  return(
    <>
      <h1 className="w-[100%] lg:w-[25%] font-bold hidden md:block">TWITTER?</h1>
      <h1 className="w-[100%] md:hidden font-bold">TW?</h1>
      <nav className="w-[100%] lg:w-[25%]">
        <ul className="flex flex-col gap-4 w-[100%]">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-white text-xl hover:text-gray-400 flex items-center gap-2 font-semibold">
                <span>{link.icon}</span><span className="hidden text-base md:text-lg md:block">{link.name}</span> 
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}