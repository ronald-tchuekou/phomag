import React from 'react'
import { withNavigation } from 'react-navigation'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { NotificationSVG } from '../svg'
import { Context as AuthContext } from '../contexts/authContext'
import { Context as RequestContext } from '../contexts/requestContext'
import { Context as NotificationContext } from '../contexts/notificationsContext'
import COLORS from '../themes/colors'
import io from 'socket.io-client'
import API_ROUTES from '../api/api_routes'
import { notifyUser } from '../utils'

export const NotificationButton = withNavigation(({ navigation }) => {
   const {
      state: { currentUserToken, currentUser },
   } = React.useContext(AuthContext)

   const {
      state: { notReadNotificationsCount },
      getNotifications,
      countNotReadNotification,
      addNotification,
   } = React.useContext(NotificationContext)

   const {
      state: { requestsList },
      getAuthorRequests,
      getValidatorRequests,
      getPrinterRequests,
   } = React.useContext(RequestContext)

   const showNotifications = React.useCallback(() => {
      navigation.navigate('NotificationsScreen')
   }, [])

   React.useEffect(() => {
      const socket = io(API_ROUTES.SOCKET_URI)
      getNotifications(currentUserToken, (error, res) => {
         if (error) {
            console.log(error)
            return
         }
         countNotReadNotification()
      })
      socket.on('notify', async (data) => {
         const role =
            currentUser.role === 'Chief'
               ? 'chief'
               : currentUser.role === 'Teacher'
               ? 'user_' + currentUser.user_id
               : 'printer_' + currentUser.user_id
         if (data.receiver_id === role){
            // const notify = await notifyUser(data.title, 'com.roncoder.phomag', data.message)
            // console.log('User is notify manualy : ', notify)
            getNotifications(currentUserToken, (error, res) => {
               if (error) {
                  console.log(error)
                  return
               }
               countNotReadNotification()
            })
         }
         if (data.type === 'REQUEST') {
            if (currentUser.role === 'Chief') getValidatorRequests(currentUserToken, null)
            if (currentUser.role === 'Teacher') getAuthorRequests(currentUserToken, null)
            if (currentUser.role === 'Printer') getPrinterRequests(currentUserToken, null)
         }
      })
      return () => socket.disconnect()
   }, [])

   return (
      <Pressable
         onPress={showNotifications}
         android_ripple={{
            color: COLORS.DARK_200,
            borderless: true,
         }}
         style={styles.notification}
      >
         <NotificationSVG />
         {notReadNotificationsCount === 0 ? null : (
            <View style={styles.notification_label}>
               <Text style={styles.notification_text}>{notReadNotificationsCount}</Text>
            </View>
         )}
      </Pressable>
   )
})

const styles = StyleSheet.create({
   notification: {
      position: 'relative',
      padding: 2,
   },
   notification_label: {
      position: 'absolute',
      top: -3,
      right: -5,
      borderRadius: 50,
      backgroundColor: COLORS.ERROR,
      paddingHorizontal: 3,
      paddingVertical: 1,
   },
   notification_text: {
      color: COLORS.WHITE,
      fontSize: 12,
      paddingHorizontal: 3,
   },
})
