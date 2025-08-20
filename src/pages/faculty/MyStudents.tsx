"use client"

import {
  Button,
  Card,
  Table,
  Tag,
  Typography,
  Avatar,
  Modal,
  Form,
  InputNumber,
  Space,
  message,
  Descriptions,
} from "antd"
import { UserOutlined, ArrowLeftOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useGetMyStudentsQuery, useUpdateEnrolledCourseMarksMutation } from "../../redux/features/faculty/facultyApi"

const { Title } = Typography

interface GradeModalData {
  enrolledCourseId: string
  offeredCourseId: string // Added offeredCourseId to store the actual offered course ID
  studentId: string
  studentName: string
  currentMarks: {
    classTest1: number
    midTerm: number
    classTest2: number
    attendance: number
    finalTerm: number
  }
  currentGrade: string
  currentGradePoints: number
}

const MyStudents = () => {
  const navigate = useNavigate()
  const { registerSemesterId, courseId } = useParams()
  const [isGradeModalVisible, setIsGradeModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<GradeModalData | null>(null)
  const [form] = Form.useForm()

  const {
    data: studentsData,
    isLoading,
    refetch,
  } = useGetMyStudentsQuery({
    semesterRegistrationId: registerSemesterId,
    courseId: courseId,
  })

  console.log("Students data:", studentsData) // Added debugging to see the structure of studentsData;
  const [updateMarks, { isLoading: isUpdating }] = useUpdateEnrolledCourseMarksMutation()

  const openGradeModal = (record: any) => {
    console.log("Record data:", record) // Added debugging to see the record structure

    const gradeData: GradeModalData = {
      enrolledCourseId: record._id,
      offeredCourseId: record.offeredCourse?._id || record.offeredCourse, // Get the actual offered course ID
      studentId: record.student._id,
      studentName: `${record.student.name.firstName} ${record.student.name.lastName}`,
      currentMarks: record.courseMarks || {
        classTest1: 0,
        midTerm: 0,
        classTest2: 0,
        attendance: 0,
        finalTerm: 0,
      },
      currentGrade: record.grade || "NA",
      currentGradePoints: record.gradePoints || 0,
    }

    console.log("Grade data prepared:", gradeData) // Added debugging to see prepared data

    setSelectedStudent(gradeData)
    form.setFieldsValue(gradeData.currentMarks)
    setIsGradeModalVisible(true)
  }

  const viewStudentDetails = (record: any) => {
    const gradeData: GradeModalData = {
      enrolledCourseId: record._id,
      offeredCourseId: record.offeredCourse?._id || record.offeredCourse, // Get the actual offered course ID
      studentId: record.student._id,
      studentName: `${record.student.name.firstName} ${record.student.name.lastName}`,
      currentMarks: record.courseMarks || {
        classTest1: 0,
        midTerm: 0,
        classTest2: 0,
        attendance: 0,
        finalTerm: 0,
      },
      currentGrade: record.grade || "NA",
      currentGradePoints: record.gradePoints || 0,
    }

    setSelectedStudent(gradeData)
    setIsViewModalVisible(true)
  }

  const handleGradeSubmit = async (values: any) => {
    if (!selectedStudent) return

    console.log("Submitting grade data:", {
      semesterRegistration: registerSemesterId,
      offeredCourse: selectedStudent.offeredCourseId, // Now using the correct offered course ID
      student: selectedStudent.studentId,
      courseMarks: values,
    }) // Added debugging to see what's being sent

    try {
      await updateMarks({
        semesterRegistration: registerSemesterId,
        offeredCourse: selectedStudent.offeredCourseId, // Fixed to use offeredCourseId instead of enrolledCourseId
        student: selectedStudent.studentId,
        courseMarks: values,
      }).unwrap()

      message.success("Marks updated successfully!")
      setIsGradeModalVisible(false)
      refetch()
    } catch (error: any) {
      console.log("Error updating marks:", error) // Added error debugging
      message.error(error?.data?.message || "Failed to update marks")
    }
  }

  const getGradeColor = (grade: string) => {
    const gradeColors: Record<string, string> = {
      "A+": "green",
      A: "green",
      "A-": "green",
      "B+": "blue",
      B: "blue",
      "B-": "blue",
      "C+": "orange",
      C: "orange",
      "C-": "orange",
      "D+": "red",
      D: "red",
      F: "red",
      NA: "default",
    }
    return gradeColors[grade] || "default"
  }

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
      title: "Grade",
      key: "gradeInfo",
      render: (record: any) => (
        <div>
          <Tag color={getGradeColor(record.grade || "NA")}>{record.grade || "NA"}</Tag>
          {record.gradePoints > 0 && (
            <div style={{ fontSize: "12px", color: "#666" }}>{record.gradePoints.toFixed(2)} GP</div>
          )}
        </div>
      ),
    },
    {
      title: "Total Marks",
      key: "totalMarks",
      render: (record: any) => {
        const marks = record.courseMarks || {}
        const total =
          (marks.classTest1 || 0) +
          (marks.midTerm || 0) +
          (marks.classTest2 || 0) +
          (marks.attendance || 0) +
          (marks.finalTerm || 0)
        return (
          <div>
            <strong>{total}/100</strong>
            {record.isCompleted && <div style={{ fontSize: "12px", color: "#52c41a" }}>Completed</div>}
          </div>
        )
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openGradeModal(record)}>
            Grade
          </Button>
          <Button size="small" icon={<EyeOutlined />} onClick={() => viewStudentDetails(record)}>
            View
          </Button>
        </Space>
      ),
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
            My Students - Grading Interface
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
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={`Grade Student: ${selectedStudent?.studentName}`}
        open={isGradeModalVisible}
        onCancel={() => setIsGradeModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleGradeSubmit} initialValues={selectedStudent?.currentMarks}>
          <div style={{ marginBottom: "16px", padding: "12px", background: "#f5f5f5", borderRadius: "6px" }}>
            <strong>Current Grade: </strong>
            <Tag color={getGradeColor(selectedStudent?.currentGrade || "NA")}>
              {selectedStudent?.currentGrade || "NA"}
            </Tag>
            <span style={{ marginLeft: "12px" }}>
              <strong>Grade Points: </strong>
              {selectedStudent?.currentGradePoints?.toFixed(2) || "0.00"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item
              label="Class Test 1 (Max: 10)"
              name="classTest1"
              rules={[
                { required: true, message: "Please enter marks" },
                { type: "number", min: 0, max: 10, message: "Marks must be between 0-10" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} max={10} step={0.5} placeholder="Enter marks out of 10" />
            </Form.Item>

            <Form.Item
              label="Class Test 2 (Max: 10)"
              name="classTest2"
              rules={[
                { required: true, message: "Please enter marks" },
                { type: "number", min: 0, max: 10, message: "Marks must be between 0-10" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} max={10} step={0.5} placeholder="Enter marks out of 10" />
            </Form.Item>

            <Form.Item
              label="Attendance (Max: 10)"
              name="attendance"
              rules={[
                { required: true, message: "Please enter attendance marks" },
                { type: "number", min: 0, max: 10, message: "Marks must be between 0-10" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={10}
                step={0.5}
                placeholder="Enter attendance marks out of 10"
              />
            </Form.Item>

            <Form.Item
              label="Mid Term (Max: 30)"
              name="midTerm"
              rules={[
                { required: true, message: "Please enter marks" },
                { type: "number", min: 0, max: 30, message: "Marks must be between 0-30" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} max={30} step={0.5} placeholder="Enter marks out of 30" />
            </Form.Item>
          </div>

          <Form.Item
            label="Final Term (Max: 40)"
            name="finalTerm"
            rules={[
              { required: true, message: "Please enter marks" },
              { type: "number", min: 0, max: 40, message: "Marks must be between 0-40" },
            ]}
            style={{ marginTop: "16px" }}
          >
            <InputNumber style={{ width: "100%" }} min={0} max={40} step={0.5} placeholder="Enter marks out of 40" />
          </Form.Item>

          <div style={{ marginTop: "16px", padding: "12px", background: "#e6f7ff", borderRadius: "6px" }}>
            <strong>Marking Scheme:</strong> Class Test 1 (10) + Class Test 2 (10) + Attendance (10) + Mid Term (30) +
            Final Term (40) = 100 Total
          </div>

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsGradeModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Update Marks
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      <Modal
        title={`Student Details: ${selectedStudent?.studentName}`}
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedStudent && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Student Name" span={2}>
              {selectedStudent.studentName}
            </Descriptions.Item>
            <Descriptions.Item label="Class Test 1">{selectedStudent.currentMarks.classTest1}/10</Descriptions.Item>
            <Descriptions.Item label="Class Test 2">{selectedStudent.currentMarks.classTest2}/10</Descriptions.Item>
            <Descriptions.Item label="Attendance">{selectedStudent.currentMarks.attendance}/10</Descriptions.Item>
            <Descriptions.Item label="Mid Term">{selectedStudent.currentMarks.midTerm}/30</Descriptions.Item>
            <Descriptions.Item label="Final Term">{selectedStudent.currentMarks.finalTerm}/40</Descriptions.Item>
            <Descriptions.Item label="Total Marks">
              <strong>
                {selectedStudent.currentMarks.classTest1 +
                  selectedStudent.currentMarks.midTerm +
                  selectedStudent.currentMarks.classTest2 +
                  selectedStudent.currentMarks.attendance +
                  selectedStudent.currentMarks.finalTerm}
                /100
              </strong>
            </Descriptions.Item>
            <Descriptions.Item label="Grade">
              <Tag color={getGradeColor(selectedStudent.currentGrade)}>{selectedStudent.currentGrade}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Grade Points" span={2}>
              <strong>{selectedStudent.currentGradePoints.toFixed(2)}</strong>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default MyStudents
