import { Ellipsis } from "lucide-react";
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
        <div className="flex gap-x-2 w-full">
          <img className="w-10 h-10 bg-red-50 rounded-full flex-shrink-0" src={avatar} alt="Avatar del usuario" />
          <article className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="font-bold flex gap-x-2">{username} <span className="font-normal text-gray-400 flex items-center gap-x-2"><div className="w-1 h-1 bg-gray-400 rounded-full"></div> {FormatTime(date)}</span></h2>
              <div className="cursor-pointer hover:bg-blue-400/20 hover:text-blue-500 rounded-full p-1 select-none">
                <Ellipsis onClick={(e) => {
                  setOptions(!options)
                  e.stopPropagation();
                }}/>
                {options && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOptions(false);
                      setEdit(!edit);
                    }}>Editar</button>
                    <button 
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left" 
                    onClick={(e) => {
                      setOptions(false);
                      onDelete?.();
                      e.stopPropagation();
                    }}
                    >Borrar</button>
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