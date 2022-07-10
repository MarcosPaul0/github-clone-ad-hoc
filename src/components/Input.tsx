import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ placeholder, type, label, ...rest }: InputProps) {
  return (
    <div className="w-full flex items-center gap-2">
      {label && (
        <label className={`font-normal text-sm`} htmlFor={label} >
          {label}
        </label>
      )}
      <input
        id={label}
        className={`
          w-full h-10 px-4 py-2 bg-gray-600 text-gray-100 border-2 border-gray-600
          rounded-lg duration-100 transition-width ease-linear placeholder-gray-50
          ${type === 'date' && 'text-center'}
        `}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
    </div>
  );
}