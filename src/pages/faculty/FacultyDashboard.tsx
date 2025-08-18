import { Card, Col, Row, Statistic, Typography } from "antd"
import { BookOutlined, TeamOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons"
import { useGetFacultyDashboardQuery } from "../../redux/features/faculty/facultyApi"

const { Title } = Typography

const FacultyDashboard = () => {
  const { data: dashboardData, isLoading } = useGetFacultyDashboardQuery(undefined)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { faculty, totalCourses, ongoingSemester, offeredCourses } = dashboardData?.data || {}

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Faculty Dashboard</Title>

      {/* Welcome Section */}
      <Card style={{ marginBottom: "24px" }}>
        <Row align="middle">
          <Col span={4}>
            <UserOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
          </Col>
          <Col span={20}>
            <Title level={3} style={{ margin: 0 }}>
              Welcome, {faculty?.name?.firstName} {faculty?.name?.lastName}
            </Title>
            <p style={{ margin: 0, color: "#666" }}>
              {faculty?.designation} - {faculty?.academicDepartment?.name}
            </p>
            <p style={{ margin: 0, color: "#666" }}>{faculty?.email}</p>
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Courses"
              value={totalCourses || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Semester Courses"
              value={offeredCourses || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Academic Department"
              value={faculty?.academicDepartment?.name || "N/A"}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Semester"
              value={ongoingSemester?.academicSemester?.name || "No Active Semester"}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Current Semester Info */}
      {ongoingSemester && (
        <Card title="Current Semester Information">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <strong>Semester:</strong> {ongoingSemester.academicSemester?.name}
            </Col>
            <Col span={8}>
              <strong>Year:</strong> {ongoingSemester.academicSemester?.year}
            </Col>
            <Col span={8}>
              <strong>Status:</strong> {ongoingSemester.status}
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default FacultyDashboard
