import { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  initialValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function Select({ initialValue, options, ...rest }: SelectProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <select
        className={`
          w-full h-10 px-4 py-2 bg-gray-600 text-gray-100
          rounded-lg duration-100 transition-width ease-linear
        `}
        defaultValue={initialValue}
        {...rest}
      >
        <option value="" hidden>{initialValue}</option>
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          );
        })}
        
      </select>
    </div>
  );
}