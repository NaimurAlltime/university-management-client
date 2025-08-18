import { Card, Row, Col, Statistic, Progress, Table } from "antd"
import { UserOutlined, BookOutlined, TrophyOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { useGetEnrollmentStatsQuery } from "../../../redux/features/admin/enrollmentManagement.api"

const EnrollmentStatistics = () => {
  const { data: stats, isLoading } = useGetEnrollmentStatsQuery(undefined)

  const gradeDistributionColumns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Percentage",
      key: "percentage",
      render: (record: any) => (
        <Progress percent={((record.count / stats?.totalEnrollments) * 100).toFixed(1)} size="small" />
      ),
    },
  ]

  const topCoursesColumns = [
    {
      title: "Course",
      key: "course",
      render: (record: any) => `${record.course.code} - ${record.course.title}`,
    },
    {
      title: "Enrollments",
      dataIndex: "enrollmentCount",
      key: "enrollmentCount",
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },
    {
      title: "Utilization",
      key: "utilization",
      render: (record: any) => (
        <Progress percent={((record.enrollmentCount / record.maxCapacity) * 100).toFixed(1)} size="small" />
      ),
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Enrollment Statistics</h1>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Enrollments"
              value={stats?.totalEnrollments || 0}
              prefix={<UserOutlined />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Courses"
              value={stats?.activeCourses || 0}
              prefix={<BookOutlined />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Courses"
              value={stats?.completedCourses || 0}
              prefix={<TrophyOutlined />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ongoing Courses"
              value={stats?.ongoingCourses || 0}
              prefix={<ClockCircleOutlined />}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Grade Distribution" loading={isLoading}>
            <Table
              columns={gradeDistributionColumns}
              dataSource={stats?.gradeDistribution || []}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Most Popular Courses" loading={isLoading}>
            <Table columns={topCoursesColumns} dataSource={stats?.topCourses || []} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EnrollmentStatistics
