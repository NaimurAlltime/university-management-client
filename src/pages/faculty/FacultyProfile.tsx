"use client"

import { Button, Card, Col, Descriptions, Row, Typography, Avatar, Tag, Spin } from "antd"
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useGetFacultyProfileQuery } from "../../redux/features/faculty/facultyApi"

const { Title } = Typography

const FacultyProfile = () => {
  const navigate = useNavigate()
  const { data: profileData, isLoading } = useGetFacultyProfileQuery(undefined)

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <Spin size="large" />
      </div>
    )
  }

  const faculty = profileData?.data

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Title level={2} style={{ margin: 0 }}>
            Faculty Profile
          </Title>
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate("/faculty/profile/edit")}>
            Edit Profile
          </Button>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Image and Basic Info */}
          <Col xs={24} md={8}>
            <Card style={{ textAlign: "center" }}>
              <Avatar size={120} src={faculty?.profileImg} icon={<UserOutlined />} style={{ marginBottom: "16px" }} />
              <Title level={3} style={{ margin: "8px 0" }}>
                {faculty?.name?.firstName} {faculty?.name?.middleName} {faculty?.name?.lastName}
              </Title>
              <Tag color="blue" style={{ marginBottom: "8px" }}>
                {faculty?.designation}
              </Tag>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <span>{faculty?.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <span>{faculty?.contactNo}</span>
              </div>
            </Card>
          </Col>

          {/* Detailed Information */}
          <Col xs={24} md={16}>
            <Card title="Personal Information">
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Faculty ID">{faculty?.id}</Descriptions.Item>
                <Descriptions.Item label="Gender">{faculty?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {faculty?.dateOfBirth ? new Date(faculty.dateOfBirth).toLocaleDateString() : "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Blood Group">{faculty?.bloogGroup || "Not provided"}</Descriptions.Item>
                <Descriptions.Item label="Emergency Contact">{faculty?.emergencyContactNo}</Descriptions.Item>
                <Descriptions.Item label="Present Address" span={2}>
                  {faculty?.presentAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Permanent Address" span={2}>
                  {faculty?.permanentAddress}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Academic Information" style={{ marginTop: "16px" }}>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Academic Department">{faculty?.academicDepartment?.name}</Descriptions.Item>
                <Descriptions.Item label="Academic Faculty">{faculty?.academicFaculty?.name}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={faculty?.isDeleted ? "red" : "green"}>{faculty?.isDeleted ? "Inactive" : "Active"}</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default FacultyProfile
