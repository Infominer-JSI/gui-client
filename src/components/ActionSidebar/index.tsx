// import modules
import { Link } from "react-router-dom";

// import sidebar
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

//===============================================
// Define the component interface
//===============================================

interface IActionSidebarProps {
  toggled: boolean;
  handleToggleSidebar: (value: boolean) => void;
}

//===============================================
// Define the component
//===============================================

export default function ActionSidebar(props: IActionSidebarProps) {
  // get the component props
  const { toggled, handleToggleSidebar } = props;

  return (
    <ProSidebar
      collapsed={false}
      toggled={toggled}
      breakPoint="lg"
      onToggle={handleToggleSidebar}
    >
      <Menu iconShape="square">
        <SubMenu title="Clustering">
          <MenuItem>KMeans</MenuItem>
        </SubMenu>
        <SubMenu title="Classification">
          <MenuItem>Active Learning</MenuItem>
        </SubMenu>
        <SubMenu title="Visualization">
          <MenuItem>Distribution</MenuItem>
        </SubMenu>
        <SubMenu title="Set Theory">
          <MenuItem>Union</MenuItem>
          <MenuItem>Intersection</MenuItem>
          <MenuItem>Difference</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
}
