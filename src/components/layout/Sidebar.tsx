import type React from "react"
import { useState } from "react"
import { Layout, Menu, theme } from "antd"
import { adminPaths } from "../../routes/admin.routes"
import { facultyPaths } from "../../routes/faculty.routes"
import { studentPaths } from "../../routes/student.routes"
import { useAppSelector } from "../../redux/hooks"
import { type TUser, useCurrentToken } from "../../redux/features/auth/authSlice"
import { verifyToken } from "../../utils/verifyToken"
import { generateSidebarItems } from "../../utils/sidebarItemsGenerator"

const { Sider } = Layout

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
} as const

type UserRole = (typeof userRole)[keyof typeof userRole]

const Sidebar: React.FC = () => {
  const token = useAppSelector(useCurrentToken)
  const { token: themeToken } = theme.useToken()
  const [openKeys, setOpenKeys] = useState<string[]>([])

  let user: TUser | null = null

  if (token) {
    user = verifyToken(token)
  }

  let sidebarItems

  if (user) {
    switch (user.role as UserRole) {
      case userRole.ADMIN:
        sidebarItems = generateSidebarItems(adminPaths, userRole.ADMIN)
        break
      case userRole.FACULTY:
        sidebarItems = generateSidebarItems(facultyPaths, userRole.FACULTY)
        break
      case userRole.STUDENT:
        sidebarItems = generateSidebarItems(studentPaths, userRole.STUDENT)
        break
      default:
        sidebarItems = []
    }
  }

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  return (
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "linear-gradient(to bottom, #ffffff, #f0f2f5)",
        boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
        overflowY: "auto",
        borderRight: "1px solid rgba(124, 58, 237, 0.1)",
        zIndex: 1000,
      }}
      width={250}
    >
        <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          color: themeToken.colorPrimary,
          fontSize: "20px",
          fontWeight: 600,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        <img src="/header_logo.png" style={{ width: "50px", height: "50px", marginTop: "5px" }} alt="" />
       <p style={{marginInlineStart: "6px"}}>Uttara University</p>
      </div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          height: "calc(100vh - 64px)",
          borderRight: "none",
          padding: "16px 0",
          background: "transparent",
        }}
        items={sidebarItems}
      />
    </Sider>
  )
}

export default Sidebar




