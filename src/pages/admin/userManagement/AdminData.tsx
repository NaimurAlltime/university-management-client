import { Table } from "antd"
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api"

const AdminData = () => {
  const { data: adminData, isLoading } = useGetAllAdminsQuery(undefined)

  const columns = [
    {
      title: "Name",
      render: (data: Record<string, any>) => {
        const fullName = `${data?.name?.firstName} ${data?.name?.middleName || ""} ${data?.name?.lastName}`
        return <span>{fullName}</span>
      },
    },
    {
        title: 'User Id',
        dataIndex: 'id',
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
      <h1>Admin List</h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={adminData?.data}
        pagination={{
          total: adminData?.meta?.total,
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default AdminData

