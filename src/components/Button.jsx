export default function Button ({className, text, ...props}) {
  return (
    <button className={`${className} bg-gray-200/50 px-5 py-2 rounded-full cursor-pointer text-black font-bold`} {...props}>
      {text}
    </button>
  )
}