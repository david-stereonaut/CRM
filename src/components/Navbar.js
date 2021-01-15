import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react'


const Navbar = inject('GeneralStore')(observer((props) => {

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  let generalStore = props.GeneralStore
  return (
    <div className='Navbar'>
      <AppBar position="static">
        <Tabs value={generalStore.currentTab} onChange={generalStore.handleTabChange}>
          <Tab label={"Clients"} component={Link}  to="/clients" {...tabProps(0)} />
          <Tab label="Actions" component={Link}  to="/actions" {...tabProps(1)} />
          <Tab label="Analytics" component={Link}  to="/analytics" {...tabProps(2)} />
        </Tabs>
      </AppBar>
    </div>
  )
}))

export default Navbar