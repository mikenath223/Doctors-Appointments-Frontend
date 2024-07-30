/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

interface CustomInput {
  label?: string;
  placeholder?: string;
  className?: string;
  type?: "password" | "text" | "date" | "textArea";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  value?: string;
  readOnly?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInput> = ({
  label,
  placeholder,
  type = "text",
  onChange,
  error,
  value,
  readOnly,
  className,
  suffix,
  prefix,
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={label} className="text-[#505050] mb-[.3rem]">
          {label}
        </label>
      )}
      {type === "text" && (
        <Input
          readOnly={readOnly}
          id={label}
          className={`h-[48px] w-[100%] text-lg ${className}`}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          prefix={prefix}
          suffix={suffix}
        />
      )}
      {type === "password" && (
        <Input.Password
          readOnly={readOnly}
          id={label}
          className={`h-[48px] w-[100%] text-lg ${className}`}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      )}

      {type === "textArea" && (
        <Input.TextArea
          readOnly={readOnly}
          id={label}
          className={`h-[400px] w-[100%] text-lg ${className}`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e as any)}
        />
      )}
      {error && (
        <p className="text-xs text-red-600 ml-[.4rem] capitalize">{error}</p>
      )}
    </div>
  );
};
