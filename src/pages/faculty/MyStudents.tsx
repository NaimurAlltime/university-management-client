"use client"

import { Button, Card, Table, Tag, Typography, Avatar } from "antd"
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useGetMyStudentsQuery } from "../../redux/features/faculty/facultyApi"

const { Title } = Typography

const MyStudents = () => {
  const navigate = useNavigate()
  const { registerSemesterId, courseId } = useParams()

  const { data: studentsData, isLoading } = useGetMyStudentsQuery({
    semesterRegistrationId: registerSemesterId,
    courseId: courseId,
  })

  const columns = [
    {
      title: "Student",
      key: "student",
      render: (record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.student?.profileImg} icon={<UserOutlined />} style={{ marginRight: "12px" }} />
          <div>
            <div style={{ fontWeight: "bold" }}>
              {record.student?.name?.firstName} {record.student?.name?.lastName}
            </div>
            <div style={{ color: "#666", fontSize: "12px" }}>ID: {record.student?.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: ["student", "email"],
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: ["student", "contactNo"],
      key: "contact",
    },
    {
      title: "Department",
      dataIndex: ["student", "academicDepartment", "name"],
      key: "department",
      render: (department: string) => <Tag color="blue">{department}</Tag>,
    },
    {
      title: "Faculty",
      dataIndex: ["student", "academicFaculty", "name"],
      key: "faculty",
      render: (faculty: string) => <Tag color="green">{faculty}</Tag>,
    },
    {
      title: "Enrollment Status",
      dataIndex: "courseStatus",
      key: "status",
      render: (status: string) => {
        const color = status === "ONGOING" ? "green" : status === "COMPLETED" ? "blue" : "orange"
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade: string) => (grade ? <Tag color="purple">{grade}</Tag> : <Tag color="default">Not Graded</Tag>),
    },
  ]

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/faculty/courses")}
            style={{ marginRight: "16px" }}
          >
            Back to Courses
          </Button>
          <UserOutlined style={{ fontSize: "24px", marginRight: "12px", color: "#1890ff" }} />
          <Title level={2} style={{ margin: 0 }}>
            My Students
          </Title>
        </div>

        <Table
          columns={columns}
          dataSource={studentsData?.data?.result || []}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            total: studentsData?.data?.meta?.total,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  )
}

export default MyStudents
