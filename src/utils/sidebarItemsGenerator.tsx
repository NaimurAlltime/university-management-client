import type React from "react"
import { NavLink } from "react-router-dom"
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiSettings,
  FiDatabase,
  FiGrid,
  FiBook,
  FiUser,
  FiFileText,
  FiCalendar,
} from "react-icons/fi"
import type { MenuProps } from "antd"

export type TUserPath = {
  name: string
  path?: string
  element?: React.ReactNode
  children?: TUserPath[]
}

type IconType = React.ElementType

const menuItemStyle: React.CSSProperties = {
  margin: "4px 0",
  borderRadius: "8px",
  transition: "all 0.3s",
}

const activeMenuItemStyle: React.CSSProperties = {
  // background: "rgba(124, 58, 237, 0.1)",
  borderRight: "2px solid #7C3AED",
}

const iconMap: Record<string, IconType> = {
  Dashboard: FiHome,
  "User Management": FiUsers,
  "Academic Management": FiBookOpen,
  "Course Management": FiBook,
  Products: FiGrid,
  CRM: FiUsers,
  "Data Source": FiDatabase,
  Settings: FiSettings,
  Profile: FiUser,
  Courses: FiBook,
  Schedule: FiCalendar,
  Documents: FiFileText,
}

export const generateSidebarItems = (items: TUserPath[], role: string): MenuProps["items"] => {
  return items.reduce<MenuProps["items"]>((acc, item) => {
    if (item.path && item.name) {
      const Icon = iconMap[item.name] || FiGrid
      acc.push({
        key: item.name,
        icon: <Icon />,
        label: (
          <div style={menuItemStyle}>
            <NavLink
              to={`/${role}/${item.path}`}
              style={({ isActive }) => ({
                color: isActive ? "#7C3AED" : "inherit",
                fontWeight: isActive ? 500 : 400,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s",
                ...(isActive ? activeMenuItemStyle : {}),
              })}
            >
              {item.name}
            </NavLink>
          </div>
        ),
      })
    }

    if (item.children) {
      const Icon = iconMap[item.name] || FiGrid
      acc.push({
        key: item.name,
        icon: <Icon />,
        label: item.name,
        children: item.children.reduce<MenuProps["items"]>((childAcc, child) => {
          if (child.name) {
            childAcc.push({
              key: child.name,
              label: (
                <div style={menuItemStyle}>
                  <NavLink
                    to={`/${role}/${child.path}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#7C3AED" : "inherit",
                      fontWeight: isActive ? 500 : 400,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      transition: "all 0.3s",
                      ...(isActive ? activeMenuItemStyle : {}),
                    })}
                  >
                    {child.name}
                  </NavLink>
                </div>
              ),
            })
          }
          return childAcc
        }, []),
      })
    }

    return acc
  }, [])
}








