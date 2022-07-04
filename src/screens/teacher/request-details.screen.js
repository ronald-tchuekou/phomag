import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, RequestConfirmationModal, Space, Status } from '../../components'
import { ArrowBackSVG, EditRequestSVG, PdfSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const { width } = Dimensions.get('window')

const RequestDetailsScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)

   const documents = [
      { id: 'doc1', name: 'Introduction to AI Introduction to AI Introduction to AI', page_num: 120 },
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

   const edit = React.useCallback(() => {
      navigation.navigate('AddRequestScreen')
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
                  onPress={edit}
                  android_ripple={{
                     color: COLORS.DARK_200,
                     borderless: true,
                  }}
               >
                  <EditRequestSVG />
               </Pressable>
            </View>
         </View>
         <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: 5 }]}>
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
            <View style={[styles.container]}>
               {documents.map((item) => (
                  <Pressable
                     onPress={showDoc}
                     android_ripple={{
                        color: COLORS.DARK_100,
                     }}
                     key={item.id}
                     style={styles.doc_container}
                  >
                     <PdfSVG />
                     <View style={{ padding: 5 }}>
                        <Text numberOfLines={1} style={styles.doc_name}>
                           {item.name}
                        </Text>
                        <Text style={styles.doc_sub_name}>{item.page_num} pages</Text>
                     </View>
                  </Pressable>
               ))}
            </View>
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
