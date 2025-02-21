import type React from "react"
import { Avatar, Button, Dropdown, Input, Layout, type MenuProps, theme } from "antd"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/features/auth/authSlice"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { BellOutlined, GlobalOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"

const { Header, Content } = Layout

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const { token } = theme.useToken()

  const handleLogout = () => {
    dispatch(logout())
  }

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "logout",
      label: "Logout",
      onClick: handleLogout,
    },
  ]

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout style={{ marginLeft: 250 }}>
        <Header
          style={{
            padding: "0 24px",
            background: "linear-gradient(to right, #ffffff, #f0f2f5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            borderBottom: "1px solid rgba(124, 58, 237, 0.1)",
            height: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Input
              prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
              placeholder="Search..."
              style={{
                maxWidth: 400,
                borderRadius: 8,
                backgroundColor: "rgba(255,255,255,0.8)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
              type="text"
              icon={<GlobalOutlined />}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            />
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            />
            <Button
              type="text"
              icon={<SettingOutlined />}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                icon={<UserOutlined />}
                style={{
                  cursor: "pointer",
                  backgroundColor: token.colorPrimary,
                  border: "2px solid #fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            overflow: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout






