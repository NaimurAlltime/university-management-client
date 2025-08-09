import { Button, Space, Table, Tag, type TableColumnsType } from "antd"
import { useGetAllRegisteredSemestersQuery, useUpdateRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement"
import type { TSemester } from "../../../types/courseManagement.type"
import { message } from "antd"

type TRow = {
  key: string
  name: string
  status: string
  startDate: string
  endDate: string
  minCredit: number
  maxCredit: number
  raw: TSemester
}

const statusColor: Record<string, string> = {
  UPCOMING: "blue",
  ONGOING: "gold",
  ENDED: "green",
}

const RegisteredSemesters = () => {
  const { data, isLoading, isFetching } = useGetAllRegisteredSemestersQuery(undefined)
  const [updateRegisteredSemester, { isLoading: updating }] = useUpdateRegisteredSemesterMutation()

  const rows: TRow[] =
    data?.data?.map((s) => ({
      key: s._id,
      name: `${s.academicSemester?.name} ${s.academicSemester?.year}`,
      status: s.status,
      startDate: new Date(s.startDate).toLocaleString(),
      endDate: new Date(s.endDate).toLocaleString(),
      minCredit: s.minCredit,
      maxCredit: s.maxCredit,
      raw: s,
    })) || []

  const handleStart = async (record: TRow) => {
    try {
      const res: any = await updateRegisteredSemester({ id: record.key, data: { status: "ONGOING" } }).unwrap()
      if (res?.success) {
        message.success("Registration started")
      } else {
        message.error(res?.message || "Failed to start registration")
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Something went wrong")
    }
  }

  const handleEnd = async (record: TRow) => {
    try {
      const res: any = await updateRegisteredSemester({ id: record.key, data: { status: "ENDED" } }).unwrap()
      if (res?.success) {
        message.success("Registration ended")
      } else {
        message.error(res?.message || "Failed to end registration")
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Something went wrong")
    }
  }

  const columns: TableColumnsType<TRow> = [
    { title: "Semester", dataIndex: "name", key: "name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => <Tag color={statusColor[val] || "default"}>{val}</Tag>,
      filters: [
        { text: "Upcoming", value: "UPCOMING" },
        { text: "Ongoing", value: "ONGOING" },
        { text: "Ended", value: "ENDED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Min Credit", dataIndex: "minCredit", key: "minCredit", width: 120 },
    { title: "Max Credit", dataIndex: "maxCredit", key: "maxCredit", width: 120 },
    {
      title: "Action",
      key: "action",
      width: 240,
      render: (_, record) => {
        const canStart = record.status === "UPCOMING"
        const canEnd = record.status === "ONGOING"
        return (
          <Space>
            <Button type="primary" disabled={!canStart} loading={updating} onClick={() => handleStart(record)}>
              Start
            </Button>
            <Button danger disabled={!canEnd} loading={updating} onClick={() => handleEnd(record)}>
              End
            </Button>
          </Space>
        )
      },
    },
  ]

  return <Table loading={isLoading || isFetching} columns={columns} dataSource={rows} rowKey="key" />
}

export default RegisteredSemesters
