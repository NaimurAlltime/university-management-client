"use client"

import { Button, Card, Form, Input, message, Typography, Space } from "antd"
import { LockOutlined, ArrowLeftOutlined, KeyOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useChangePasswordMutation } from "../../redux/features/auth/authApi"

const { Title, Text } = Typography

const ChangePassword = () => {
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
      navigate("/student/profile")
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to change password")
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <KeyOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          Change Password
        </Title>
        <Text type="secondary">Update your account password for security</Text>
      </div>

      <Card style={{ maxWidth: "600px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/student/profile")}
            style={{ marginBottom: "16px" }}
          >
            Back to Profile
          </Button>

          <div
            style={{
              background: "linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #91d5ff",
            }}
          >
            <Space direction="vertical" size="small">
              <Text strong style={{ color: "#1890ff" }}>
                Password Requirements:
              </Text>
              <Text type="secondary">• Minimum 6 characters long</Text>
              <Text type="secondary">• Must be different from your current password</Text>
              <Text type="secondary">• Use a strong, unique password for security</Text>
            </Space>
          </div>
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
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your current password"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("oldPassword") !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("New password must be different from current password!"))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your new password"
              size="large"
              style={{ borderRadius: "8px" }}
            />
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
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your new password"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: "32px" }}>
            <Space size="middle">
              <Button onClick={() => navigate("/student/profile")} size="large" style={{ minWidth: "120px" }}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                style={{ minWidth: "200px", borderRadius: "8px" }}
                icon={<KeyOutlined />}
              >
                Change Password
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#fffbe6",
            borderRadius: "8px",
            border: "1px solid #ffe58f",
          }}
        >
          <Space direction="vertical" size="small">
            <Text strong style={{ color: "#faad14" }}>
              Security Tips:
            </Text>
            <Text type="secondary">• Don't share your password with anyone</Text>
            <Text type="secondary">• Log out from shared computers after use</Text>
            <Text type="secondary">• Change your password regularly for better security</Text>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default ChangePassword
