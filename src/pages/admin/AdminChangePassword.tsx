"use client"

import { Button, Card, Form, Input, message, Typography } from "antd"
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api"

const { Title } = Typography

const AdminChangePassword = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const onFinish = async (values: any) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap()

      message.success("Password changed successfully!")
      form.resetFields()
      navigate("/admin/profile")
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to change password")
    }
  }

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/admin/profile")}
            style={{ marginRight: "16px" }}
          >
            Back
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            Change Password
          </Title>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please enter your current password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter current password" size="large" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("The two passwords do not match!"))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" size="large" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: "32px" }}>
            <Button type="primary" htmlType="submit" loading={isLoading} size="large" style={{ minWidth: "200px" }}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AdminChangePassword
