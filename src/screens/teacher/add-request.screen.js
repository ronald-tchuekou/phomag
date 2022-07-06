import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, DocumentFormList, ModalLoader, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { Context as RequestContext } from '../../contexts/requestContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { ToastMessage } from '../../utils'

const { width } = Dimensions.get('window')

const AddRequestScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)
   const documents_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField,
      createRequest,
      updateRequest,
   } = React.useContext(RequestContext)

   const {
      state: { currentUser, currentUserToken },
   } = React.useContext(AuthContext)

   const back = React.useCallback(() => navigation.pop(), [])

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {})
   }

   function getValue(key, default_value) {
      if (formData) return formData[key] || default_value
      return default_value
   }

   const validate = () => {
      const name = getValue('request_name', '').trim()
      const description = getValue('request_description', '').trim()
      const count = getValue('request_count', '').trim()
      const classe = getValue('request_class', '').trim()
      const documents = documents_ref.current.getDocumentsList()

      if (name === '' || description === '' || count === '' || classe === '') {
         ToastMessage('Set value of fields!')
         return false
      }

      if (documents.length === 0) {
         ToastMessage('Select minimum one file!')
         return false
      }

      return true
   }

   const submit = () => {
      const name = getValue('request_name', '').trim()
      const description = getValue('request_description', '').trim()
      const count = getValue('request_count', '').trim()
      const classe = getValue('request_class', '').trim()
      const documents = documents_ref.current.getDocumentsList()

      if (!validate()) return

      const data = {
         request_name: name,
         request_description: description,
         classe: classe,
         document_list: JSON.stringify(documents),
         request_qte: count,
         request_status: 'PENDING',
         author_id: currentUser.user_id,
      }

      loader_ref.current.show()
      createRequest(data, currentUserToken, (error, res) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided!')
            return
         }
         console.log(res)
         ToastMessage('New request are init!')
         navigation.pop()
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
                  Add new request
               </Text>
            </View>
         </View>
         <ScrollView style={{ flex: 1 }}>
            <Space />
            <Space />
            <View style={styles.container}>
               <AppTextInput
                  capitalize
                  label={'Request name'}
                  onChange={(val) => setValue('request_name', val)}
                  value={getValue('request_name', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  capitalize
                  multiline
                  lines={3}
                  label={'Request description'}
                  onChange={(val) => setValue('request_description', val)}
                  value={getValue('request_description', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  label={'Copy count'}
                  type="numeric"
                  onChange={(val) => setValue('request_count', val)}
                  value={getValue('request_count', '')}
               />
               <Space />
               <Space />
               <AppTextInput
                  capitalize
                  label={'Class'}
                  onChange={(val) => setValue('request_class', val)}
                  value={getValue('request_class', '')}
               />
            </View>
            <DocumentFormList ref={documents_ref} />
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
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      paddingVertical: SIZES.SMALL_PADDING,
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
})

AddRequestScreen.navigationOptions = () => ({
   headerShown: false,
})

export default AddRequestScreen
