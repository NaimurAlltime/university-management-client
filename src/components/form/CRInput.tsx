import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

function CRInput({ type, name, label }: TInputProps) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
            {error && <small style={{ color: "red" }}> {error.message} </small>}
          </Form.Item>
        )}
      />
    </div>
  );
}

export default CRInput;
