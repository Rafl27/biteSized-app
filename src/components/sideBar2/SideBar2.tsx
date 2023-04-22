import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AiFillDashboard } from 'react-icons/ai'
import { NavItem, NavLink } from 'react-bootstrap'
import './styles.css'
import { IconType } from 'react-icons'

interface SidebarProps {
  items: SidebarItem[]
}

interface SidebarItem {
  name: string
  icon: IconType
  link: string
}

const Sidebar2: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        {items.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link as={Link} to={item.link}>
              {React.createElement(item.icon)}
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  )
}

export default Sidebar2
