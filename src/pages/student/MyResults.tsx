"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Space,
  Statistic,
  Progress,
  Select,
  Button,
  Modal,
  Descriptions,
  Empty,
  Spin,
} from "antd"
import { TrophyOutlined, BookOutlined, BarChartOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons"
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api"

const { Title, Text } = Typography
const { Option } = Select

interface CourseResult {
  _id: string
  course: {
    title: string
    code: number
    prefix: string
    credits: number
  }
  courseMarks: {
    classTest1: number
    midTerm: number
    classTest2: number
    attendance: number
    finalTerm: number
  }
  grade: string
  gradePoints: number
  isCompleted: boolean
  academicSemester: {
    name: string
    year: string
  }
  faculty: {
    name: {
      firstName: string
      lastName: string
    }
  }
}

const MyResults = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<CourseResult | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: enrolledCoursesData, isLoading } = useGetAllEnrolledCoursesQuery([])
  const enrolledCourses: CourseResult[] = enrolledCoursesData?.data || []

  // Calculate GPA and statistics
  const completedCourses = enrolledCourses.filter((course) => course.isCompleted && course.gradePoints > 0)
  const totalCredits = completedCourses.reduce((sum, course) => sum + course.course.credits, 0)
  const totalGradePoints = completedCourses.reduce((sum, course) => sum + course.gradePoints * course.course.credits, 0)
  const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00"

  // Get unique semesters for filtering
  const semesters = [
    ...new Set(enrolledCourses.map((course) => `${course.academicSemester?.name} ${course.academicSemester?.year}`)),
  ].filter(Boolean)

  // Filter courses by selected semester
  const filteredCourses = selectedSemester
    ? enrolledCourses.filter(
        (course) => `${course.academicSemester?.name} ${course.academicSemester?.year}` === selectedSemester,
      )
    : enrolledCourses

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

  const getGradeStatus = (grade: string) => {
    if (["A+", "A", "A-"].includes(grade)) return "success"
    if (["B+", "B", "B-"].includes(grade)) return "processing"
    if (["C+", "C", "C-"].includes(grade)) return "warning"
    if (["D+", "D", "F"].includes(grade)) return "error"
    return "default"
  }

  const showCourseDetails = (course: CourseResult) => {
    setSelectedCourse(course)
    setIsModalVisible(true)
  }

  const columns = [
    {
      title: "Course",
      key: "course",
      render: (record: CourseResult) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.course.title}</div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            {record.course.prefix} {record.course.code}
          </div>
        </div>
      ),
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      key: "credits",
      render: (credits: number) => <Tag color="blue">{credits}</Tag>,
    },
    {
      title: "Semester",
      key: "semester",
      render: (record: CourseResult) => (
        <div>
          <div>{record.academicSemester?.name}</div>
          <div style={{ color: "#666", fontSize: "12px" }}>{record.academicSemester?.year}</div>
        </div>
      ),
    },
    {
      title: "Total Marks",
      key: "totalMarks",
      render: (record: CourseResult) => {
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
            <Progress
              percent={total}
              size="small"
              style={{ marginTop: "4px" }}
              strokeColor={total >= 80 ? "#52c41a" : total >= 60 ? "#1890ff" : total >= 40 ? "#faad14" : "#ff4d4f"}
            />
          </div>
        )
      },
    },
    {
      title: "Grade",
      key: "grade",
      render: (record: CourseResult) => (
        <div>
          <Tag color={getGradeColor(record.grade || "NA")}>{record.grade || "NA"}</Tag>
          {record.gradePoints > 0 && (
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{record.gradePoints.toFixed(2)} GP</div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: CourseResult) => (
        <Tag color={record.isCompleted ? "green" : "orange"}>{record.isCompleted ? "Completed" : "In Progress"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: CourseResult) => (
        <Button type="primary" size="small" icon={<EyeOutlined />} onClick={() => showCourseDetails(record)}>
          View Details
        </Button>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text>Loading your results...</Text>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <TrophyOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          My Academic Results
        </Title>
        <Text type="secondary">View your grades, marks, and academic performance</Text>
      </div>

      {/* Academic Performance Summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="CGPA"
              value={cgpa}
              precision={2}
              prefix={<StarOutlined style={{ color: "#faad14" }} />}
              valueStyle={{
                color:
                  Number.parseFloat(cgpa) >= 3.5 ? "#52c41a" : Number.parseFloat(cgpa) >= 3.0 ? "#1890ff" : "#ff4d4f",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Credits"
              value={totalCredits}
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Courses"
              value={completedCourses.length}
              prefix={<TrophyOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Courses"
              value={enrolledCourses.length}
              prefix={<BarChartOutlined style={{ color: "#722ed1" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Grade Distribution */}
      {/* <Card title="Grade Distribution" style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]}>
          {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"].map((grade) => {
            const count = completedCourses.filter((course) => course.grade === grade).length
            const percentage = completedCourses.length > 0 ? (count / completedCourses.length) * 100 : 0

            return (
              <Col xs={12} sm={8} md={6} lg={4} xl={2} key={grade}>
                <div style={{ textAlign: "center" }}>
                  <Tag color={getGradeColor(grade)} style={{ marginBottom: "8px", fontSize: "14px" }}>
                    {grade}
                  </Tag>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>{count}</div>
                  <Progress percent={percentage} size="small" showInfo={false} strokeColor={getGradeColor(grade)} />
                </div>
              </Col>
            )
          })}
        </Row>
      </Card> */}

      {/* Results Table */}
      <Card
        title={
          <Space>
            <BookOutlined />
            Course Results
          </Space>
        }
        extra={
          <Space>
            <Select
              placeholder="Filter by semester"
              style={{ width: 200 }}
              value={selectedSemester}
              onChange={setSelectedSemester}
              allowClear
            >
              {semesters.map((semester) => (
                <Option key={semester} value={semester}>
                  {semester}
                </Option>
              ))}
            </Select>
          </Space>
        }
      >
        {filteredCourses.length === 0 ? (
          <Empty description="No results found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredCourses}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
            }}
            scroll={{ x: 1000 }}
          />
        )}
      </Card>

      {/* Course Details Modal */}
      <Modal
        title={
          <Space>
            <BookOutlined />
            Course Details: {selectedCourse?.course.title}
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedCourse && (
          <div>
            <Descriptions bordered column={2} style={{ marginBottom: "24px" }}>
              <Descriptions.Item label="Course Title" span={2}>
                <Title level={4} style={{ margin: 0 }}>
                  {selectedCourse.course.title}
                </Title>
              </Descriptions.Item>
              <Descriptions.Item label="Course Code">
                {selectedCourse.course.prefix} {selectedCourse.course.code}
              </Descriptions.Item>
              <Descriptions.Item label="Credits">
                <Tag color="blue">{selectedCourse.course.credits}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Semester">
                {selectedCourse.academicSemester?.name} {selectedCourse.academicSemester?.year}
              </Descriptions.Item>
              <Descriptions.Item label="Instructor">
                {selectedCourse.faculty?.name?.firstName} {selectedCourse.faculty?.name?.lastName}
              </Descriptions.Item>
            </Descriptions>

            <Card title="Marks Breakdown" style={{ marginBottom: "16px" }}>
              <Row gutter={[16, 16]}>
                <Col span={5}>
                  <Statistic
                    title="Class Test 1"
                    value={selectedCourse.courseMarks?.classTest1 || 0}
                    suffix="/ 10"
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Class Test 2"
                    value={selectedCourse.courseMarks?.classTest2 || 0}
                    suffix="/ 10"
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Attendance"
                    value={selectedCourse.courseMarks?.attendance || 0}
                    suffix="/ 10"
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Mid Term"
                    value={selectedCourse.courseMarks?.midTerm || 0}
                    suffix="/ 30"
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={4}>
                  <Statistic
                    title="Final Term"
                    value={selectedCourse.courseMarks?.finalTerm || 0}
                    suffix="/ 40"
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
              </Row>
            </Card>

            <Card title="Final Result">
              <Row gutter={[16, 16]} align="middle">
                <Col span={8}>
                  <Statistic
                    title="Total Marks"
                    value={
                      (selectedCourse.courseMarks?.classTest1 || 0) +
                      (selectedCourse.courseMarks?.midTerm || 0) +
                      (selectedCourse.courseMarks?.classTest2 || 0) +
                      (selectedCourse.courseMarks?.attendance || 0) +
                      (selectedCourse.courseMarks?.finalTerm || 0)
                    }
                    suffix="/ 100"
                    valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
                  />
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: "8px" }}>Grade</div>
                    <Tag
                      color={getGradeColor(selectedCourse.grade || "NA")}
                      style={{ fontSize: "20px", padding: "8px 16px" }}
                    >
                      {selectedCourse.grade || "NA"}
                    </Tag>
                  </div>
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Grade Points"
                    value={selectedCourse.gradePoints || 0}
                    precision={2}
                    valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MyResults
