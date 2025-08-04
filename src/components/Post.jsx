import { Ellipsis, SquarePen, Trash } from "lucide-react";
import FormatTime from "../utils/FormatTime";
import { useState } from "react";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

export default function Post({className, text, username, date, avatar = "https://www.gravatar.com/avatar/?d=mp", onDelete, onEdit}) {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(text);
  

  return (
    <>
      <section className={`${className} flex justify-between p-4`}>
        <div className="flex gap-x-5 w-full">
          <img className="w-10 h-10 bg-red-50 rounded-full flex-shrink-0" src={avatar} alt="Avatar del usuario" />
          <article className="w-full">
           <div className="flex justify-between items-center relative">
              <h2 className="font-bold flex gap-x-2">
                {username}
                <span className="font-normal text-gray-400 flex items-center gap-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  {FormatTime(date)}
                </span>
              </h2>

              <div className="relative">
                <button
                  className="cursor-pointer hover:bg-blue-400/20 hover:text-blue-500 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptions(!options);
                  }}
                >
                  <Ellipsis />
                </button>

                {options && (
                  <div
                    className="absolute right-0 mt-2 bg-black border border-white/10 text-white shadow-[0_0_16px_rgba(0,0,0,0.85)] z-10 shadow-gray-800/50 rounded-md w-48"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex gap-x-2 hover:bg-gray-300/10 px-4 py-2 text-sm w-full text-left"
                      onClick={() => {
                        setOptions(false)
                        setEdit(!edit);
                      }}
                    >
                      <SquarePen className="w-5 h-5" /> Editar
                    </button>
                    <button
                      className="flex gap-x-2 hover:bg-gray-300/10 px-4 py-2 text-sm w-full text-left"
                      onClick={() => {
                        setOptions(false);
                        onDelete?.();
                      }}
                    >
                      <Trash className="w-5 h-5" /> Borrar
                    </button>
                  </div>
                )}
              </div>
            </div>
            {edit ? (
              <div>
                <Textarea 
                  className="p-2 text-base mt-2" 
                  placeholder="Edita tu post" 
                  value={newText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setNewText(e.target.value)} 
                />
                <Button disabled={newText.length == 0} text="Editar" className={`${newText.length > 0 ? "bg-white" : ""} text-sm`} 
                onClick={(e) => {
                    onEdit?.(newText)
                    setEdit(!edit);
                    e.stopPropagation();
                  }
                }
                />
              </div>
            ) : (
              <p className="mt-2">{text}</p>
            )}
          </article>
        </div>
      </section>
    </>
  );
}