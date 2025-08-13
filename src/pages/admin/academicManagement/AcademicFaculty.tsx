import { Table, type TableColumnsType } from "antd"
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api"
import type { TAcademicFaculty } from "../../../types"

const AcademicFaculty = () => {
  const { data: facultiesData, isLoading } = useGetAcademicFacultiesQuery(undefined)

  const tableData = facultiesData?.data?.map(({ _id, name, createdAt }: TAcademicFaculty) => ({
    key: _id,
    name,
    createdAt: new Date(createdAt).toLocaleDateString(),
  }))

  const columns: TableColumnsType = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Created Date",
      key: "createdAt",
      dataIndex: "createdAt",
    },
  ]

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Academic Faculties</h2>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  )
}

export default AcademicFaculty
