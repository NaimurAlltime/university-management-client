import { Button, Col, Form, Row, Select, message } from 'antd';
import CForm from '../../../components/form/CForm';
import CInput from '../../../components/form/CInput';
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement';
import { TCourse } from '../../../types/courseManagement.type';
import { useMemo, useState } from 'react';

type TFormValues = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses?: string[];
};

const CreateCourse = () => {
  const [form] = Form.useForm<TFormValues>();
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const { data: coursesResp } = useGetAllCoursesQuery(undefined);
  const [selectedPreReqs, setSelectedPreReqs] = useState<string[]>([]);

  const courseOptions = useMemo(
    () =>
      (coursesResp?.data || []).map((c: TCourse) => ({
        label: `${c.prefix}${c.code} - ${c.title}`,
        value: c._id,
      })),
    [coursesResp]
  );

  const onSubmit = async (values: TFormValues) => {
    try {
      const payload = {
        title: values.title,
        prefix: values.prefix,
        code: Number(values.code),
        credits: Number(values.credits),
        preRequisiteCourses: (values.preRequisiteCourses || []).map((id) => ({
          course: id,
          isDeleted: false,
        })),
      };
      const res: any = await addCourse(payload);
      if (res?.data?.success || res?.data?._id) {
        message.success('Course created successfully');
        form.resetFields();
        setSelectedPreReqs([]);
      } else if (res?.error?.data?.message) {
        message.error(res.error.data.message);
      } else {
        message.error('Failed to create course');
      }
    } catch (e) {
      message.error('Failed to create course');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create Course</h2>
      <CForm onSubmit={onSubmit as any}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <CInput name="title" label="Title" placeholder="e.g. Data Structures" />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="prefix" label="Prefix" placeholder="e.g. CSE" />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="code" type="number" label="Code" placeholder="e.g. 2201" />
          </Col>
          <Col xs={24} md={6}>
            <CInput name="credits" type="number" label="Credits" placeholder="e.g. 3" />
          </Col>
          <Col xs={24}>
            <div className="mb-2 font-medium">Pre-requisite Courses</div>
            <Form.Item name="preRequisiteCourses" className="!mb-0">
              <Select
                mode="multiple"
                placeholder="Select pre-requisite courses"
                options={courseOptions}
                value={selectedPreReqs}
                onChange={setSelectedPreReqs}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </div>
      </CForm>
    </div>
  );
};

export default CreateCourse;
