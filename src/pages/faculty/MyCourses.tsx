"use client"

import { Button, Card, Table, Tag, Typography } from "antd"
import { BookOutlined, EyeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useGetMyCoursesQuery } from "../../redux/features/faculty/facultyApi"

const { Title } = Typography

const MyCourses = () => {
  const navigate = useNavigate()
  const { data: coursesData, isLoading } = useGetMyCoursesQuery({})

  const handleViewStudents = (semesterRegistrationId: string, courseId: string) => {
    navigate(`/faculty/courses/${semesterRegistrationId}/${courseId}`)
  }

  const columns = [
    {
      title: "Course Code",
      dataIndex: ["course", "code"],
      key: "courseCode",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Course Title",
      dataIndex: ["course", "title"],
      key: "courseTitle",
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      key: "credits",
      render: (credits: number) => <Tag color="blue">{credits} Credits</Tag>,
    },
    {
      title: "Semester",
      dataIndex: ["semesterRegistration", "academicSemester"],
      key: "semester",
      render: (semester: any) => (
        <div>
          <div>{semester?.name}</div>
          <small style={{ color: "#666" }}>{semester?.year}</small>
        </div>
      ),
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      render: (section: number) => <Tag color="green">Section {section}</Tag>,
    },
    {
      title: "Days",
      dataIndex: "classDays", // Changed from "days" to "classDays" to match backend schema
      key: "classDays",
      render: (classDays: string[]) => (
        <div>
          {classDays?.map((day) => (
            <Tag key={day} color="orange">
              {day}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Time",
      key: "time",
      render: (record: any) => (
        <div>
          {record.startTime} - {record.endTime}
        </div>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room: string) => <Tag color="purple">{room}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewStudents(record.semesterRegistration._id, record.course._id)}
        >
          View Students
        </Button>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <BookOutlined style={{ fontSize: "24px", marginRight: "12px", color: "#1890ff" }} />
          <Title level={2} style={{ margin: 0 }}>
            My Courses
          </Title>
        </div>

        <Table
          columns={columns}
          dataSource={coursesData?.data?.result || []}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            total: coursesData?.data?.meta?.total,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  )
}

export default MyCourses
