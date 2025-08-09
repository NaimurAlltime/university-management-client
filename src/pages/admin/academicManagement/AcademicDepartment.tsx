import type React from "react"
import { Card, Table, Typography, Tag, Space } from "antd"
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api"

const { Title, Text } = Typography

type TAcademicDepartmentRow = {
  _id: string
  name: string
  academicFaculty?: {
    _id: string
    name: string
  }
  createdAt?: string
  updatedAt?: string
}

const AcademicDepartment: React.FC = () => {
  const { data: deptResp, isLoading, isError, error } = useGetAcademicDepartmentsQuery(undefined)

  const data: TAcademicDepartmentRow[] = deptResp?.data || []

  const columns = [
    {
      title: "Department",
      dataIndex: "name",
      key: "name",
      render: (val: string) => <Text strong>{val}</Text>,
    },
    {
      title: "Faculty",
      dataIndex: ["academicFaculty", "name"],
      key: "academicFaculty",
      render: (_: any, record: TAcademicDepartmentRow) => {
        const facultyName = record?.academicFaculty?.name || "N/A"
        return <Tag color="geekblue">{facultyName}</Tag>
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string | undefined) => (val ? new Date(val).toLocaleString() : "-"),
      responsive: ["lg"],
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val: string | undefined) => (val ? new Date(val).toLocaleString() : "-"),
      responsive: ["xl"],
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Card>
        <Title level={4} style={{ margin: 0 }}>
          Academic Departments
        </Title>
        <Text type="secondary">Browse and manage academic departments.</Text>
      </Card>

      <Card>
        <Table
          rowKey={(row: TAcademicDepartmentRow) => row._id}
          loading={isLoading}
          dataSource={data}
          columns={columns as any}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          locale={{
            emptyText: isError ? (error as any)?.data?.message || "Failed to load departments" : "No departments found",
          }}
        />
      </Card>
    </Space>
  )
}

export default AcademicDepartment
