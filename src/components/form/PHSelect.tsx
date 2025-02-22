import { Form, Select } from "antd"
import { Controller } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"

type SelectOptions = {
  value: string
  label: string
  disabled?: boolean
}

type PHSelectProps = {
  name: string
  label?: string
  required?: boolean
  options: SelectOptions[]
  disabled?: boolean
  rules?: RegisterOptions
  size?: "large" | "small"
  placeholder?: string
  mode?: "multiple" | undefined
  loading?: boolean
}

const PHSelect = ({
  name,
  label,
  required = false,
  options,
  disabled = false,
  rules,
  size = "large",
  placeholder = "Select",
  mode,
  loading = false,
}: PHSelectProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} required={required} help={error?.message}>
            <Select
              {...field}
              size={size}
              options={options}
              disabled={disabled}
              placeholder={placeholder}
              mode={mode}
              loading={loading}
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  )
}

export default PHSelect


