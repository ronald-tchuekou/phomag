import * as Notifications from 'expo-notifications'
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import './src/calendar-local-config'
import { Provider as AuthProvider } from './src/contexts/authContext'
import { Provider as PrinterProvider } from './src/contexts/printerServiceContext'
import { Provider as AvailabilityProvider } from './src/contexts/availabilityContext'
import { Provider as RequestProvider } from './src/contexts/requestContext'
import { Provider as NotificationProvider } from './src/contexts/notificationsContext'
import AuthFlow from './src/navigations/auth-flow'
import ManagerFlow from './src/navigations/manager/manager-flow'
import PrinterServiceFlow from './src/navigations/printer-service/printer-service-flow'
import StartFlow from './src/navigations/start-flow'
import TeacherFlow from './src/navigations/teacher/teacher-flow'

const baseNavigator = createSwitchNavigator(
   {
      StartFlow: StartFlow,
      AuthFlow: AuthFlow,
      ManagerFlow: ManagerFlow,
      TeacherFlow: TeacherFlow,
      PrinterServiceFlow: PrinterServiceFlow,
   },
   {
      initialRouteName: 'StartFlow',
   }
)

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
   }),
})

const App = createAppContainer(baseNavigator)

export default function AppMain() {
   const notificationListener = React.useRef(null)
   const responseListener = React.useRef(null)

   React.useEffect(() => {
      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
         console.log('Received Notification listener : ', notification)
      })
      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
         console.log('Received Notification response : ', response)
      })
      return () => {
         notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current)
         responseListener.current && Notifications.removeNotificationSubscription(responseListener.current)
      }
   }, [])

   return (
      <AuthProvider>
         <PrinterProvider>
            <AvailabilityProvider>
               <RequestProvider>
                  <NotificationProvider>
                     <App />
                  </NotificationProvider>
               </RequestProvider>
            </AvailabilityProvider>
         </PrinterProvider>
      </AuthProvider>
   )
}
