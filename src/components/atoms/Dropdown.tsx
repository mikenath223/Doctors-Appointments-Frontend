import { Button, Dropdown, MenuProps } from "antd";
import { CONSULTATION_TYPE } from "../../domain/appointment";
import { DownOutlined } from "@ant-design/icons";
import { useFormContext, useFormState } from "react-hook-form";

type option = {
  key: CONSULTATION_TYPE;
  label: string;
};

export interface ICustomDropdownProps {
  options: option[];
  onChange?: (value: CONSULTATION_TYPE) => void;
  value?: CONSULTATION_TYPE;
  label: string;
  formkey?: string;
}

export const CustomDropdown: React.FC<ICustomDropdownProps> = ({
  options,
  onChange,
  value,
  label,
  formkey,
}) => {
  const { setValue, watch } = useFormContext();
  const { errors, isValid } = useFormState();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onChange?.(e.key as CONSULTATION_TYPE);
    setValue(formkey || "consultation", e.key as CONSULTATION_TYPE, {
      shouldDirty: true,
    });
  };

  const getRenderedOptLabel = () => {
    const val = watch(formkey || "consultation") || value;
    return options.find((option) => option.key === val)?.label ?? label;
  };

  const error = errors[formkey || "consultation"];

  return (
    <div className="">
      {label && (
        <label htmlFor={label} className="text-[#505050] mb-[.3rem] block">
          {label}
        </label>
      )}
      <Dropdown
        menu={{ items: options, onClick: handleMenuClick }}
        placement="bottom"
      >
        <Button>
          <div className="flex items-center justify-between w-full gap-2">
            {getRenderedOptLabel()}
            <DownOutlined />
          </div>
        </Button>
      </Dropdown>
      {!isValid && error ? (
        <p className="text-red-500">{error.message as string}</p>
      ) : null}
    </div>
  );
};
