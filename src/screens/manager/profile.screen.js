import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import { ArrowLeft, NotificationSVG } from '../../svg'
import COLORS from '../../themes/colors'
import { profile1 } from '../../themes/images'
import SIZES from '../../themes/sizes'

const ProfileScreen = ({ navigation }) => {

   const showNotifications = React.useCallback(() => {
      navigation.navigate('NotificationsScreen')
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <View style={styles.line}>
               <View style={styles.profile}>
                  <Image
                     source={profile1}
                     resizeMode={'contain'}
                     style={{ width: '100%', height: '100%' }} />
               </View>
               <View style={{ padding: SIZES.SMALL_PADDING }}>
                  <Text style={{
                     fontSize: SIZES.H6,
                     color: COLORS.DARK_500,
                     fontWeight: '700'
                  }}>Ronald Tchuekou</Text>
                  <Text style={{
                     fontSize: SIZES.H7,
                     color: COLORS.SUCCESS,
                     fontWeight: '600'
                  }}>Manager</Text>
               </View>
            </View>
            <Pressable
               onPress={showNotifications}
               android_ripple={{
               color: COLORS.DARK_200,
               borderless: true
            }}
               style={styles.notification}>
               <NotificationSVG />
               <View style={styles.notification_label}>
                  <Text style={styles.notification_text}>10</Text>
               </View>
            </Pressable>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               android_ripple={{
                  color: COLORS.DARK_100
               }}
               style={styles.setting_content}>
               <View>
                  <Text style={styles.label}>Change language</Text>
                  <Text style={styles.description}>English</Text>
               </View>
               <View>
                  <ArrowLeft />
               </View>
            </Pressable>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               android_ripple={{
                  color: COLORS.DARK_100
               }}
               style={styles.setting_content}>
               <View>
                  <Text style={styles.label}>Change theme</Text>
                  <Text style={styles.description}>Light</Text>
               </View>
               <View>
                  <ArrowLeft />
               </View>
            </Pressable>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               android_ripple={{
                  color: COLORS.DARK_100
               }}
               style={styles.setting_content}>
               <Text style={{
                  fontSize: SIZES.H7,
                  fontWeight: '700',
                  color: COLORS.ERROR
               }}>Disconnect</Text>
            </Pressable>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   profile: {
      width: 60,
      height: 60,
      borderRadius: 500,
      backgroundColor: COLORS.DARK_200,
      overflow: 'hidden'
   },
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   container: {
      padding: SIZES.MEDIUM_PADDING
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   },
   line: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   notification: {
      position: 'relative',
      padding: 2
   },
   notification_label: {
      position: 'absolute',
      top: -3,
      right: -5,
      borderRadius: 50,
      backgroundColor: COLORS.ERROR,
      paddingHorizontal: 3,
      paddingVertical: 1
   },
   notification_text: {
      color: COLORS.WHITE,
      fontSize: 12
   },
   label: {
      fontSize: SIZES.H7,
      fontWeight: '700',
      color: COLORS.DARK_500
   },
   description: {
      fontSize: SIZES.H8,
      fontWeight: '600',
      color: COLORS.DARK_300
   },
   setting_container: {
      marginHorizontal: SIZES.DEFAULT_MARGIN,
      borderRadius: 15,
      overflow: 'hidden'
   },
   setting_content: {
      padding: SIZES.DEFAULT_PADDING,
      backgroundColor: COLORS.WHITE,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: COLORS.DARK_200,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   }
})

ProfileScreen.navigationOptions = () => ({
   headerShown: false
})

export default ProfileScreen