import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, AppTextInput, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'

const { width } = Dimensions.get('window')

const PrinterServiceAddScreen = ({ navigation }) => {
   const back = React.useCallback(() => navigation.pop(), [])

   const {
      state: { formData },
      setFormDataField
   } = React.useContext(AuthContext)

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {
      })
   }

   function getValue(key, default_value) {
      if (formData)
         return formData[key] || default_value
      return default_value
   }

   return (
      <AppStatusBar>
         <View style={styles.line_between}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable onPress={back} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Svg
                     width='40'
                     height='40'
                     viewBox='0 0 30 30'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                     <Path
                        d='M17.2875 23.75C17.1008 23.7506 16.9162 23.7094 16.7475 23.6294C16.5788 23.5493 16.4301 23.4325 16.3125 23.2875L10.275 15.7875C10.0911 15.5638 9.99064 15.2833 9.99064 14.9937C9.99064 14.7042 10.0911 14.4236 10.275 14.2L16.525 6.69998C16.7372 6.44471 17.0421 6.28418 17.3726 6.2537C17.7031 6.22323 18.0322 6.32531 18.2875 6.53748C18.5428 6.74965 18.7033 7.05454 18.7338 7.38507C18.7642 7.71561 18.6622 8.04471 18.45 8.29998L12.8625 15L18.2625 21.7C18.4154 21.8835 18.5124 22.1069 18.5423 22.3438C18.5721 22.5808 18.5335 22.8213 18.4309 23.0369C18.3284 23.2526 18.1662 23.4344 17.9635 23.5607C17.7609 23.6871 17.5263 23.7528 17.2875 23.75Z'
                        fill={COLORS.DARK_500} />
                  </Svg>
               </Pressable>
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>Add printer
                  service</Text>
            </View>
         </View>

         <Space />
         <Space />

         <View style={styles.container}>
            <Space />
            <Space />
            <AppTextInput
               label={'Service name'}
               onChange={(val) => setValue('service_name', val)}
               value={getValue('service_name', '')}
            />

            <Space />
            <Space />

            <AppTextInput
               label={'Service address'}
               onChange={(val) => setValue('service_address', val)}
               value={getValue('service_address', '')}
            />

            <Space />
            <Space />

            <AppTextInput
               label={'Service e-mail address'}
               type={'email-address'}
               onChange={(val) => setValue('service_email', val)}
               value={getValue('service_email', '')}
            />

            <Space />
            <Space />

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Pressable
                  android_ripple={{
                     color: 'rgba(255,255,255,0.53)'
                  }}
                  style={[STYLES.button_accent, { width: 150 }]}>
                  <Text style={STYLES.button_text_accent}>Submit</Text>
               </Pressable>
            </View>

            <Space />
            <Space />

         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   subTitle: {
      color: COLORS.DARK_800,
      fontWeight: 'bold',
      fontSize: SIZES.H6,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingBottom: 4
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      padding: SIZES.DEFAULT_PADDING
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
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   doc_container: {
      flexDirection: 'row',
      paddingVertical: 5
   },
   doc_name: {
      fontSize: SIZES.H7,
      fontWeight: 'bold',
      color: COLORS.DARK_800
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300
   }
})

PrinterServiceAddScreen.navigationOptions = () => ({
   headerShown: false
})

export default PrinterServiceAddScreen