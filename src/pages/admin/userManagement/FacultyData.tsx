import { Table } from "antd"
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api"

const FacultyData = () => {
  const { data: facultyData, isLoading } = useGetAllFacultiesQuery(undefined)

  const columns = [
    {
      title: "Name",
      render: (data: Record<string, any>) => {
        const fullName = `${data?.name?.firstName} ${data?.name?.middleName || ""} ${data?.name?.lastName}`
        return <span>{fullName}</span>
      },
    },
    {
      title: "User Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
  ]

  return (
    <div>
      <h1>Faculty List</h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={facultyData?.data}
        pagination={{
          total: facultyData?.meta?.total,
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default FacultyData
