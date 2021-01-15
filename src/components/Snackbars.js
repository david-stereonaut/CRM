import { IconButton, Snackbar } from "@material-ui/core";
import { observer, inject } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from "react";


const Snackbars = inject('GeneralStore')(observer((props) => {

  let { GeneralStore } = props

  return (
    <Snackbar
        open={GeneralStore.snackbar}
        autoHideDuration={3000}
        onClose={GeneralStore.closeSnackbar}
        message={GeneralStore.snackbarText}
        action={
          <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={GeneralStore.closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
        className={GeneralStore.snackbarClass}
      />
  )
}))

export default Snackbars