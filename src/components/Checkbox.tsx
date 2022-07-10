import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <div className={`flex items-center gap-2`}>
      <input
        id={label}
        type="checkbox"
        className={`
          w-4 h-4 text-blue-600 rounded-lg
          focus:ring-blue-500 dark:focus:ring-blue-600
          dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
        `}
        {...rest}
      />
      <label htmlFor={label} className={``}>
        {label}
      </label>
    </div>
  );
}
