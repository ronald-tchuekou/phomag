import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { Context as PrinterContext } from '../../contexts/printerServiceContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { ToastMessage } from '../../utils'

const { width } = Dimensions.get('window')

const PrinterServiceAddScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const back = React.useCallback(() => navigation.pop(), [])

   const {
      state: { currentUserToken, currentUser },
   } = React.useContext(AuthContext)

   const {
      state: { formData },
      createPrinter,
      setFormDataField,
      resetFormData,
   } = React.useContext(PrinterContext)

   React.useEffect(() => {
      resetFormData()
   }, [])

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {})
   }

   function getValue(key, default_value) {
      if (formData) return formData[key] || default_value
      return default_value
   }

   const submit = () => {
      const service_name = getValue('service_name', '').trim()
      const service_address = getValue('service_address', '').trim()
      const service_email = getValue('service_email', '').trim()
      const service_phone = getValue('service_phone', '').trim()

      const data = {
         service_name: service_name,
         service_email: service_email,
         service_phone: service_phone,
         service_address: service_address,
         department: currentUser.department,
         created_by: currentUser.user_id,
      }

      if (service_name === '' || service_email === '' || service_phone === '' || service_address === '') {
         ToastMessage('Any fields can be empty!')
         return
      }

      loader_ref.current.show()
      createPrinter(data, currentUserToken, (error, res) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('An error are provided, please try again!')
            return
         }
         if (res) {
            ToastMessage('New Printer Service added !')
            navigation.pop()
         }
      })
   }

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
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 50 }]} numberOfLines={1}>
                  Add printer service
               </Text>
            </View>
         </View>
         <ScrollView style={{ flex: 1 }}>
            <Space />
            <Space />
            <View style={styles.container}>
               <Space />
               <Space />
               <AppTextInput
                  capitalize
                  label={'Service name'}
                  onChange={(val) => setValue('service_name', val)}
                  value={getValue('service_name', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  capitalize
                  label={'Service address'}
                  onChange={(val) => setValue('service_address', val)}
                  value={getValue('service_address', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  label={'Service phone'}
                  type={'phone-pad'}
                  onChange={(val) => setValue('service_phone', val)}
                  value={getValue('service_phone', '')}
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
                  <LinearGradient colors={[COLORS.WARNING_50, COLORS.WARNING]} style={STYLES.button_container}>
                     <Pressable
                        onPress={submit}
                        android_ripple={{
                           color: 'rgba(255,255,255,0.53)',
                        }}
                        style={[STYLES.button_accent, { width: 150 }]}
                     >
                        <Text style={STYLES.button_text_accent}>Submit</Text>
                     </Pressable>
                  </LinearGradient>
               </View>
               <Space />
               <Space />
               <ModalLoader ref={loader_ref} />
            </View>
         </ScrollView>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
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
      overflow: 'hidden',
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
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

PrinterServiceAddScreen.navigationOptions = () => ({
   headerShown: false,
})

export default PrinterServiceAddScreen
