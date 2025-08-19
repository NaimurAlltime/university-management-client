"use client"

import { useState } from "react"
import { Card, Typography, Spin, Empty, Tag, Space, Button, Row, Col, Modal, Descriptions, Tooltip } from "antd"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api"

const { Title, Text } = Typography

interface ScheduleItem {
  id: string
  title: string
  code: string
  time: string
  startTime: string
  endTime: string
  days: string[]
  room?: string
  instructor?: string
  color: string
  credits: number
}

const MySchedule = () => {
  const [selectedCourse, setSelectedCourse] = useState<ScheduleItem | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: enrolledCoursesData, isLoading } = useGetAllEnrolledCoursesQuery([])
  // console.log("Enrolled Courses Data:", enrolledCoursesData);
  const enrolledCourses = enrolledCoursesData?.data || []

  // Time slots for the schedule (8 AM to 6 PM)
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Color palette for courses
  const courseColors = [
    "#1890ff",
    "#52c41a",
    "#faad14",
    "#f5222d",
    "#722ed1",
    "#13c2c2",
    "#eb2f96",
    "#fa8c16",
    "#a0d911",
    "#2f54eb",
  ]

  // Convert enrolled courses to schedule items
  const scheduleItems: ScheduleItem[] = enrolledCourses.map((course: any, index: number) => ({
    id: course._id || `course-${index}`,
    title: course.course?.title || course.title || `Course ${index + 1}`,
    code: course.course ? `${course.course.prefix} ${course.course.code}` : `COURSE ${index + 1}`,
    time: course.startTime && course.endTime ? `${course.startTime} - ${course.endTime}` : "TBA",
    startTime: course.startTime || "09:00",
    endTime: course.endTime || "10:30",
    days: course.days || ["Monday", "Wednesday", "Friday"],
    room: course.room || `Room ${100 + index}`,
    instructor: course.instructor || "TBA",
    color: courseColors[index % courseColors.length],
    credits: course.course?.credits || 3,
  }))

  const showCourseDetails = (course: ScheduleItem) => {
    setSelectedCourse(course)
    setIsModalVisible(true)
  }

  const getTimeSlotIndex = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    return Math.max(0, hour - 8)
  }

  const getDayIndex = (day: string) => {
    return daysOfWeek.findIndex((d) => d.toLowerCase() === day.toLowerCase())
  }

  const getCurrentDay = () => {
    const today = new Date().getDay()
    return today === 0 ? 6 : today - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  }

  const isToday = (dayIndex: number) => {
    return dayIndex === getCurrentDay()
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text>Loading your schedule...</Text>
        </div>
      </div>
    )
  }

  if (scheduleItems.length === 0) {
    return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <Title level={2}>
            <CalendarOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
            My Schedule
          </Title>
          <Text type="secondary">Your weekly class schedule</Text>
        </div>
        <Empty description="No enrolled courses found" image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Button type="primary" icon={<BookOutlined />}>
            Browse Courses
          </Button>
        </Empty>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <CalendarOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          My Schedule
        </Title>
        <Text type="secondary">Your weekly class schedule</Text>
      </div>

      {/* Schedule Summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <BookOutlined style={{ fontSize: "24px", color: "#1890ff", marginBottom: "8px" }} />
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  {scheduleItems.length}
                </Text>
                <br />
                <Text type="secondary">Enrolled Courses</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <ClockCircleOutlined style={{ fontSize: "24px", color: "#52c41a", marginBottom: "8px" }} />
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  {scheduleItems.reduce((total, course) => total + course.credits, 0)}
                </Text>
                <br />
                <Text type="secondary">Total Credits</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <CalendarOutlined style={{ fontSize: "24px", color: "#faad14", marginBottom: "8px" }} />
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  {new Set(scheduleItems.flatMap((course) => course.days)).size}
                </Text>
                <br />
                <Text type="secondary">Active Days</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Weekly Schedule Grid */}
      <Card title="Weekly Schedule" style={{ marginBottom: "24px" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "800px" }}>
            {/* Header with days */}
            <div
              style={{ display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)", gap: "1px", marginBottom: "1px" }}
            >
              <div style={{ padding: "12px", background: "#fafafa", fontWeight: "bold", textAlign: "center" }}>
                Time
              </div>
              {dayAbbr.map((day, index) => (
                <div
                  key={day}
                  style={{
                    padding: "12px",
                    background: isToday(index) ? "#e6f7ff" : "#fafafa",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: isToday(index) ? "2px solid #1890ff" : "1px solid #d9d9d9",
                  }}
                >
                  {day}
                  {isToday(index) && <div style={{ fontSize: "10px", color: "#1890ff" }}>Today</div>}
                </div>
              ))}
            </div>

            {/* Time slots grid */}
            {timeSlots.map((time, timeIndex) => (
              <div
                key={time}
                style={{ display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)", gap: "1px", marginBottom: "1px" }}
              >
                <div style={{ padding: "8px", background: "#fafafa", textAlign: "center", fontSize: "12px" }}>
                  {time}
                </div>
                {daysOfWeek.map((day, dayIndex) => {
                  const coursesInSlot = scheduleItems.filter((course) => {
                    const courseStartHour = Number.parseInt(course.startTime.split(":")[0])
                    const courseEndHour = Number.parseInt(course.endTime.split(":")[0])
                    const slotHour = Number.parseInt(time.split(":")[0])

                    return (
                      course.days.some((courseDay) => courseDay.toLowerCase() === day.toLowerCase()) &&
                      slotHour >= courseStartHour &&
                      slotHour < courseEndHour
                    )
                  })

                  return (
                    <div
                      key={`${day}-${time}`}
                      style={{
                        minHeight: "50px",
                        background: isToday(dayIndex) ? "#f6ffed" : "#fff",
                        border: "1px solid #f0f0f0",
                        position: "relative",
                      }}
                    >
                      {coursesInSlot.map((course) => (
                        <Tooltip
                          key={course.id}
                          title={
                            <div>
                              <div>
                                <strong>{course.title}</strong>
                              </div>
                              <div>{course.code}</div>
                              <div>{course.time}</div>
                              <div>{course.room}</div>
                            </div>
                          }
                        >
                          <div
                            onClick={() => showCourseDetails(course)}
                            style={{
                              background: course.color,
                              color: "white",
                              padding: "4px 6px",
                              margin: "2px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              cursor: "pointer",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div style={{ fontWeight: "bold" }}>{course.code}</div>
                            <div style={{ opacity: 0.9 }}>{course.room}</div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Course List */}
      <Card title="Course List">
        <Row gutter={[16, 16]}>
          {scheduleItems.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <Card
                size="small"
                hoverable
                onClick={() => showCourseDetails(course)}
                style={{ borderLeft: `4px solid ${course.color}` }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>{course.title}</Text>
                    <br />
                    <Text type="secondary">{course.code}</Text>
                  </div>
                  <div>
                    <ClockCircleOutlined style={{ marginRight: "4px" }} />
                    <Text>{course.time}</Text>
                  </div>
                  <div>
                    <CalendarOutlined style={{ marginRight: "4px" }} />
                    <Text>{course.days.join(", ")}</Text>
                  </div>
                  <div>
                    <Tag color="blue">{course.credits} Credits</Tag>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

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
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedCourse && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Course Title" span={2}>
              <Title level={4} style={{ margin: 0 }}>
                {selectedCourse.title}
              </Title>
            </Descriptions.Item>
            <Descriptions.Item label="Course Code">{selectedCourse.code}</Descriptions.Item>
            <Descriptions.Item label="Credits">
              <Tag color="blue">{selectedCourse.credits}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Schedule">{selectedCourse.days.join(", ")}</Descriptions.Item>
            <Descriptions.Item label="Time">{selectedCourse.time}</Descriptions.Item>
            <Descriptions.Item label="Room">
              <Space>
                <EnvironmentOutlined />
                {selectedCourse.room}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Instructor">
              <Space>
                <UserOutlined />
                {selectedCourse.instructor}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default MySchedule
