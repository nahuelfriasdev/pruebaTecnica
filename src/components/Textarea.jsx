export default function Textarea ({className, placeholder, ...props}) {
  return (
    <>
      <textarea 
      className={`${className} w-full p-2 focus:outline-none resize-none overflow-hidden`} 
      placeholder={placeholder}
      {...props}
      />
    </>
  )
}