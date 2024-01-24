import { FormProvider, useForm } from "react-hook-form";

function CRForm({ onSubmit, children }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default CRForm;
