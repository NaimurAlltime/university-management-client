import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

function CRForm({ onSubmit, children, defaultValues, resolver }: TFormProps) {
  const formconfig: TFormConfig = {};

  if (defaultValues) {
    formconfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formconfig["resolver"] = resolver;
  }

  const methods = useForm(formconfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}

export default CRForm;
