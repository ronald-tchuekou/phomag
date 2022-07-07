import moment from 'moment'
import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, DocumentList, Space, Status } from '../../components'
import { ArrowBackSVG, EditRequestSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as RequestContext } from '../../contexts/requestContext'

const { width } = Dimensions.get('window')

const RequestDetailsScreen = ({ navigation }) => {
   const status = navigation.state.params
      ? navigation.state.params.status
         ? navigation.state.params.status
         : null
      : null

   const {
      state: { currentRequest },
   } = React.useContext(RequestContext)

   if (!currentRequest) return null

   const documents = React.useMemo(() => {
      return JSON.parse(currentRequest ? currentRequest.document_list : '[]')
   }, [currentRequest])

   const back = React.useCallback(() => navigation.pop(), [])

   const edit = React.useCallback(() => {
      navigation.navigate('AddRequestScreen', { edit: true, status })
   }, [status])

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
            {currentRequest.request_status === 'PENDING' ? (
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                     onPress={edit}
                     android_ripple={{
                        color: COLORS.DARK_200,
                        borderless: true,
                     }}
                  >
                     <EditRequestSVG />
                  </Pressable>
               </View>
            ) : (
               <></>
            )}
         </View>
         <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: 5 }]}>
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
            <DocumentList documents={documents} />
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
