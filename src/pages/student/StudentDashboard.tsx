import { Card, Row, Col, Statistic, Button, List, Avatar, Typography, Space, Progress, Tag } from "antd"
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
  UserOutlined,
  RightOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentUser } from "../../redux/features/auth/authSlice"
import {
  useGetAllOfferedCoursesQuery,
  useGetAllEnrolledCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api"

const { Title, Text } = Typography

const StudentDashboard = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  const { data: offeredCoursesData, isLoading: offeredLoading } = useGetAllOfferedCoursesQuery([])
  const { data: enrolledCoursesData, isLoading: enrolledLoading } = useGetAllEnrolledCoursesQuery([])

  const offeredCourses = offeredCoursesData?.data || []
  const enrolledCourses = enrolledCoursesData?.data || []

  const upcomingClasses = [
    {
      id: 1,
      course: "Computer Science 101",
      time: "10:00 AM - 11:30 AM",
      room: "Room 205",
      instructor: "Dr. Smith",
      type: "Lecture",
    },
    {
      id: 2,
      course: "Mathematics 201",
      time: "2:00 PM - 3:30 PM",
      room: "Room 301",
      instructor: "Prof. Johnson",
      type: "Tutorial",
    },
    {
      id: 3,
      course: "Physics 150",
      time: "4:00 PM - 5:30 PM",
      room: "Lab 102",
      instructor: "Dr. Wilson",
      type: "Lab",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Enrolled in Computer Science 101",
      time: "2 hours ago",
      type: "enrollment",
    },
    {
      id: 2,
      action: "Submitted Assignment for Mathematics 201",
      time: "1 day ago",
      type: "assignment",
    },
    {
      id: 3,
      action: "Attended Physics 150 Lab Session",
      time: "2 days ago",
      type: "attendance",
    },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div style={{ padding: "0 4px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          padding: "32px",
          marginBottom: "24px",
          color: "white",
        }}
      >
        <Title level={2} style={{ color: "white", margin: 0 }}>
          {getGreeting()}, Student!
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px" }}>
          Welcome back to your academic dashboard. Here's what's happening today.
        </Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Enrolled Courses"
              value={enrolledCourses.length}
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
              loading={enrolledLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Available Courses"
              value={offeredCourses.length}
              prefix={<CalendarOutlined style={{ color: "#52c41a" }} />}
              loading={offeredLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Classes"
              value={upcomingClasses.length}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Semester Progress"
              value={65}
              suffix="%"
              prefix={<TrophyOutlined style={{ color: "#f5222d" }} />}
            />
            <Progress percent={65} size="small" style={{ marginTop: "8px" }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined />
                Today's Schedule
              </Space>
            }
            extra={
              <Button type="link" icon={<RightOutlined />}>
                View All
              </Button>
            }
          >
            <List
              dataSource={upcomingClasses}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<PlayCircleOutlined />} style={{ backgroundColor: "#1890ff" }} />}
                    title={
                      <Space>
                        <Text strong>{item.course}</Text>
                        <Tag color={item.type === "Lecture" ? "blue" : item.type === "Lab" ? "green" : "orange"}>
                          {item.type}
                        </Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <Text type="secondary">{item.time}</Text>
                        <br />
                        <Text type="secondary">
                          {item.room} • {item.instructor}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Recent Activities
              </Space>
            }
            extra={
              <Button type="link" icon={<RightOutlined />}>
                View All
              </Button>
            }
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.type === "enrollment" ? "#52c41a" : item.type === "assignment" ? "#1890ff" : "#faad14",
                        }}
                      >
                        {item.type === "enrollment" ? "E" : item.type === "assignment" ? "A" : "C"}
                      </Avatar>
                    }
                    title={item.action}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Quick Actions" style={{ marginTop: "24px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Button type="primary" size="large" block icon={<BookOutlined />} style={{ height: "60px" }}>
              Browse Courses
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<CalendarOutlined />} style={{ height: "60px" }}>
              View Schedule
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<UserOutlined />} style={{ height: "60px" }}>
              My Profile
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button size="large" block icon={<TrophyOutlined />} style={{ height: "60px" }}>
              Grades
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default StudentDashboard
