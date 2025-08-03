export default function Button ({className, text, ...props}) {
  return (
    <button className={`${className} bg-gray-500 px-5 py-2 rounded-full font-semibold cursor-pointer text-black`} {...props}>
      {text}
    </button>
  )
}