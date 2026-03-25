import React from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  large?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function InputField({
  label,
  placeholder = "",
  value,
  type = "text",
  large = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Input OR Textarea */}
      {large ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}