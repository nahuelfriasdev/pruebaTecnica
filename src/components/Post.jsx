import { Ellipsis } from "lucide-react";
import FormatTime from "../utils/FormatTime";
import { useState } from "react";

export default function Post({className, text, username, date, avatar = "https://www.gravatar.com/avatar/?d=mp", onDelete}) {
  const [options, setOptions] = useState(false);
  

  return (
    <>
      <section className={`${className} flex justify-between p-4`}>
        <div className="flex gap-x-2 w-full">
          <img className="w-10 h-10 bg-red-50 rounded-full flex-shrink-0" src={avatar} alt="Avatar del usuario" />
          <article className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="font-bold flex gap-x-2">{username} <span className="font-normal text-gray-400 flex items-center gap-x-2"><div className="w-1 h-1 bg-gray-400 rounded-full"></div> {FormatTime(date)}</span></h2>
              <button className="cursor-pointer hover:bg-blue-400/20 hover:text-blue-500 rounded-full p-1"  onClick={(e) => {e.stopPropagation()}}>
                <Ellipsis onClick={() => setOptions(!options)}/>
                {options && (
                  <div
                    className="absolute bg-white shadow-lg rounded-md mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setOptions(false)}
                    >
                      Editar
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                      onClick={() => {
                        setOptions(false);
                        onDelete?.();
                      }}
                    >
                      Borrar
                    </button>
                  </div>
                )}
              </button>
            </div>
            <span>{text}</span>
          </article>
        </div>
      </section>
    </>
  );
}