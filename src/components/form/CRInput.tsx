import { Input } from "antd";
import { Controller } from "react-hook-form";

function CRInput({ type, name, label }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
}

export default CRInput;
