import { observer, inject } from 'mobx-react'
import './Badges.scss'
import NewClientsBadge from './NewClientsBadge'
import EmailsBadge from './EmailsBadge'
import OutstandingBadge from './OutstandingBadge';
import CountryBadge from './CountryBadge';


const Badges = inject('GeneralStore')(observer((props) => {

  let {GeneralStore} = props
  const classes = GeneralStore.badgeStyles()

  return (
    <div id="badges-container" className={classes.root}>
      <NewClientsBadge />
      <EmailsBadge />
      <OutstandingBadge />
      <CountryBadge />
    </div>
  )
}))

export default Badges