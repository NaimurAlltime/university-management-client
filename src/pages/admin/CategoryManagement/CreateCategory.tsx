import { FieldValues, SubmitHandler } from "react-hook-form";
import CRForm from "../../../components/form/CRForm";
import CRInput from "../../../components/form/CRInput";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../../shcema/category.schema";
import { useAddCategoyMutation } from "../../../redux/features/admin/categoryManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

function CreateCategory() {
  const [addCategory] = useAddCategoyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);

    const toastId = toast.loading("Creating...");

    const categoryData = {
      name: data.name,
    };

    try {
      console.log(categoryData);
      const res = (await addCategory(categoryData)) as TResponse;
      console.log(res);
      // if (res?.data?.success) {
      //   toast.success("Category Added Sucessfuly!");
      // }
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Category Added Successfuly!", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <CRForm onSubmit={onSubmit} resolver={zodResolver(categorySchema)}>
            <CRInput type="text" name="name" label="Category Name" />
            <Button htmlType="submit">Submit</Button>
          </CRForm>
        </Col>
      </Flex>
    </div>
  );
}

export default CreateCategory;
