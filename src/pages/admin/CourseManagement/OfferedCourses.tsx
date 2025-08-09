import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetAllOfferedCoursesQuery } from '../../../redux/features/admin/courseManagement';
import { TOfferedCourse } from '../../../types/courseManagement.type';
import { useMemo } from 'react';

const OfferedCourses = () => {
  const { data, isLoading } = useGetAllOfferedCoursesQuery(undefined);

  const dataSource: TOfferedCourse[] = useMemo(() => data?.data || [], [data]);

  const columns: ColumnsType<any> = [
    {
      title: 'Course',
      dataIndex: ['course', 'title'],
      key: 'course',
      render: (_, row: TOfferedCourse) => `${row.course?.prefix ?? ''}${row.course?.code ?? ''} - ${row.course?.title ?? ''}`,
    },
    {
      title: 'Semester',
      dataIndex: ['semesterRegistration', 'academicSemester'],
      key: 'semester',
      render: (_, row: TOfferedCourse) => {
        const sem = row.semesterRegistration?.academicSemester as any;
        return sem ? `${sem.name ?? ''} ${sem.year ?? ''}` : '';
      },
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Faculty',
      dataIndex: ['faculty', 'name'],
      key: 'faculty',
      render: (_, row: TOfferedCourse) => {
        const n = row.faculty?.name;
        if (!n) return row.faculty?.email || '-';
        return `${n.firstName}${n.middleName ? ' ' + n.middleName : ''} ${n.lastName}`;
      },
    },
    {
      title: 'Schedule',
      key: 'schedule',
      render: (_, row: TOfferedCourse) => {
        return (
          <div className="space-x-2">
            <Tag>{row.classDays?.join(', ')}</Tag>
            <Tag>
              {row.startTime} - {row.endTime}
            </Tag>
            {row.room ? <Tag color="purple">{row.room}</Tag> : null}
          </div>
        );
      },
    },
    {
      title: 'Capacity',
      dataIndex: 'maxCapacity',
      key: 'capacity',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Offered Courses</h2>
      <Table
        rowKey={(r) => r._id}
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OfferedCourses;
