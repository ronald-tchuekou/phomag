import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, DocumentList, ModalLoader, RequestConfirmationModal, Space, Status } from '../../components'
import { ArrowBackSVG, CancelRequestSVG, ValidateRequestSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as RequestContext } from '../../contexts/requestContext'
import { Context as AuthContext } from '../../contexts/authContext'
import moment from 'moment'
import { ToastMessage } from '../../utils'

const { width } = Dimensions.get('window')

const RequestDetailsScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)
   const loader_ref = React.useRef(null)
   const status = navigation.state.params
      ? navigation.state.params.status
         ? navigation.state.params.status
         : null
      : null

   const [action, setAction] = React.useState(null)

   const {
      state: { currentUserToken, currentUser },
   } = React.useContext(AuthContext)

   const {
      state: { currentRequest },
      updateRequest,
      getValidatorRequests,
      setCurrentRequest,
      assignRequest,
   } = React.useContext(RequestContext)

   if (!currentRequest) return null

   const documents = React.useMemo(() => {
      return JSON.parse(currentRequest ? currentRequest.document_list : '[]')
   }, [currentRequest])

   const back = React.useCallback(() => navigation.pop(), [])

   const onConfirm = React.useCallback(
      (status) => {
         if (status) {
            if (action === 'cancel') cancelRequest()
            if (action === 'validate') validateRequest()
         }
      },
      [action]
   )

   const cancelRequest = () => {
      const data = {
         request_status: 'CANCELED',
         validator_id: currentUser.user_id,
      }
      loader_ref.current.show()
      updateRequest(currentRequest.request_id, data, currentUserToken, (error, res) => {
         if (error) {
            loader_ref.current.dismiss()
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided!')
            return
         }
         getValidatorRequests(currentUserToken, status, (error, res) => {
            loader_ref.current.dismiss()
            if (error) {
               console.log(error)
               return
            }
            ToastMessage('The request are updated successfully!')
            setCurrentRequest({
               ...currentRequest,
               ...data,
            })
         })
      })
   }

   const validateRequest = () => {
      const data = {
         request_status: 'VALIDATE',
         validator_id: currentUser.user_id,
      }
      loader_ref.current.show()
      updateRequest(currentRequest.request_id, data, currentUserToken, (error, res) => {
         if (error) {
            loader_ref.current.dismiss()
            console.log(error)
            if (error.message) ToastMessage(error.message)
            else ToastMessage('Error are provided!')
            return
         }
         assignRequest(
            currentRequest.request_id,
            currentUser.user_id,
            moment().format('YYYY-MM-DD HH:mm'),
            (error, response) => {
               if (error) {
                  loader_ref.current.dismiss()
                  console.log(error)
                  if (error.message) ToastMessage(error.message)
                  else ToastMessage('Error are provided!')
                  return
               }
               getValidatorRequests(currentUserToken, status, (error, res) => {
                  loader_ref.current.dismiss()
                  if (error) {
                     console.log(error)
                     return
                  }
                  ToastMessage('The request are updated successfully!')
                  setCurrentRequest({
                     ...currentRequest,
                     ...data,
                  })
               })
            }
         )
      })
   }

   const cancel = React.useCallback(() => {
      setAction('cancel')
      confirm_ref.current.show('Are you sure you want to cancel this request?')
   }, [])

   const validate = React.useCallback(() => {
      setAction('validate')
      confirm_ref.current.show('Are you sure you want to validate this request?')
   }, [])

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
                  Request details
               </Text>
            </View>
            {currentRequest.request_status !== 'PRINTED' ? (
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                     onPress={cancel}
                     android_ripple={{
                        color: COLORS.DARK_200,
                        borderless: true,
                     }}
                  >
                     <CancelRequestSVG />
                  </Pressable>
                  <Pressable
                     onPress={validate}
                     android_ripple={{
                        color: COLORS.DARK_200,
                        borderless: true,
                     }}
                  >
                     <ValidateRequestSVG />
                  </Pressable>
               </View>
            ) : (
               <></>
            )}
         </View>
         <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: 5 }]}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Emit by : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>
                     {currentRequest.lastname} {currentRequest.firstname}
                  </Text>
               </View>
               <View style={styles.line}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Class : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>
                     {currentRequest.classe}
                  </Text>
               </View>
            </View>
            <Space />
            <View style={styles.container}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500 }}>{currentRequest.request_name}</Text>
                  <Status status={currentRequest.request_status} />
               </View>
               <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>{currentRequest.request_description}</Text>
               <View style={[styles.line, { paddingTop: 5 }]}>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.PRIMARY }}>
                     {documents.length} document(s) to print
                  </Text>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.DARK_200 }}>
                     {moment(currentRequest.created_at).format('dddd, DD MMM YYYY')}
                  </Text>
               </View>
            </View>
            <Space />
            <ModalLoader ref={loader_ref} />
            <DocumentList documents={documents} />
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
      padding: SIZES.SMALL_PADDING,
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
      width: width - 125,
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300,
   },
})

RequestDetailsScreen.navigationOptions = () => ({
   headerShown: false,
})

export default RequestDetailsScreen
