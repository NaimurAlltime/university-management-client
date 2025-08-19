"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Tag,
  Typography,
  Space,
  Input,
  Select,
  Spin,
  message,
  Modal,
  Descriptions,
  Badge,
  Empty,
} from "antd"
import {
  BookOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import {
  useGetAllOfferedCoursesQuery,
  useEnrolCourseMutation,
} from "../../redux/features/student/studentCourseManagement.api"
import type { TOfferedCourse } from "../../types/studentCourse.type"

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

const OfferedCourse = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<TOfferedCourse | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: offeredCoursesData, isLoading, refetch } = useGetAllOfferedCoursesQuery([])
  console.log("Offered Courses Data:", offeredCoursesData);
  const [enrolCourse, { isLoading: enrolling }] = useEnrolCourseMutation()

  const offeredCourses = offeredCoursesData?.data || []

  // Filter courses based on search and department
  const filteredCourses = offeredCourses.filter((course) => {
    const matchesSearch =
      course.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course.code.toString().includes(searchTerm)
    const matchesDepartment = !selectedDepartment || course.academicDepartment === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  // Get unique departments for filter
  const departments = [...new Set(offeredCourses.map((course) => course.academicDepartment))]

  const handleEnroll = async (courseId: string) => {
    try {
      await enrolCourse({ offeredCourse: courseId }).unwrap()
      message.success("Successfully enrolled in the course!")
      refetch()
      setIsModalVisible(false)
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to enroll in course")
    }
  }

  const showCourseDetails = (course: TOfferedCourse) => {
    setSelectedCourse(course)
    setIsModalVisible(true)
  }

  const getStatusColor = (course: TOfferedCourse) => {
    if (course.isAlreadyEnrolled) return "success"
    if (!course.isPreRequisitesFulFilled) return "error"
    if (course.enrolledCourses.length >= course.maxCapacity) return "warning"
    return "processing"
  }

  const getStatusText = (course: TOfferedCourse) => {
    if (course.isAlreadyEnrolled) return "Enrolled"
    if (!course.isPreRequisitesFulFilled) return "Prerequisites Required"
    if (course.enrolledCourses.length >= course.maxCapacity) return "Full"
    return "Available"
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text>Loading offered courses...</Text>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <BookOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          Offered Courses
        </Title>
        <Text type="secondary">Browse and enroll in available courses for this semester</Text>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search courses..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Filter by department"
              style={{ width: "100%" }}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              allowClear
            >
              {departments.map((dept) => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Space>
              <FilterOutlined />
              <Text type="secondary">
                Showing {filteredCourses.length} of {offeredCourses.length} courses
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <Empty description="No courses found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course._id}>
              <Card
                hoverable
                style={{ height: "100%" }}
                actions={[
                  <Button
                    key="viewDetails"
                    type="link"
                    onClick={() => showCourseDetails(course)}
                    icon={<BookOutlined />}
                  >
                    View Details
                  </Button>,
                  <Button
                    key="enroll"
                    type="primary"
                    disabled={
                      course.isAlreadyEnrolled ||
                      !course.isPreRequisitesFulFilled ||
                      course.enrolledCourses.length >= course.maxCapacity
                    }
                    onClick={() => handleEnroll(course._id)}
                    loading={enrolling}
                    icon={course.isAlreadyEnrolled ? <CheckCircleOutlined /> : <UserOutlined />}
                  >
                    {course.isAlreadyEnrolled ? "Enrolled" : "Enroll"}
                  </Button>,
                ]}
              >
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Title level={4} style={{ margin: 0, flex: 1 }}>
                      {course.course.title}
                    </Title>
                    <Badge
                      status={getStatusColor(course) as any}
                      text={getStatusText(course)}
                      style={{ marginLeft: "8px" }}
                    />
                  </div>
                  <Text type="secondary">
                    {course.course.prefix} {course.course.code}
                  </Text>
                </div>

                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Credits: </Text>
                    <Tag color="blue">{course.course.credits}</Tag>
                  </div>

                  <div>
                    <Text strong>Section: </Text>
                    <Text>{course.section}</Text>
                  </div>

                  <div>
                    <ClockCircleOutlined style={{ marginRight: "4px" }} />
                    <Text>
                      {course.startTime} - {course.endTime}
                    </Text>
                  </div>

                  <div>
                    <CalendarOutlined style={{ marginRight: "4px" }} />
                    <Text>{course.days.join(", ")}</Text>
                  </div>

                  <div>
                    <UserOutlined style={{ marginRight: "4px" }} />
                    <Text>
                      {course.enrolledCourses.length}/{course.maxCapacity} enrolled
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Course Details Modal */}
      <Modal
        title={
          <Space>
            <BookOutlined />
            Course Details
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="enroll"
            type="primary"
            disabled={
              !selectedCourse ||
              selectedCourse.isAlreadyEnrolled ||
              !selectedCourse.isPreRequisitesFulFilled ||
              selectedCourse.enrolledCourses.length >= selectedCourse.maxCapacity
            }
            loading={enrolling}
            onClick={() => selectedCourse && handleEnroll(selectedCourse._id)}
            icon={selectedCourse?.isAlreadyEnrolled ? <CheckCircleOutlined /> : <UserOutlined />}
          >
            {selectedCourse?.isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
          </Button>,
        ]}
        width={700}
      >
        {selectedCourse && (
          <Descriptions bordered column={2}>
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
            <Descriptions.Item label="Section">{selectedCourse.section}</Descriptions.Item>
            <Descriptions.Item label="Max Capacity">{selectedCourse.maxCapacity}</Descriptions.Item>
            <Descriptions.Item label="Schedule">{selectedCourse.days.join(", ")}</Descriptions.Item>
            <Descriptions.Item label="Time">
              {selectedCourse.startTime} - {selectedCourse.endTime}
            </Descriptions.Item>
            <Descriptions.Item label="Enrollment Status" span={2}>
              <Badge status={getStatusColor(selectedCourse) as any} text={getStatusText(selectedCourse)} />
              <Text style={{ marginLeft: "16px" }}>
                ({selectedCourse.enrolledCourses.length}/{selectedCourse.maxCapacity} enrolled)
              </Text>
            </Descriptions.Item>
            {!selectedCourse.isPreRequisitesFulFilled && (
              <Descriptions.Item label="Prerequisites" span={2}>
                <Space>
                  <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                  <Text type="danger">Prerequisites not fulfilled</Text>
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default OfferedCourse
