import Vue from 'vue'
import swal from 'sweetalert'
import { has } from 'underscore'

/**
 * Helper function for emitting alert messages
 *
 * @type {{showSuccessAlert: ((response)), showErrorAlert: ((response))}}
 */
window.Alert = new class {
  // Constructor
  constructor () {
    this.vue = new Vue()
  }

  /**
   * Show success alert
   *
   * @param response
   * @returns {Promise<any>}
   */
  showSuccessAlert (response) {
    return new Promise((resolve, reject) => {
      let message = response.message

      if (has(response, 'data')) {
        message = response.data.message
      }

      swal({
        title: 'Success',
        icon: 'success',
        content: {
          element: 'p',
          attributes: {
            innerHTML: message
          }
        }
      }).then(() => {
        resolve({ confirmed: true })
      })
    })
  }

  /**
   * Show success toast notification
   *
   * @param response
   */
  showSuccessToast (response) {
    let message = response.message

    if (has(response, 'data')) {
      message = response.data.message
    }

    Vue.notify({
      group: 'alerts',
      type: 'success',
      title: 'Success',
      text: message,
      duration: 5000 // milliseconds, use -1 to prevent going away
    })
  }

  /**
   * Show warning alert
   *
   * @param response
   * @returns {Promise<any>}
   */
  showWarningAlert (response) {
    return new Promise((resolve, reject) => {
      let title = 'Warning'
      let message = ''
      let icon = 'warning'
      let buttons = {
        cancel: true,
        confirm: true
      }

      if (response.hasOwnProperty('title')) {
        title = response.title
      }

      if (response.hasOwnProperty('message')) {
        message = response.message
      } else if (has(response, 'data')) {
        message = response.data.message
      }

      if (response.hasOwnProperty('buttons')) {
        buttons = response.buttons
      }

      if (response.hasOwnProperty('icon')) {
        icon = response.icon
      }

      let swalOptions = null
      if (response.hasOwnProperty('el')) {
        swalOptions = {
          title: title,
          icon: icon,
          text: response.message,
          buttons: buttons,
          content: response.el,
        }
      } else {
        swalOptions = {
          title: title,
          icon: icon,
          buttons: buttons,
          content: {
            element: 'p',
            attributes: {
              innerHTML: message
            },
          },
        }
      }

      swal(swalOptions).then(value => {
        if (value) {
          resolve({ confirmed: true })
        } else {
          reject({ confirmed: false })
        }
      })
    })
  }

  /**
   * Show toast warning
   *
   * @param error
   */
  showWarningToast (error) {
    let title = 'Warning'
    let type = 'warning'
    let message = ''

    if (error.hasOwnProperty('type')) {
      type = error.type
    }
    if (error.hasOwnProperty('response')) {
      message += error.response.data.message
    } else if (error.hasOwnProperty('message')) {
      message += error.message
    } else {
      $.each(error, function (key, value) {
        message += value[0] + '<br/>'
      })
    }

    Vue.notify({
      group: 'alerts',
      type: type,
      title: title,
      text: message,
      duration: 5000 // milliseconds, use -1 to prevent going away
    })
  }

  /**
   * Show error alert
   *
   * @param error
   */
  showErrorAlert (error) {
    let title = 'Error'
    let type = 'error'
    let message = 'Your form contained the following errors:<br/><strong>'

    if (error.hasOwnProperty('type')) {
      type = error.type
    }
    if (error.hasOwnProperty('response')) {
      message += error.response.data.message
      type = error.response.data.status

      if (type === 'warning') {
        title = 'Warning'
      }

    } else if (error.hasOwnProperty('message')) {
      message += error.message
      type = error.status

      if (type === 'warning') {
        title = 'Warning'
      }
    } else {
      $.each(error, function (key, value) {
        message += value[0] + '<br/>'
      })
    }
    message += '</strong>'

    swal({
      title: title,
      icon: type,
      content: {
        element: 'p',
        attributes: {
          innerHTML: message
        }
      }
    })
  }

  /**
   * Show toast error
   *
   * @param error
   */
  showErrorToast (error) {
    let title = 'Error'
    let type = 'error'
    let message = ''

    if (error.hasOwnProperty('type')) {
      type = error.type
    }
    if (error.hasOwnProperty('response')) {
      message += error.response.data.message

    } else if (error.hasOwnProperty('message')) {
      message += error.message
    } else {
      $.each(error, function (key, value) {
        message += value[0] + '<br/>'
      })
    }

    Vue.notify({
      group: 'alerts',
      type: type,
      title: title,
      text: message,
      duration: 5000 // milliseconds, use -1 to prevent going away
    })
  }

  /**
   * Show notification
   *
   * @param notification
   */
  showNotificationAlert (notification) {
    swal({
      title: notification.name,
      icon: 'warning',
      text: notification.notification
    })
  }

  /**
   * Confirm delete, pass data back to requesting component if confirmed
   *
   * @param data
   * @returns {Promise<any>}
   */
  showConfirmDelete (data) {
    return new Promise((resolve, reject) => {
      let title = 'Are you sure?'
      let message = 'You will not be able to recover this entry!'
      let confirmText = 'Yes, delete it!'

      if (has(data, 'message')) {
        message = data.message
      }
      if (has(data, 'title')) {
        title = data.title
      }
      if (has(data, 'confirmText')) {
        confirmText = data.confirmText
      }
      swal({
        title: title,
        icon: 'warning',
        dangerMode: true,
        content: {
          element: 'p',
          attributes: {
            innerHTML: message
          }
        },
        buttons: {
          cancel: 'Cancel',
          confirm: confirmText
        },
        closeOnClickOutside: false
      }).then(value => {
        switch (value) {
          case 'confirm':
          case true:
            resolve({ confirmed: true })
            break

          case 'cancel':
          case null:
            reject({ confirmed: false })
            break

          default:
            reject({ confirmed: false })
            break
        }
      })
    })
  }

}