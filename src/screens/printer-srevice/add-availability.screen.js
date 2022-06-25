import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'

const { width } = Dimensions.get('window')

const AddAvailabilityScreen = ({ navigation }) => {

   const {
      state: { formData },
      setFormDataField
   } = React.useContext(AuthContext)

   const back = React.useCallback(() => navigation.pop(), [])

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
                  <ArrowBackSVG />
               </Pressable>
               <Text
                  style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]}
                  numberOfLines={1}
               >
                  Add new availability
               </Text>
            </View>
         </View>
         <Space />
         <Space />
         <View style={styles.container}>
            <Space />
            <Space />
            <Text style={styles.subTitle}>Monday, 20 Jun 2022</Text>
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
               <LinearGradient
                  colors={[COLORS.WARNING_50, COLORS.WARNING]}
                  style={STYLES.button_container}
               >
                  <Pressable
                     android_ripple={{
                        color: 'rgba(255,255,255,0.53)'
                     }}
                     style={[STYLES.button_accent, { width: 150 }]}>
                     <Text style={STYLES.button_text_accent}>Submit</Text>
                  </Pressable>
               </LinearGradient>
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
      textAlign: 'center',
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
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING
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

AddAvailabilityScreen.navigationOptions = () => ({
   headerShown: false
})

export default AddAvailabilityScreen