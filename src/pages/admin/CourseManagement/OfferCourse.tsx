import { Button, Col, Form, Row, Select, message } from 'antd';
import CForm from '../../../components/form/CForm';
import CInput from '../../../components/form/CInput';
import CSelectWithWatch from '../../../components/form/CSelectWithWatch';
import CTimePicker from '../../../components/form/CTimePicker';
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from '../../../redux/features/admin/courseManagement';
import { useMemo, useState } from 'react';
import { TCourse, TFacultyBrief, TSemester } from '../../../types/courseManagement.type';

type TFormValues = {
  semesterRegistration: string;
  course: string;
  section: number;
  maxCapacity: number;
  faculty: string;
  classDays: string[];
  startTime: string; // from CTimePicker (string or dayjs) -> we convert to HH:mm
  endTime: string;
  room?: string;
};

const daysOptions = [
  { label: 'Sat', value: 'SAT' },
  { label: 'Sun', value: 'SUN' },
  { label: 'Mon', value: 'MON' },
  { label: 'Tue', value: 'TUE' },
  { label: 'Wed', value: 'WED' },
  { label: 'Thu', value: 'THU' },
  { label: 'Fri', value: 'FRI' },
];

const OfferCourse = () => {
  const [form] = Form.useForm<TFormValues>();

  const { data: semestersResp } = useGetAllRegisteredSemestersQuery(undefined);
  const { data: coursesResp } = useGetAllCoursesQuery(undefined);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  // Fetch faculties for selected course
  const { data: courseFacultiesResp } = useGetCourseFacultiesQuery(selectedCourseId!, {
    skip: !selectedCourseId,
  });

  const semesterOptions = useMemo(
    () =>
      (semestersResp?.data || []).map((s: TSemester) => ({
        label: `${s.academicSemester?.name ?? ''} ${s.academicSemester?.year ?? ''} - ${s.status}`,
        value: s._id,
      })),
    [semestersResp]
  );

  const courseOptions = useMemo(
    () =>
      (coursesResp?.data || []).map((c: TCourse) => ({
        label: `${c.prefix}${c.code} - ${c.title}`,
        value: c._id,
      })),
    [coursesResp]
  );

  const facultyOptions = useMemo(() => {
    const list: TFacultyBrief[] = courseFacultiesResp?.data || [];
    return list.map((f) => ({
      label:
        f?.name
          ? `${f.name.firstName}${f.name.middleName ? ' ' + f.name.middleName : ''} ${f.name.lastName}`
          : f.email || f._id,
      value: f._id,
    }));
  }, [courseFacultiesResp]);

  const [createOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation();

  const onSubmit = async (values: TFormValues) => {
    try {
      const toHHmm = (val: any) => {
        if (!val) return '';
        // CTimePicker may return Dayjs/string; support both
        if (typeof val === 'string') return val;
        if (val?.format) return val.format('HH:mm');
        return String(val);
      };

      const payload = {
        ...values,
        section: Number(values.section),
        maxCapacity: Number(values.maxCapacity),
        startTime: toHHmm(values.startTime),
        endTime: toHHmm(values.endTime),
      };

      const res: any = await createOfferedCourse(payload);
      if (res?.data?.success || res?.data?._id) {
        message.success('Offered course created successfully');
        form.resetFields();
        setSelectedCourseId(undefined);
      } else if (res?.error?.data?.message) {
        message.error(res.error.data.message);
      } else {
        message.error('Failed to create offered course');
      }
    } catch {
      message.error('Failed to create offered course');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Offer Course</h2>
      <CForm onSubmit={onSubmit as any}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <CSelectWithWatch
              name="semesterRegistration"
              label="Registered Semester"
              placeholder="Select registered semester"
              options={semesterOptions}
            />
          </Col>
          <Col xs={24} md={12}>
            <CSelectWithWatch
              name="course"
              label="Course"
              placeholder="Select course"
              options={courseOptions}
              onValueChange={(val) => setSelectedCourseId(val as string)}
            />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="section" type="number" label="Section" placeholder="e.g. 1" />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="maxCapacity" type="number" label="Max Capacity" placeholder="e.g. 30" />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="faculty" label="Faculty" rules={[{ required: true, message: 'Faculty is required' }]}>
              <Select
                placeholder="Select faculty"
                options={facultyOptions}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="classDays" label="Class Days" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select class days" options={daysOptions} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <CTimePicker name="startTime" label="Start Time" />
          </Col>
          <Col xs={12} md={6}>
            <CTimePicker name="endTime" label="End Time" />
          </Col>
          <Col xs={24} md={12}>
            <CInput name="room" label="Room" placeholder="e.g. R-201" />
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Offer Course
          </Button>
        </div>
      </CForm>
    </div>
  );
};

export default OfferCourse;
