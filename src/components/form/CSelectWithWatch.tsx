"use client"

import { Form, Select } from "antd"
import { useEffect } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"

type Option = { value: string; label: string; disabled?: boolean }

type TCSelectProps = {
  label: string
  name: string
  options: Option[] | undefined
  disabled?: boolean
  mode?: "multiple" | undefined
  placeholder?: string
  // Make onValueChange optional and accept any value type (string | string[] | undefined)
  onValueChange?: (value: unknown) => void
}

const CSelectWithWatch = ({ label, name, options, disabled, mode, placeholder, onValueChange }: TCSelectProps) => {
  const methods = useFormContext()
  const inputValue = useWatch({
    control: methods.control,
    name,
  })

  useEffect(() => {
    if (typeof onValueChange === "function") {
      onValueChange(inputValue)
    }
  }, [inputValue, onValueChange])

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
            placeholder={placeholder}
            optionFilterProp="label"
            showSearch
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  )
}

export default CSelectWithWatch
