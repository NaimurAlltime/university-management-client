"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Divider,
  message,
  Upload,
} from "antd"
import {
  UserOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentUser } from "../../redux/features/auth/authSlice"
import dayjs from "dayjs"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

interface StudentProfileData {
  id: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: string
  dateOfBirth: string
  bloogGroup: string
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  guardian: {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
  }
  localGuardian: {
    name: string
    occupation: string
    contactNo: string
    address: string
  }
  admissionSemester: any
  academicDepartment: any
  academicFaculty: any
}

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const currentUser = useAppSelector(selectCurrentUser)

  // Mock student data - in real app, this would come from API
  const [studentData, setStudentData] = useState<StudentProfileData>({
    id: "2024001001",
    name: {
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
    },
    email: "john.doe@university.edu",
    contactNo: "+1234567890",
    emergencyContactNo: "+1234567891",
    gender: "male",
    dateOfBirth: "2000-01-15",
    bloogGroup: "A+",
    presentAddress: "123 University Street, Campus City, State 12345",
    permanentAddress: "456 Home Avenue, Hometown, State 67890",
    profileImg: "",
    guardian: {
      fatherName: "Robert Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+1234567892",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "+1234567893",
    },
    localGuardian: {
      name: "Uncle Sam",
      occupation: "Business Owner",
      contactNo: "+1234567894",
      address: "789 Local Street, Campus City, State 12345",
    },
    admissionSemester: {
      name: "Fall 2024",
      year: "2024",
    },
    academicDepartment: {
      name: "Computer Science",
    },
    academicFaculty: {
      name: "Faculty of Engineering",
    },
  })

  const handleEdit = () => {
    setIsEditing(true)
    form.setFieldsValue({
      ...studentData,
      dateOfBirth: studentData.dateOfBirth ? dayjs(studentData.dateOfBirth) : null,
    })
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      // Convert date back to string
      const updatedData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : "",
      }

      // In real app, this would be an API call
      setStudentData({ ...studentData, ...updatedData })
      setIsEditing(false)
      message.success("Profile updated successfully!")
    } catch (error) {
      message.error("Please fill in all required fields")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const uploadProps = {
    name: "file",
    action: "/api/upload", // This would be your upload endpoint
    headers: {
      authorization: "Bearer " + currentUser,
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
        // Update profile image
        setStudentData({ ...studentData, profileImg: info.file.response.url })
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const fullName = `${studentData.name.firstName} ${studentData.name.middleName} ${studentData.name.lastName}`

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <UserOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          My Profile
        </Title>
        <Text type="secondary">View and manage your personal information</Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Header */}
        <Col span={24}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ position: "relative" }}>
                <Avatar
                  size={120}
                  src={studentData.profileImg}
                  icon={<UserOutlined />}
                  style={{ border: "4px solid #f0f0f0" }}
                />
                {isEditing && (
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="small"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  </Upload>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ margin: 0 }}>
                  {fullName}
                </Title>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  Student ID: {studentData.id}
                </Text>
                <br />
                <Text type="secondary">
                  {studentData.academicDepartment.name} • {studentData.academicFaculty.name}
                </Text>
                <br />
                <Text type="secondary">Admitted: {studentData.admissionSemester.name}</Text>
              </div>
              <div>
                {/* {!isEditing ? (
                  <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                    Edit Profile
                  </Button>
                ) : (
                  <Space>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Space>
                )} */}
              </div>
            </div>
          </Card>
        </Col>

        {/* Personal Information */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <IdcardOutlined />
                Personal Information
              </Space>
            }
          >
            {!isEditing ? (
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div>
                  <Text strong>Full Name:</Text>
                  <br />
                  <Text>{fullName}</Text>
                </div>
                <div>
                  <Text strong>Email:</Text>
                  <br />
                  <Space>
                    <MailOutlined />
                    <Text>{studentData.email}</Text>
                  </Space>
                </div>
                <div>
                  <Text strong>Contact Number:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{studentData.contactNo}</Text>
                  </Space>
                </div>
                <div>
                  <Text strong>Emergency Contact:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{studentData.emergencyContactNo}</Text>
                  </Space>
                </div>
                <div>
                  <Text strong>Gender:</Text>
                  <br />
                  <Text style={{ textTransform: "capitalize" }}>{studentData.gender}</Text>
                </div>
                <div>
                  <Text strong>Date of Birth:</Text>
                  <br />
                  <Space>
                    <CalendarOutlined />
                    <Text>{dayjs(studentData.dateOfBirth).format("MMMM DD, YYYY")}</Text>
                  </Space>
                </div>
                <div>
                  <Text strong>Blood Group:</Text>
                  <br />
                  <Text>{studentData.bloogGroup}</Text>
                </div>
              </Space>
            ) : (
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="First Name"
                      name={["name", "firstName"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Middle Name" name={["name", "middleName"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Last Name"
                      name={["name", "lastName"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Required" },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Contact Number"
                      name="contactNo"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Emergency Contact"
                      name="emergencyContactNo"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Required" }]}>
                      <Select>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Blood Group" name="bloogGroup">
                      <Select>
                        <Option value="A+">A+</Option>
                        <Option value="A-">A-</Option>
                        <Option value="B+">B+</Option>
                        <Option value="B-">B-</Option>
                        <Option value="AB+">AB+</Option>
                        <Option value="AB-">AB-</Option>
                        <Option value="O+">O+</Option>
                        <Option value="O-">O-</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Col>

        {/* Address Information */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <HomeOutlined />
                Address Information
              </Space>
            }
          >
            {!isEditing ? (
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div>
                  <Text strong>Present Address:</Text>
                  <br />
                  <Text>{studentData.presentAddress}</Text>
                </div>
                <Divider />
                <div>
                  <Text strong>Permanent Address:</Text>
                  <br />
                  <Text>{studentData.permanentAddress}</Text>
                </div>
              </Space>
            ) : (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Present Address"
                  name="presentAddress"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  label="Permanent Address"
                  name="permanentAddress"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>

        {/* Guardian Information */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <TeamOutlined />
                Guardian Information
              </Space>
            }
          >
            {!isEditing ? (
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div>
                  <Text strong>Father's Name:</Text>
                  <br />
                  <Text>{studentData.guardian.fatherName}</Text>
                </div>
                <div>
                  <Text strong>Father's Occupation:</Text>
                  <br />
                  <Text>{studentData.guardian.fatherOccupation}</Text>
                </div>
                <div>
                  <Text strong>Father's Contact:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{studentData.guardian.fatherContactNo}</Text>
                  </Space>
                </div>
                <Divider />
                <div>
                  <Text strong>Mother's Name:</Text>
                  <br />
                  <Text>{studentData.guardian.motherName}</Text>
                </div>
                <div>
                  <Text strong>Mother's Occupation:</Text>
                  <br />
                  <Text>{studentData.guardian.motherOccupation}</Text>
                </div>
                <div>
                  <Text strong>Mother's Contact:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{studentData.guardian.motherContactNo}</Text>
                  </Space>
                </div>
              </Space>
            ) : (
              <Form form={form} layout="vertical">
                <Title level={5}>Father's Information</Title>
                <Form.Item
                  label="Father's Name"
                  name={["guardian", "fatherName"]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Father's Occupation"
                      name={["guardian", "fatherOccupation"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Father's Contact"
                      name={["guardian", "fatherContactNo"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>
                <Title level={5}>Mother's Information</Title>
                <Form.Item
                  label="Mother's Name"
                  name={["guardian", "motherName"]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Mother's Occupation"
                      name={["guardian", "motherOccupation"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Mother's Contact"
                      name={["guardian", "motherContactNo"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Col>

        {/* Local Guardian Information */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Local Guardian Information
              </Space>
            }
          >
            {!isEditing ? (
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div>
                  <Text strong>Name:</Text>
                  <br />
                  <Text>{studentData.localGuardian.name}</Text>
                </div>
                <div>
                  <Text strong>Occupation:</Text>
                  <br />
                  <Text>{studentData.localGuardian.occupation}</Text>
                </div>
                <div>
                  <Text strong>Contact Number:</Text>
                  <br />
                  <Space>
                    <PhoneOutlined />
                    <Text>{studentData.localGuardian.contactNo}</Text>
                  </Space>
                </div>
                <div>
                  <Text strong>Address:</Text>
                  <br />
                  <Text>{studentData.localGuardian.address}</Text>
                </div>
              </Space>
            ) : (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Local Guardian Name"
                  name={["localGuardian", "name"]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Occupation"
                      name={["localGuardian", "occupation"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Contact Number"
                      name={["localGuardian", "contactNo"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Address"
                  name={["localGuardian", "address"]}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <TextArea rows={2} />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StudentProfile
