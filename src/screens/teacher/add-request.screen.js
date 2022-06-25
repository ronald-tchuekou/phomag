import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, RequestConfirmationModal, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { ArrowBackSVG, PdfSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'

const { width } = Dimensions.get('window')

const AddRequestScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField
   } = React.useContext(AuthContext)

   const documents = [
      { id: 'doc1', name: 'Introduction to AI', page_num: 120 },
      { id: 'doc2', name: 'Introduction to data programming', page_num: 12 },
      { id: 'doc3', name: 'Introduction to data manning', page_num: 52 }
   ]

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

   function removeDoc(item) {
      // TODO
   }

   const showDoc = React.useCallback(() => {
      // TODO
   }, [])

   const onConfirm = React.useCallback((status) => {
      // TODO
      console.log(status)
   }, [])

   const addNewDoc = React.useCallback(() => {
      confirm_ref.current.show('Add new document')
   }, [])

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
               <Text style={[
                  styles.title,
                  { paddingHorizontal: 10, width: width - 170 }
               ]} numberOfLines={1}>
                  Add new request
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
                  label={'Request name'}
                  onChange={(val) => setValue('request_name', val)}
                  value={getValue('request_name', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  multiline
                  lines={5}
                  label={'Request description'}
                  onChange={(val) => setValue('request_description', val)}
                  value={getValue('request_description', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  label={'Copy count'}
                  onChange={(val) => setValue('copy_count', val)}
                  value={getValue('copy_count', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  label={'Class'}
                  onChange={(val) => setValue('class', val)}
                  value={getValue('class', '')}
               />
               <Space />
               <Space />
            </View>
            <Space />
            <View style={[styles.line, {
               marginHorizontal: SIZES.MEDIUM_MARGIN,
               paddingHorizontal: SIZES.SMALL_PADDING,
               paddingBottom: SIZES.SMALL_PADDING
            }]}>
               <Text style={styles.title}>Documents list</Text>
               <Pressable onPress={addNewDoc} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Ionicons name={'add'} size={30} color={COLORS.DARK_300} />
               </Pressable>
            </View>
            <View style={[styles.container]}>
               {documents.map(item => (
                  <Pressable
                     onPress={showDoc}
                     android_ripple={{
                        color: COLORS.DARK_100
                     }}
                     key={item.id}
                     style={[styles.line]}>
                     <View style={styles.doc_container}>
                        <PdfSVG />
                        <View style={{ padding: 5 }}>
                           <Text style={styles.doc_name}>{item.name}</Text>
                           <Text style={styles.doc_sub_name}>{item.page_num} pages</Text>
                        </View>
                     </View>
                     <Pressable onPress={() => removeDoc(item)} android_ripple={{
                        color: COLORS.WARNING_25,
                        borderless: true
                     }}>
                        <Ionicons name={'close'} size={30} color={COLORS.WARNING} />
                     </Pressable>
                  </Pressable>
               ))}
            </View>
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
            <RequestConfirmationModal onConfirm={onConfirm} ref={confirm_ref} />
         </ScrollView>
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
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      paddingVertical: SIZES.SMALL_PADDING
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

AddRequestScreen.navigationOptions = () => ({
   headerShown: false
})

export default AddRequestScreen