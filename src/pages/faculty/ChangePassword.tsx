"use client"

import { Button, Card, Typography, message } from "antd"
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useChangePasswordMutation } from "../../redux/features/auth/authApi"
import CForm from "../../components/form/CForm"
import CInput from "../../components/form/CInput"

const { Title } = Typography

const ChangePassword = () => {
  const navigate = useNavigate()
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const onSubmit = async (data: any) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap()

      message.success("Password changed successfully!")
      navigate("/faculty/dashboard")
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to change password")
    }
  }

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  return (
    <div
      style={{ padding: "24px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <Card style={{ width: "100%", maxWidth: 500 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/faculty/dashboard")}
            style={{ marginRight: "16px" }}
          >
            Back to Dashboard
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            Change Password
          </Title>
        </div>

        <CForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div style={{ marginBottom: "16px" }}>
            <CInput
              name="oldPassword"
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              prefix={<LockOutlined />}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <CInput
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="Enter new password"
              prefix={<LockOutlined />}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <CInput
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="Confirm new password"
              prefix={<LockOutlined />}
            />
          </div>

          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: "100%" }}>
            Change Password
          </Button>
        </CForm>
      </Card>
    </div>
  )
}

export default ChangePassword
