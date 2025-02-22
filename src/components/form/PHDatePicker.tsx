import { DatePicker, Form } from "antd"
import { Controller } from "react-hook-form"
import dayjs from "dayjs"

interface PHDatePickerProps {
  name: string
  label?: string
  required?: boolean
  rules?: Record<string, any>
  value?: string
  onChange?: (val: any) => void
  size?: "large" | "small"
}

const PHDatePicker = ({ name, label, required, rules, size, ...props }: PHDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} required={required} help={error?.message}>
            <DatePicker
              {...field}
              style={{ width: "100%" }}
              size={size}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                // Convert to YYYY-MM-DD format when saving to form state
                field.onChange(date ? date.format("YYYY-MM-DD") : null)
              }}
            />
          </Form.Item>
        )}
      />
    </div>
  )
}

export default PHDatePicker


