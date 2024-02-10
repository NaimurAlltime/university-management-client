import { FieldValues, SubmitHandler } from "react-hook-form";
import CRForm from "../../../components/form/CRForm";
import CRInput from "../../../components/form/CRInput";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../../shcema/category.schema";

function CreateCategory() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
