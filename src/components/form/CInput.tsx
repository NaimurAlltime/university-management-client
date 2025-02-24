import { Form, Input } from "antd"
import { Controller } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"
import type { Input as AntInput } from "antd"

type CInputProps = {
  type?: string
  name: string
  label?: string
  required?: boolean
  value?: string | undefined
  placeholder?: string
  disabled?: boolean
  rules?: RegisterOptions
  id?: string
  size?: "large" | "small"
} & Partial<typeof AntInput>

const CInput = ({
  type = "text",
  name,
  label,
  required = false,
  value,
  placeholder,
  disabled = false,
  rules,
  id,
  size = "large",
  ...props
}: CInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} required={required} help={error?.message}>
            {type === "password" ? (
              <Input.Password
                {...field}
                type={type}
                size={size}
                placeholder={placeholder}
                value={value || field.value}
                disabled={disabled}
                {...props}
              />
            ) : type === "textarea" ? (
              <Input.TextArea
                {...field}
                size={size}
                placeholder={placeholder}
                value={value || field.value}
                disabled={disabled}
                {...props}
              />
            ) : (
              <Input
                {...field}
                type={type}
                size={size}
                placeholder={placeholder}
                value={value || field.value}
                disabled={disabled}
                {...props}
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  )
}

export default CInput



