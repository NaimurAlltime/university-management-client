"use client"

import { Form, Select } from "antd"
import { Controller } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"

type SelectOptions = {
  value: string
  label: string
  disabled?: boolean
}

type CSelectProps = {
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
  onValueChange?: (value: string | string[]) => void
  defaultValue?: string | string[]
}

const CSelect = ({
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
  onValueChange,
  defaultValue,
}: CSelectProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={rules}
        defaultValue={defaultValue}
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
              onChange={(value) => {
                field.onChange(value)
                if (onValueChange) {
                  onValueChange(value)
                }
              }}
            />
          </Form.Item>
        )}
      />
    </div>
  )
}

export default CSelect
