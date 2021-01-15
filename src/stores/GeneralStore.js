import { createMuiTheme, makeStyles } from '@material-ui/core';
import { observable, action, makeObservable } from  'mobx'

export class GeneralStore {
  constructor() {
      this.currentTab = 0
      this.formStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }))
      this.badgeStyles = makeStyles((theme) => ({
        root: {
          '& .MuiPaper-root': {
            borderRadius: '50%',
            padding: 15
          }
        }
      }))
      this.theme = createMuiTheme({
        palette: {
          primary: {
            main: '#2a9d8f'
          },
          secondary: {
            main: "#695958"
          }
        }
      })
      this.snackbarText = ''
      this.snackbar = false
      this.snackbarClass = 'sss'


      makeObservable(this, {
          currentTab: observable,
          formStyles: observable,
          badgeStyles: observable,
          snackbar: observable,
          handleTabChange: action,
          setTab: action,
          theme: observable,
          closeSnackbar: action,
          openSnackbar: action,
          snackbarText: observable,
          snackbarClass: observable
      })
  }

  closeSnackbar = () => {
    this.snackbar = false
  }

  openSnackbar = (message, className) => {
    this.snackbarClass = className
    this.snackbarText = message
    this.snackbar = true
  }

  handleTabChange = (event, value) => {
    this.currentTab = value
  }

  setTab = (value) => {
    this.currentTab = value
  }

}
