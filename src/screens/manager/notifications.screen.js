import React from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as NotificationContext } from '../../contexts/notificationsContext'
import { ArrowBackSVG } from '../../svg'
import moment from 'moment'
import { empty_notifications } from '../../themes/images'

const { width } = Dimensions.get('window')

const NotificationsScreen = ({ navigation }) => {
   const {
      state: { notifications },
   } = React.useContext(NotificationContext)

   const back = React.useCallback(() => navigation.pop(), [])

   return (
      <AppStatusBar>
         <View style={styles.line_between}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable
                  onPress={back}
                  android_ripple={{
                     color: COLORS.DARK_200,
                     borderless: true,
                  }}
               >
                  <ArrowBackSVG />
               </Pressable>
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>
                  Notifications
               </Text>
            </View>
         </View>
         {notifications.length === 0 ? (
            <View
               style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
               }}
            >
               <Image source={empty_notifications} resizeMode="contain" style={{ width: '70%', maxHeight: 400 }} />
               <Text
                  style={{
                     fontSize: SIZES.H5,
                     color: COLORS.DARK_500,
                     fontWeight: 'bold',
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                     textAlign: 'center',
                  }}
               >
                  No notifications !
               </Text>
            </View>
         ) : (
            <>
               <FlatList
                  data={notifications}
                  keyExtractor={(item, index) => 'item' + item.notification_id + index}
                  renderItem={({ item, index }) => <NotificationItem item={item} index={index} />}
               />
            </>
         )}
      </AppStatusBar>
   )
}

const NotificationItem = ({ item, index }) => {
   return (
      <>
         {index === 0 ? (
            <>
               <Space />
               <Space />
            </>
         ) : null}
         <View style={styles.container}>
            <View style={[styles.line, { paddingBottom: 5 }]}>
               <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500 }}>{item.title}</Text>
            </View>
            <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>{item.message}</Text>
            <View style={[styles.line, { paddingTop: 5 }]}>
               <View />
               <Text style={{ fontSize: SIZES.H8, color: COLORS.DARK_200 }}>
                  {moment(item.created_at).format('ddd, DD MMM YYYY')}
               </Text>
            </View>
            {item.is_read ? null : <View style={styles.point} />}
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   point: {
      width: 15,
      height: 15,
      backgroundColor: COLORS.SUCCESS,
      borderRadius: 100,
      position: 'absolute',
      top: -6,
      right: 10,
   },
   subTitle: {
      color: COLORS.DARK_800,
      fontWeight: 'bold',
      fontSize: SIZES.H6,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingBottom: 4,
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      padding: SIZES.SMALL_PADDING,
      position: 'relative',
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING,
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   doc_container: {
      flexDirection: 'row',
      paddingVertical: 5,
   },
   doc_name: {
      fontSize: SIZES.H7,
      fontWeight: 'bold',
      color: COLORS.DARK_800,
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300,
   },
})

NotificationsScreen.navigationOptions = () => ({
   headerShown: false,
})

export default NotificationsScreen
