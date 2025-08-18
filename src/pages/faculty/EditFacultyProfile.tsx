"use client"

import { Button, Card, Col, Row, Typography, Avatar, Upload, message } from "antd"
import { UserOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useGetFacultyProfileQuery, useUpdateFacultyProfileMutation } from "../../redux/features/faculty/facultyApi"
import CForm from "../../components/form/CForm"
import CInput from "../../components/form/CInput"
import CSelect from "../../components/form/CSelect"
import CDatePicker from "../../components/form/CDatePicker"


const { Title } = Typography

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
]

const EditFacultyProfile = () => {
  const navigate = useNavigate()
  const { data: profileData, isLoading } = useGetFacultyProfileQuery(undefined)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateFacultyProfileMutation()

  const faculty = profileData?.data

  const onSubmit = async (data: any) => {
    try {
      const updateData = {
        id: faculty?._id,
        data: {
          faculty: {
            name: {
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
            },
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            contactNo: data.contactNo,
            emergencyContactNo: data.emergencyContactNo,
            bloogGroup: data.bloogGroup,
            presentAddress: data.presentAddress,
            permanentAddress: data.permanentAddress,
            designation: data.designation,
          },
        },
      }

      await updateProfile(updateData).unwrap()
      message.success("Profile updated successfully!")
      navigate("/faculty/profile")
    } catch (error) {
      message.error("Failed to update profile")
    }
  }

  const defaultValues = {
    firstName: faculty?.name?.firstName || "",
    middleName: faculty?.name?.middleName || "",
    lastName: faculty?.name?.lastName || "",
    gender: faculty?.gender || "",
    dateOfBirth: faculty?.dateOfBirth || "",
    contactNo: faculty?.contactNo || "",
    emergencyContactNo: faculty?.emergencyContactNo || "",
    bloogGroup: faculty?.bloogGroup || "",
    presentAddress: faculty?.presentAddress || "",
    permanentAddress: faculty?.permanentAddress || "",
    designation: faculty?.designation || "",
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/faculty/profile")}
            style={{ marginRight: "16px" }}
          >
            Back to Profile
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            Edit Profile
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {/* Profile Image Section */}
          <Col xs={24} md={8}>
            <Card style={{ textAlign: "center" }}>
              <Avatar size={120} src={faculty?.profileImg} icon={<UserOutlined />} style={{ marginBottom: "16px" }} />
              <Upload showUploadList={false}>
                <Button icon={<UploadOutlined />}>Change Photo</Button>
              </Upload>
            </Card>
          </Col>

          {/* Edit Form */}
          <Col xs={24} md={16}>
            <Card title="Personal Information">
              <CForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <CInput name="firstName" type="text" label="First Name" />
                  </Col>
                  <Col xs={24} md={8}>
                    <CInput name="middleName" type="text" label="Middle Name" />
                  </Col>
                  <Col xs={24} md={8}>
                    <CInput name="lastName" type="text" label="Last Name" />
                  </Col>
                  <Col xs={24} md={12}>
                    <CSelect name="gender" label="Gender" options={genderOptions} />
                  </Col>
                  <Col xs={24} md={12}>
                    <CDatePicker name="dateOfBirth" label="Date of Birth" />
                  </Col>
                  <Col xs={24} md={12}>
                    <CInput name="contactNo" type="text" label="Contact Number" />
                  </Col>
                  <Col xs={24} md={12}>
                    <CInput name="emergencyContactNo" type="text" label="Emergency Contact" />
                  </Col>
                  <Col xs={24} md={12}>
                    <CSelect name="bloogGroup" label="Blood Group" options={bloodGroupOptions} />
                  </Col>
                  <Col xs={24} md={12}>
                    <CInput name="designation" type="text" label="Designation" />
                  </Col>
                  <Col xs={24}>
                    <CInput name="presentAddress" type="text" label="Present Address" />
                  </Col>
                  <Col xs={24}>
                    <CInput name="permanentAddress" type="text" label="Permanent Address" />
                  </Col>
                  <Col xs={24}>
                    <Button type="primary" htmlType="submit" loading={isUpdating} size="large">
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </CForm>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default EditFacultyProfile
