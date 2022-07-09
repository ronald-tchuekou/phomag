import API_ROUTES from '../api/api_routes'
import phomagApi from '../api/phomag-api'
import createDataContext from './createDataContext'

const reducer = (state, action) => {
   switch (action.type) {
      case 'count_not_read':
         return { ...state, notReadNotificationsCount: state.notifications.filter((item) => !item.is_read).length }
      case 'set_notifications':
         return { ...state, notifications: action.payload }
      case 'add_notification':
         return { ...state, notifications: [action.payload, ...state.notifications] }
      case 'remove_notification':
         return {
            ...state,
            notifications: state.notifications.filter((item) => item.notification_id !== action.payload),
         }
      default:
         return state
   }
}

const getNotifications = (dispatch) => {
   return async (token, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_NOTIFICATIONS, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'set_notifications', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const createNotification = () => {
   return async (data, token, callback) => {
      try {
         const response = await phomagApi.post(API_ROUTES.GET_NOTIFICATIONS, data, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const updateNotification = () => {
   return async (id, data, token, callback) => {
      try {
         const response = await phomagApi.put(API_ROUTES.GET_NOTIFICATIONS + '/' + id, data, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const deletePrinter = (dispatch) => {
   return async (id, token, callback) => {
      try {
         const response = await phomagApi.delete(API_ROUTES.GET_NOTIFICATIONS + '/' + id, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'remove_notification', payload: id })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const addNotification = (dispatch) => {
   return (notification, callback) => {
      dispatch({ type: 'add_notification', payload: notification })
      if (callback) callback()
   }
}

const countNotReadNotification = (dispatch) => {
   return (callback) => {
      dispatch({ type: 'count_not_read' })
      if (callback) callback()
   }
}

export const { Context, Provider } = createDataContext(
   reducer,
   {
      getNotifications,
      createNotification,
      updateNotification,
      deletePrinter,
      addNotification,
      countNotReadNotification,
   },
   {
      notReadNotificationsCount: 0,
      notifications: [],
   }
)
