import { Button, Card, Form, Row, Typography } from "antd"
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import type { FieldValues } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useLoginMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hooks"
import { type TUser, setUser } from "../redux/features/auth/authSlice"
import { verifyToken } from "../utils/verifyToken"
import PHForm from "../components/form/PHForm"
import PHInput from "../components/form/PHInput"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const defaultValues = {
    userId: "",
    password: "",
  }

  const [login] = useLoginMutation()

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in")

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      }
      const res = await login(userInfo).unwrap()

      const user = verifyToken(res.data.accessToken) as TUser
      dispatch(setUser({ user: user, token: res.data.accessToken }))
      toast.success("Logged in", { id: toastId, duration: 2000 })

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`)
      } else {
        navigate(`/${user.role}/dashboard`)
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 })
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
        }}
        className="hover:shadow-lg transition-shadow duration-300"
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UU4ExnOLUuT8JfS3DnXw71GClr9fax.png"
              alt="Uttara University Logo"
              style={{
                height: 60,
                objectFit: "contain",
              }}
            />
          </div>
          <Typography.Text type="secondary">Please sign in to continue</Typography.Text>
        </div>

        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Form.Item label="User ID" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 24 }}>
            <PHInput
              type="text"
              name="userId"
              placeholder="Enter your ID"
              prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
              style={{
                height: 45,
                borderRadius: 8,
              }}
            />
          </Form.Item>

          <Form.Item label="Password" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 24 }}>
            <PHInput
             type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              prefix={<LockOutlined className="input-icon" />}
              suffix={
                <span onClick={() => setPasswordVisible(!passwordVisible)} className="password-toggle">
                  {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              }
              style={{
                height: 45,
                borderRadius: 8,
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              height: 45,
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 500,
            }}
            className="hover:opacity-90 transition-opacity duration-300"
          >
            Sign In
          </Button>
        </PHForm>
      </Card>
    </Row>
  )
}

