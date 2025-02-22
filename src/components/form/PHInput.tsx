import type React from "react"
import { Form, Input } from "antd"
import { Controller } from "react-hook-form"

type TInputProps = {
  type: string
  name: string
  label?: string
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  size?: "large" | "middle" | "small"
  style?: React.CSSProperties
}

const PHInput = ({ type, name, label, disabled, prefix, suffix, placeholder, style  }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="middle"
              disabled={disabled}
              prefix={prefix}
              suffix={suffix}
              placeholder={placeholder}
              style={style}
            />
          </Form.Item>
        )}
      />
    </div>
  )
}

export default PHInput

