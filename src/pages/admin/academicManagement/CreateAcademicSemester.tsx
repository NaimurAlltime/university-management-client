import { FieldValues, SubmitHandler } from 'react-hook-form';
import CForm from '../../../components/form/CForm';
import { Button, Col, Flex } from 'antd';
import CSelect from '../../../components/form/CSelect';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';

import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';
import { TResponse } from '../../../types/global';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <CForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <CSelect label="Name" name="name" options={semesterOptions} />
          <CSelect label="Year" name="year" options={yearOptions} />
          <CSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <CSelect label="End Month" name="endMonth" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </CForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
