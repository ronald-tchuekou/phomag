import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, DocumentList, RequestConfirmationModal, Space, Status } from '../../components'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const { width } = Dimensions.get('window')

const RequestDetailsScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)

   const documents = [
      { id: 'doc1', name: 'Introduction to AI', page_num: 120 },
      { id: 'doc2', name: 'Introduction to data programming', page_num: 12 },
      { id: 'doc3', name: 'Introduction to data manning', page_num: 52 },
   ]

   const back = React.useCallback(() => navigation.pop(), [])

   const showDoc = React.useCallback(() => {
      // TODO
   }, [])

   const onConfirm = React.useCallback((status) => {
      // TODO
      console.log(status)
   }, [])

   const cancel = React.useCallback(() => {
      confirm_ref.current.show('Are you sure you want to cancel this request?')
   }, [])

   const validate = React.useCallback(() => {
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable
                  onPress={cancel}
                  android_ripple={{
                     color: COLORS.DARK_200,
                     borderless: true,
                  }}
               >
                  <Svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <Path
                        d="M11.25 6.25H8.75C8.08696 6.25 7.45107 6.51339 6.98223 6.98223C6.51339 7.45107 6.25 8.08696 6.25 8.75V23.75C6.25 24.413 6.51339 25.0489 6.98223 25.5178C7.45107 25.9866 8.08696 26.25 8.75 26.25H21.25C21.913 26.25 22.5489 25.9866 23.0178 25.5178C23.4866 25.0489 23.75 24.413 23.75 23.75V8.75C23.75 8.08696 23.4866 7.45107 23.0178 6.98223C22.5489 6.51339 21.913 6.25 21.25 6.25H18.75"
                        stroke={COLORS.DARK_500}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <Path
                        d="M16.25 3.75H13.75C12.3693 3.75 11.25 4.86929 11.25 6.25C11.25 7.63071 12.3693 8.75 13.75 8.75H16.25C17.6307 8.75 18.75 7.63071 18.75 6.25C18.75 4.86929 17.6307 3.75 16.25 3.75Z"
                        stroke={COLORS.DARK_500}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <Path
                        d="M12.5 15L17.5 20M17.5 15L12.5 20"
                        stroke={COLORS.DARK_500}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </Svg>
               </Pressable>
               <Pressable
                  onPress={validate}
                  android_ripple={{
                     color: COLORS.DARK_200,
                     borderless: true,
                  }}
               >
                  <Svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <Path
                        d="M11.25 6.25H8.75C8.08696 6.25 7.45107 6.51339 6.98223 6.98223C6.51339 7.45107 6.25 8.08696 6.25 8.75V23.75C6.25 24.413 6.51339 25.0489 6.98223 25.5178C7.45107 25.9866 8.08696 26.25 8.75 26.25H21.25C21.913 26.25 22.5489 25.9866 23.0178 25.5178C23.4866 25.0489 23.75 24.413 23.75 23.75V8.75C23.75 8.08696 23.4866 7.45107 23.0178 6.98223C22.5489 6.51339 21.913 6.25 21.25 6.25H18.75M11.25 6.25C11.25 6.91304 11.5134 7.54893 11.9822 8.01777C12.4511 8.48661 13.087 8.75 13.75 8.75H16.25C16.913 8.75 17.5489 8.48661 18.0178 8.01777C18.4866 7.54893 18.75 6.91304 18.75 6.25M11.25 6.25C11.25 5.58696 11.5134 4.95107 11.9822 4.48223C12.4511 4.01339 13.087 3.75 13.75 3.75H16.25C16.913 3.75 17.5489 4.01339 18.0178 4.48223C18.4866 4.95107 18.75 5.58696 18.75 6.25M11.25 17.5L13.75 20L18.75 15"
                        stroke={COLORS.DARK_500}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </Svg>
               </Pressable>
            </View>
         </View>
         <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: 5 }]}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Emit by : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>John Doe</Text>
               </View>
               <View style={styles.line}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Class : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>ICH 254</Text>
               </View>
            </View>
            <Space />
            <View style={styles.container}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500 }}>TD sheet N° 12</Text>
                  <Status status={'Pending'} />
               </View>
               <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at dicta eius eveniet inventore
                  ipsam iste iure nemo nisi numquam pariatur placeat porro unde ut vel velit, voluptates voluptatibus
                  voluptatum!
               </Text>
               <View style={[styles.line, { paddingTop: 5 }]}>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.PRIMARY }}>12 copies to print</Text>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.DARK_200 }}>Lundi, 20 Juin 2022</Text>
               </View>
            </View>
            <Space />
            <Text style={styles.subTitle}>Document list</Text>
            <DocumentList content={documents} />
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
