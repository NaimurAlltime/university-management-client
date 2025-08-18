"use client"

import { useState } from "react"
import { Button, Table, Tag, Space, Modal, message, Select, Input } from "antd"
import { EyeOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  useGetAllEnrollmentsQuery,
  useEnrollStudentMutation,
  useUnenrollStudentMutation,
} from "../../../redux/features/admin/enrollmentManagement.api"
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api"
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement"

const StudentEnrollments = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [enrollModalVisible, setEnrollModalVisible] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const { data: enrollments, isLoading } = useGetAllEnrollmentsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchTerm },
  ])

  const { data: students } = useGetAllStudentsQuery([])
  const { data: offeredCourses } = useGetAllOfferedCoursesQuery([])
  const [enrollStudent, { isLoading: enrolling }] = useEnrollStudentMutation()
  const [unenrollStudent] = useUnenrollStudentMutation()

  const handleEnroll = async () => {
    if (!selectedStudent || selectedCourses.length === 0) {
      message.error("Please select student and at least one course")
      return
    }

    try {
      await enrollStudent({
        studentId: selectedStudent,
        offeredCourses: selectedCourses,
      }).unwrap()
      message.success(`Student enrolled in ${selectedCourses.length} course(s) successfully`)
      setEnrollModalVisible(false)
      setSelectedStudent("")
      setSelectedCourses([])
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to enroll student")
    }
  }

  const handleUnenroll = async (enrollmentId: string) => {
    Modal.confirm({
      title: "Are you sure you want to unenroll this student?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await unenrollStudent(enrollmentId).unwrap()
          message.success("Student unenrolled successfully")
        } catch (error: any) {
          message.error(error?.data?.message || "Failed to unenroll student")
        }
      },
    })
  }

  const columns = [
    {
      title: "Student",
      key: "student",
      render: (record: any) => (
        <div>
          <div className="font-medium">
            {record.student?.name?.firstName} {record.student?.name?.lastName}
          </div>
          <div className="text-sm text-gray-500">{record.student?.id}</div>
        </div>
      ),
    },
    {
      title: "Course",
      key: "course",
      render: (record: any) => (
        <div>
          <div className="font-medium">
            {record.course?.code} - {record.course?.title}
          </div>
          <div className="text-sm text-gray-500">{record.course?.credits} Credits</div>
        </div>
      ),
    },
    {
      title: "Semester",
      key: "semester",
      render: (record: any) => (
        <div>
          <div>
            {record.academicSemester?.name} {record.academicSemester?.year}
          </div>
          <Tag color="blue">{record.semesterRegistration?.status}</Tag>
        </div>
      ),
    },
    {
      title: "Faculty",
      key: "faculty",
      render: (record: any) => (
        <div>
          {record.faculty?.name?.firstName} {record.faculty?.name?.lastName}
        </div>
      ),
    },
    {
      title: "Grade",
      key: "grade",
      render: (record: any) => (
        <div>
          <Tag color={record.grade === "NA" ? "default" : "green"}>{record.grade}</Tag>
          {record.isCompleted && <Tag color="success">Completed</Tag>}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              // Navigate to enrollment details
            }}
          >
            View
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleUnenroll(record._id)}>
            Unenroll
          </Button>
        </Space>
      ),
    },
  ]

  const studentOptions =
    students?.data?.map((student: any) => ({
      value: student._id,
      label: `${student.name?.firstName} ${student.name?.lastName} (${student.id})`,
    })) || []

  const courseOptions =
    offeredCourses?.data?.map((course: any) => ({
      value: course._id,
      label: `${course.course?.code} - ${course.course?.title}`,
    })) || []

  return (
    <div className="p-5">
      <div className="flex mb-4">
        <h1 className="text-2xl font-bold">Student Enrollments</h1>

      </div>

      <div style={{marginTop: "12px"}} className="mb-4 flex items-center justify-between">
        <Input.Search
          placeholder="Search by student name or course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
       <Button style={{marginLeft: "620px"}} type="primary" icon={<PlusOutlined />} onClick={() => setEnrollModalVisible(true)}>
          Enroll Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={enrollments?.data || []}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: limit,
          total: enrollments?.meta?.total || 0,
          onChange: (newPage, newLimit) => {
            setPage(newPage)
            setLimit(newLimit || 10)
          },
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} enrollments`,
        }}
      />

      <Modal
        title="Enroll Student in Multiple Courses"
        open={enrollModalVisible}
        onOk={handleEnroll}
        onCancel={() => {
          setEnrollModalVisible(false)
          setSelectedStudent("")
          setSelectedCourses([])
        }}
        confirmLoading={enrolling}
        width={600}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Student</label>
            <Select
              style={{ width: "100%" }}
              placeholder="Choose a student"
              value={selectedStudent}
              onChange={setSelectedStudent}
              options={studentOptions}
              showSearch
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Select Courses (Multiple Selection Allowed)</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Choose courses (you can select multiple)"
              value={selectedCourses}
              onChange={setSelectedCourses}
              options={courseOptions}
              showSearch
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              maxTagCount="responsive"
            />
            <div className="text-sm text-gray-500 mt-1">Selected {selectedCourses.length} course(s)</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentEnrollments
