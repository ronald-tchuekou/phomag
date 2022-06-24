import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, Space } from '../../components'
import { ArrowLeft } from '../../svg'
import COLORS from '../../themes/colors'
import { profile1 } from '../../themes/images'
import SIZES from '../../themes/sizes'

const ProfileScreen = ({ navigation }) => {
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
            <Pressable android_ripple={{
               color: COLORS.DARK_200,
               borderless: true
            }} style={styles.notification}>
               <Svg
                  width='30'
                  height='30'
                  viewBox='0 0 25 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <Path
                     d='M22.5764 19.3264C21.9067 18.7294 21.3205 18.0451 20.8333 17.2917C20.3015 16.2518 19.9828 15.1162 19.8958 13.9514V10.5209C19.9004 8.69142 19.2368 6.92327 18.0297 5.54862C16.8225 4.17397 15.155 3.28743 13.3403 3.05558V2.15975C13.3403 1.91387 13.2426 1.67806 13.0687 1.5042C12.8949 1.33034 12.6591 1.23267 12.4132 1.23267C12.1673 1.23267 11.9315 1.33034 11.7576 1.5042C11.5838 1.67806 11.4861 1.91387 11.4861 2.15975V3.06947C9.68768 3.31803 8.04026 4.20993 6.84898 5.57996C5.6577 6.95 5.00329 8.70534 5.00695 10.5209V13.9514C4.91997 15.1162 4.60124 16.2518 4.06945 17.2917C3.59089 18.0433 3.01403 18.7276 2.35417 19.3264C2.28009 19.3915 2.22072 19.4716 2.18001 19.5614C2.1393 19.6512 2.11818 19.7486 2.11806 19.8472V20.7917C2.11806 20.9759 2.19122 21.1525 2.32146 21.2827C2.45169 21.413 2.62832 21.4861 2.8125 21.4861H22.1181C22.3022 21.4861 22.4789 21.413 22.6091 21.2827C22.7393 21.1525 22.8125 20.9759 22.8125 20.7917V19.8472C22.8124 19.7486 22.7913 19.6512 22.7505 19.5614C22.7098 19.4716 22.6505 19.3915 22.5764 19.3264ZM3.5625 20.0972C4.20862 19.4731 4.7775 18.7736 5.25695 18.0139C5.92682 16.758 6.31766 15.3723 6.40278 13.9514V10.5209C6.37524 9.707 6.51175 8.89591 6.8042 8.13591C7.09664 7.3759 7.53904 6.68252 8.10503 6.09704C8.67103 5.51157 9.34906 5.04598 10.0987 4.728C10.8484 4.41001 11.6544 4.24614 12.4688 4.24614C13.2831 4.24614 14.0891 4.41001 14.8388 4.728C15.5884 5.04598 16.2665 5.51157 16.8325 6.09704C17.3985 6.68252 17.8409 7.3759 18.1333 8.13591C18.4257 8.89591 18.5623 9.707 18.5347 10.5209V13.9514C18.6198 15.3723 19.0107 16.758 19.6806 18.0139C20.16 18.7736 20.7289 19.4731 21.375 20.0972H3.5625Z'
                     fill={COLORS.DARK_500} />
                  <Path
                     d='M12.5 23.8055C12.9375 23.7954 13.3573 23.631 13.6851 23.3412C14.013 23.0514 14.2279 22.6551 14.2917 22.2222H10.6389C10.7045 22.6668 10.9294 23.0725 11.2717 23.3638C11.6141 23.655 12.0506 23.812 12.5 23.8055Z'
                     fill={COLORS.DARK_500} />
               </Svg>
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