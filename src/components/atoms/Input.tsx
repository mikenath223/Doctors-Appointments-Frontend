/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { useFormContext } from "react-hook-form";

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
  formkey?: string;
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
  formkey,
}) => {
  const { watch, setValue } = useFormContext() ?? {};

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
          className={`h-[400px] w-[100%] text-lg ${className}`}
          value={watch(formkey || "purpose") || value}
          onChange={(e) => {
            setValue(formkey || "purpose", e.target.value);
            onChange && onChange(e as any);
          }}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="text-xs text-red-600 ml-[.4rem] -mt-3 capitalize">
          {error}
        </p>
      )}
    </div>
  );
};
