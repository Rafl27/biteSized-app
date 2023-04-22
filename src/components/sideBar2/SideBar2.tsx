import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface SidebarProps {
  items: SidebarItem[]
}

interface SidebarItem {
  name: string
  icon: string
  link: string
}

const Sidebar2: React.FC<SidebarProps> = ({ items }) => {
  return (
    <Nav className="flex-column">
      {items.map((item, index) => (
        <Nav.Item key={index}>
          <Link to={item.link} className="nav-link">
            <i className={`material-icons ${item.icon}`}></i>
            {item.name}
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default Sidebar2
