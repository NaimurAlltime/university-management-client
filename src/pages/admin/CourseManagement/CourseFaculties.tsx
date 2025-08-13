"use client"

import { Table, Tag } from "antd"
import type { TableColumnsType } from "antd"
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement"
import { useState } from "react"
import type { TCourse } from "../../../types"

interface CourseWithFaculties extends TCourse {
  faculties?: Array<{
    _id: string
    name: string
    email?: string
  }>
}

const CourseFaculties = () => {
  const [params, setParams] = useState<any[]>([])
  const { data: coursesData, isLoading, isFetching } = useGetAllCoursesQuery(params)

  const tableData = coursesData?.data?.map(({ _id, title, prefix, code, credits, faculties }) => ({
    key: _id,
    _id,
    title,
    prefix,
    code,
    credits,
    faculties: faculties || [],
  }))

  const columns: TableColumnsType<CourseWithFaculties> = [
    {
      title: "Course Code",
      key: "courseCode",
      render: (_, record) => `${record.prefix}${record.code}`,
      width: 120,
    },
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
      width: 80,
      align: "center",
    },
    {
      title: "Assigned Faculties",
      key: "faculties",
      render: (_, record) => {
        if (!record.faculties || record.faculties.length === 0) {
          return <Tag color="red">No faculties assigned</Tag>
        }

        return (
          <div>
            {record.faculties.map((faculty) => (
              <Tag key={faculty._id} color="blue" style={{ marginBottom: 4 }}>
                {faculty.name}
              </Tag>
            ))}
          </div>
        )
      },
    },
    {
      title: "Faculty Count",
      key: "facultyCount",
      render: (_, record) => record.faculties?.length || 0,
      width: 100,
      align: "center",
    },
  ]

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (extra.action === "paginate") {
      const args = []
      args.push({ name: "page", value: pagination.current })
      args.push({ name: "limit", value: pagination.pageSize })
      setParams(args)
    }
  }

  return (
    <Table
      loading={isLoading || isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      pagination={{
        total: coursesData?.meta?.total,
        pageSize: coursesData?.meta?.limit,
        current: coursesData?.meta?.page,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
      }}
      scroll={{ x: 800 }}
    />
  )
}

export default CourseFaculties
