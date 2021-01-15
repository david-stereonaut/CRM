import { Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import AddForm from './AddForm';

const Actions = inject('ClientStore')(observer((props) => {

  return (
    <div id="add-container">
      <Typography variant="h6">Add</Typography>
      <AddForm />
    </div>
  )
}))

export default Actions