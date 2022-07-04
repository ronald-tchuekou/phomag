import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { ToastMessage } from '../../utils'
import { Context as AvailabilityContext } from '../../contexts/availabilityContext'
import moment from 'moment'
import 'moment/locale/en-ca'

moment.locale('en-ca')

const { width } = Dimensions.get('window')

const AddAvailabilityScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const {
      state: { currentUser },
   } = React.useContext(AuthContext)

   const {
      state: { formData },
      setFormDataField,
      createPlage,
   } = React.useContext(AvailabilityContext)

   const back = React.useCallback(() => navigation.pop(), [])

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {})
   }

   function getValue(key, default_value) {
      if (formData) return formData[key] || default_value
      return default_value
   }

   function submit() {
      const date = getValue('date', '')
      const begin = getValue('begin_hour', '').trim()
      const end = getValue('end_hour', '').trim()

      if (date === '' || begin == '' || end === '') {
         ToastMessage('Please set values of fields !')
         return
      }

      const data = {
         date,
         end,
         begin,
         printer_id: currentUser.user_id,
      }

      loader_ref.current.show()
      createPlage(data, currentUser.token, (error, res) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided, please try again !')
         }
         ToastMessage('New period are successfull added !')
         console.log(res)
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
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>
                  Add new availability
               </Text>
            </View>
         </View>
         <Space />
         <Space />
         <View style={styles.container}>
            <Space />
            <Space />
            <Text style={styles.subTitle}>{moment(getValue('date', '')).format('dddd, DD MMM YYYY')}</Text>
            <Space />
            <AppTextInput
               label={'Begin hour'}
               onChange={(val) => setValue('begin_hour', val)}
               value={getValue('begin_hour', '')}
            />
            <Space />
            <Space />
            <AppTextInput
               label={'End hour'}
               onChange={(val) => setValue('end_hour', val)}
               value={getValue('end_hour', '')}
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
      textAlign: 'center',
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

AddAvailabilityScreen.navigationOptions = () => ({
   headerShown: false,
})

export default AddAvailabilityScreen
