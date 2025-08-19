"use client"

import { Card, Col, Descriptions, Row, Typography, Avatar, Tag, Spin } from "antd"
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { useGetAdminProfileQuery } from "../../redux/features/admin/userManagement.api"

const { Title } = Typography

const AdminProfile = () => {
  const { data: profileData, isLoading } = useGetAdminProfileQuery(undefined)
  console.log("profileData", profileData);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <Spin size="large" />
      </div>
    )
  }

  const admin = profileData?.data

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Title level={2} style={{ margin: 0 }}>
            Admin Profile
          </Title>
          {/* <Button type="primary" icon={<EditOutlined />} onClick={() => navigate("/admin/profile/edit")}>
            Edit Profile
          </Button> */}
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Image and Basic Info */}
          <Col xs={24} md={8}>
            <Card style={{ textAlign: "center" }}>
              <Avatar size={120} src={admin?.profileImg} icon={<UserOutlined />} style={{ marginBottom: "16px" }} />
              <Title level={3} style={{ margin: "8px 0" }}>
                {admin?.name?.firstName} {admin?.name?.middleName} {admin?.name?.lastName}
              </Title>
              <Tag color="red" style={{ marginBottom: "8px" }}>
                Administrator
              </Tag>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <span>{admin?.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <span>{admin?.contactNo}</span>
              </div>
            </Card>
          </Col>

          {/* Detailed Information */}
          <Col xs={24} md={16}>
            <Card title="Personal Information">
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Admin ID">{admin?.id}</Descriptions.Item>
                <Descriptions.Item label="Gender">{admin?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {admin?.dateOfBirth ? new Date(admin.dateOfBirth).toLocaleDateString() : "Not provided"}
                </Descriptions.Item>
                <Descriptions.Item label="Blood Group">{admin?.bloogGroup || "Not provided"}</Descriptions.Item>
                <Descriptions.Item label="Emergency Contact">{admin?.emergencyContactNo}</Descriptions.Item>
                <Descriptions.Item label="Present Address" span={2}>
                  {admin?.presentAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Permanent Address" span={2}>
                  {admin?.permanentAddress}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Administrative Information" style={{ marginTop: "16px" }}>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Management Level">
                  {admin?.managementDepartment || "General Administration"}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={admin?.isDeleted ? "red" : "green"}>{admin?.isDeleted ? "Inactive" : "Active"}</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default AdminProfile
