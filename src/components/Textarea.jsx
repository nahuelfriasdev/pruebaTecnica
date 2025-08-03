import { useRef } from 'react';

export default function Textarea  ({className, onChange, value, ...props}) {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    if (onChange) {
      onChange(e);
    }
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 0);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      className={`w-full p-3 rounded-lg resize-none overflow-hidden focus:outline-none ${className}`}
      {...props}
      style={{
        minHeight: '60px'
      }}
    />
  );
};
