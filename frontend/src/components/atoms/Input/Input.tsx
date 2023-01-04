import React, { FC, useEffect, useState } from "react";
import { createModuleStyleExtractor } from "../../../utils/css";
import { noop } from "../../../utils/noop";
import styles from "./Input.module.scss";
const cx = createModuleStyleExtractor(styles);

export interface IInputProps {
  type: "text" | "number" | "date" | "password" | "email";
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string, name: string) => void;
  name?: string;
  className?: string;
  readonly?: boolean;
}

export const Input: FC<IInputProps> = ({
  type,
  value,
  id,
  placeholder = "",
  disabled = false,
  onChange = noop,
  className = "",
  readonly = false,
}) => {
  const [state, setState] = useState<string>(`${value}`);

  useEffect(() => {
    if ((value && value.trim() === "") || value === "") {
      setState(value); // input cleared
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setState(value);
    }
  }, [value]);

  return (
    <input
      autoComplete={"off"}
      readOnly={readonly}
      id={id}
      disabled={disabled}
      className={cx([className, disabled ? "a-input--disabled" : ""])}
      type={type}
      value={state}
      placeholder={placeholder}
      onChange={
        disabled
          ? noop
          : (ev) => {
              setState(ev.target.value);
              onChange(ev.target.value, ev.target.id);
            }
      }
    />
  );
};
