import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
   AppStatusBar,
   AppTextInput,
   DocumentFormList,
   ModalLoader,
   RequestConfirmationModal,
   Space,
} from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { Context as RequestContext } from '../../contexts/requestContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { postMedia, ToastMessage } from '../../utils'

const { width } = Dimensions.get('window')

const AddRequestScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)
   const documents_ref = React.useRef(null)
   const confirm_ref = React.useRef(null)

   const [file_loading, setFileLoading] = React.useState(false)

   const is_edit = navigation.state.params ? navigation.state.params.edit : false
   const status = navigation.state.params
      ? navigation.state.params.status
         ? navigation.state.params.status
         : null
      : null

   const {
      state: { formData, currentRequest },
      setFormDataField,
      createRequest,
      updateRequest,
      setCurrentRequest,
      getAuthorRequests,
      resetFormData,
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

   React.useEffect(() => {
      if (currentRequest && is_edit) {
         setValue('request_name', currentRequest.request_name)
         setValue('request_description', currentRequest.request_description)
         setValue('request_count', currentRequest.request_qte + '')
         setValue('request_class', currentRequest.classe)
      } else {
         resetFormData()
         setCurrentRequest(null)
      }
   }, [currentRequest])

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

   const submit = async () => {
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

      if (!is_edit) {
         const docs = await postDocuments(documents, 0)
         createNew({ ...data, document_list: JSON.stringify(docs) })
      } else {
         confirm_ref.current.show('Are you sure that you want to save the modification of this request?')
      }
   }

   const onConfirm = async () => {
      const name = getValue('request_name', '').trim()
      const description = getValue('request_description', '').trim()
      const count = getValue('request_count', '').trim()
      const classe = getValue('request_class', '').trim()
      /**
       * @type {Array<any>}
       */
      const documents = documents_ref.current.getDocumentsList()

      if (!validate()) return

      const files = documents.filter((item) => item.uri)
      let docs = []

      if (files.length > 0) docs = await postDocuments(files, 0)

      const data = {
         request_name: name,
         request_description: description,
         classe: classe,
         document_list: JSON.stringify(documents.filter((item) => item.path).concat(docs)),
         request_qte: count,
      }

      udpate(data)
   }

   const udpate = (data) => {
      loader_ref.current.show()
      updateRequest(currentRequest.request_id, data, currentUserToken, (error, res) => {
         if (error) {
            loader_ref.current.dismiss()
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided!')
            return
         }
         getAuthorRequests(currentUserToken, status, (error, res) => {
            loader_ref.current.dismiss()
            if (error) {
               console.log(error)
               return
            }
            ToastMessage('The request are updated successfully!')
            setCurrentRequest(
               {
                  ...currentRequest,
                  ...data,
               },
               () => {
                  navigation.pop()
               }
            )
         })
      })
   }

   const createNew = (data) => {
      loader_ref.current.show()
      createRequest(data, currentUserToken, (error, res) => {
         if (error) {
            loader_ref.current.dismiss()
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided!')
            return
         }
         getAuthorRequests(currentUserToken, status, (error, res) => {
            loader_ref.current.dismiss()
            if (error) {
               console.log(error)
               return
            }
            ToastMessage('New request are init!')
            resetFormData()
            navigation.pop()
         })
      })
   }

   const postDocuments = (files, index) => {
      return new Promise(async (resolve, reject) => {
         setFileLoading(true)
         try {
            const file = {
               uri: files[index].uri,
               name: new Date().getTime() + '.pdf',
               type: `application/pdf`,
            }
            const formData = new FormData()
            formData.append('file', file)
            const response = await postMedia(formData, currentUserToken, 'document')
            if (files.length === index + 1) {
               setFileLoading(false)
               resolve([
                  {
                     ...response,
                     name: files[index].name,
                     size: files[index].size,
                  },
               ])
            } else {
               resolve([
                  {
                     ...response,
                     name: files[index].name,
                     size: files[index].size,
                  },
                  ...(await postDocuments(files, index + 1)),
               ])
            }
         } catch (error) {
            console.log(error.response.data)
            resolve([])
         }
      })
   }

   const documents = React.useMemo(() => {
      return JSON.parse(currentRequest ? currentRequest.document_list : '[]')
   }, [currentRequest])

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
            <DocumentFormList propsDocs={documents} ref={documents_ref} />
            <Space />
            <Space />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <LinearGradient colors={[COLORS.WARNING_50, COLORS.WARNING]} style={STYLES.button_container}>
                  <Pressable
                     onPress={submit}
                     android_ripple={{
                        color: 'rgba(255,255,255,0.53)',
                     }}
                     disabled={file_loading}
                     style={[STYLES.button_accent, { width: 150 }]}
                  >
                     {file_loading ? (
                        <ActivityIndicator size="small" color={COLORS.WHITE} />
                     ) : (
                        <Text style={STYLES.button_text_accent}>Submit</Text>
                     )}
                  </Pressable>
               </LinearGradient>
            </View>
            <Space />
            <Space />
            <ModalLoader ref={loader_ref} />
            <RequestConfirmationModal onConfirm={onConfirm} ref={confirm_ref} />
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
