import React from 'react'
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppLoader, AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const { width } = Dimensions.get('window')

const NotificationsScreen = ({ navigation }) => {
   const [loading, setLoading] = React.useState(false)
   const [notifications, setNotifications] = React.useState([])

   React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         setNotifications([
            {
               id: 'notify1',
               title: 'Request validation',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: false,
            },
            {
               id: 'notify2',
               title: 'Request initialized',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: false,
            },
            {
               id: 'notify3',
               title: 'Request canceled',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: false,
            },
            {
               id: 'notify4',
               title: 'Request validation',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: true,
            },
            {
               id: 'notify5',
               title: 'Request initialized',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: true,
            },
            {
               id: 'notify6',
               title: 'Request canceled',
               message:
                  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page',
               date: 'Lundi, 20 Juin 2022',
               is_read: true,
            },
         ])
      }, 800)
   }, [])

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
                  <Svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <Path
                        d="M17.2875 23.75C17.1008 23.7506 16.9162 23.7094 16.7475 23.6294C16.5788 23.5493 16.4301 23.4325 16.3125 23.2875L10.275 15.7875C10.0911 15.5638 9.99064 15.2833 9.99064 14.9937C9.99064 14.7042 10.0911 14.4236 10.275 14.2L16.525 6.69998C16.7372 6.44471 17.0421 6.28418 17.3726 6.2537C17.7031 6.22323 18.0322 6.32531 18.2875 6.53748C18.5428 6.74965 18.7033 7.05454 18.7338 7.38507C18.7642 7.71561 18.6622 8.04471 18.45 8.29998L12.8625 15L18.2625 21.7C18.4154 21.8835 18.5124 22.1069 18.5423 22.3438C18.5721 22.5808 18.5335 22.8213 18.4309 23.0369C18.3284 23.2526 18.1662 23.4344 17.9635 23.5607C17.7609 23.6871 17.5263 23.7528 17.2875 23.75Z"
                        fill={COLORS.DARK_500}
                     />
                  </Svg>
               </Pressable>
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>
                  Notifications
               </Text>
            </View>
         </View>
         {loading ? (
            <AppLoader />
         ) : (
            <FlatList
               data={notifications}
               keyExtractor={(item, index) => 'item' + item.id + index}
               renderItem={({ item, index }) => <NotificationItem item={item} index={index} />}
            />
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
               <Text style={{ fontSize: SIZES.H8, color: COLORS.DARK_200 }}>{item.date}</Text>
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
