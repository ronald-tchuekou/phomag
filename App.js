import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthFlow from './src/navigations/auth-flow'
import { Provider as AuthProvider } from './src/contexts/authContext'
import { Provider as UserProvider } from './src/contexts/printerServiceContext'
import './src/calendar-local-config'
import * as Notifications from 'expo-notifications'
import ManagerFlow from './src/navigations/manager/manager-flow'
import PrinterServiceFlow from './src/navigations/printer-service/printer-service-flow'
import StartFlow from './src/navigations/start-flow'
import TeacherFlow from './src/navigations/teacher/teacher-flow'

const baseNavigator = createSwitchNavigator({
   StartFlow: StartFlow,
   AuthFlow: AuthFlow,
   ManagerFlow: ManagerFlow,
   TeacherFlow: TeacherFlow,
   PrinterServiceFlow: PrinterServiceFlow
}, {
   initialRouteName: 'StartFlow'
})

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
   })
})

const App = createAppContainer(baseNavigator)

export default () => {
   const notificationListener = React.useRef(null)
   const responseListener = React.useRef(null)

   React.useEffect(() => {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
         console.log('Received Notification listener : ', notification)
      })
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
         console.log('Received Notification response : ', response)
      })
      return () => {
         notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current)
         responseListener.current && Notifications.removeNotificationSubscription(responseListener.current)
      }
   }, [])
   return (
      <AuthProvider>
         <UserProvider>
            <App />
         </UserProvider>
      </AuthProvider>
   )
}
