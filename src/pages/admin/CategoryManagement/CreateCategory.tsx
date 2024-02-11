import { FieldValues, SubmitHandler } from "react-hook-form";
import CRForm from "../../../components/form/CRForm";
import CRInput from "../../../components/form/CRInput";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../../shcema/category.schema";
import { useAddCategoyMutation } from "../../../redux/features/admin/categoryManagement.api";
import { toast } from "sonner";

function CreateCategory() {
  const [addCategory] = useAddCategoyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);

    const categoryData = {
      name: data.name,
    };

    try {
      console.log(categoryData);
      const res = await addCategory(categoryData);
      console.log(res);
      // if (res?.data?.success) {
      //   toast.success("Category Added Sucessfuly!");
      // }
    } catch {
      toast.error("Something went wrong!");
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
