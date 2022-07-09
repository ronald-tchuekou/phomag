import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, NotificationButton, RequestConfirmationModal, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { ArrowLeftSVG } from '../../svg'
import COLORS from '../../themes/colors'
import { default_profile } from '../../themes/images'
import SIZES from '../../themes/sizes'

const ProfileScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)
   const {
      state: { currentUser },
      signOut,
   } = React.useContext(AuthContext)

   const onConfirm = React.useCallback((status) => {
      if (status)
         signOut(() => {
            navigation.navigate('AuthFlow')
         })
   }, [])

   if (!currentUser) return null

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <View style={styles.line}>
               <View style={styles.profile}>
                  <Image source={default_profile} resizeMode={'contain'} style={{ width: '100%', height: '100%' }} />
               </View>
               <View style={{ padding: SIZES.SMALL_PADDING }}>
                  <Text
                     style={{
                        fontSize: SIZES.H6,
                        color: COLORS.DARK_500,
                        fontWeight: '700',
                     }}
                  >
                     {currentUser.matricule}
                  </Text>
                  <Text
                     style={{
                        fontSize: SIZES.H7,
                        color: COLORS.DARK_300,
                        fontWeight: '700',
                     }}
                  >
                     {currentUser.lastname} {currentUser.firstname}
                  </Text>
                  <Text
                     style={{
                        fontSize: SIZES.H7,
                        color: COLORS.DARK_300,
                        fontWeight: '700',
                     }}
                  >
                     {currentUser.email}
                  </Text>
                  <Text
                     style={{
                        fontSize: SIZES.H7,
                        color: COLORS.WARNING,
                        fontWeight: '600',
                     }}
                  >
                     {currentUser.role === 'Chief'
                        ? 'Manager'
                        : currentUser.role === 'Teacher'
                        ? 'Teacher'
                        : 'Printer Service'}
                  </Text>
               </View>
            </View>
            <NotificationButton/>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               android_ripple={{
                  color: COLORS.DARK_100,
               }}
               style={styles.setting_content}
            >
               <View>
                  <Text style={styles.label}>Change language</Text>
                  <Text style={styles.description}>English</Text>
               </View>
               <View>
                  <ArrowLeftSVG />
               </View>
            </Pressable>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               android_ripple={{
                  color: COLORS.DARK_100,
               }}
               style={styles.setting_content}
            >
               <View>
                  <Text style={styles.label}>Change theme</Text>
                  <Text style={styles.description}>Light</Text>
               </View>
               <View>
                  <ArrowLeftSVG />
               </View>
            </Pressable>
         </View>
         <Space />
         <View style={styles.setting_container}>
            <Pressable
               onPress={() => confirm_ref.current.show('Are you sure, you want to disconnect on this account ?')}
               android_ripple={{
                  color: COLORS.DARK_100,
               }}
               style={styles.setting_content}
            >
               <Text
                  style={{
                     fontSize: SIZES.H7,
                     fontWeight: '700',
                     color: COLORS.ERROR,
                  }}
               >
                  Disconnect
               </Text>
            </Pressable>
         </View>
         <RequestConfirmationModal onConfirm={onConfirm} ref={confirm_ref} />
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   profile: {
      width: 60,
      height: 60,
      borderRadius: 500,
      backgroundColor: COLORS.DARK_200,
      overflow: 'hidden',
   },
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   container: {
      padding: SIZES.MEDIUM_PADDING,
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
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   label: {
      fontSize: SIZES.H7,
      fontWeight: '700',
      color: COLORS.DARK_500,
   },
   description: {
      fontSize: SIZES.H8,
      fontWeight: '600',
      color: COLORS.DARK_300,
   },
   setting_container: {
      marginHorizontal: SIZES.DEFAULT_MARGIN,
      borderRadius: 15,
      overflow: 'hidden',
   },
   setting_content: {
      padding: SIZES.DEFAULT_PADDING,
      backgroundColor: COLORS.WHITE,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: COLORS.DARK_200,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
})

ProfileScreen.navigationOptions = () => ({
   headerShown: false,
})

export default ProfileScreen
