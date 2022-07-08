import React from 'react'
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, PrinterAvailability, RequestItem, Space } from '../../components'
import { Context as PrinterContext } from '../../contexts/printerServiceContext'
import { Context as RequestContext } from '../../contexts/requestContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import { default_profile, empty_requrest } from '../../themes/images'
import SIZES from '../../themes/sizes'
import { ButtonNav } from './bookings.screen'

const { width } = Dimensions.get('window')

const PrinterServiceDetailsScreen = ({ navigation }) => {
   const availability_ref = React.useRef(null)

   const [content, setContent] = React.useState([])

   const {
      state: { currentPrinter },
   } = React.useContext(PrinterContext)

   const { getPrinterRequestById, setCurrentRequest } = React.useContext(RequestContext)

   const [current, setCurrent] = React.useState('Requests')
   const [loading, setLoading] = React.useState(false)

   React.useEffect(() => {
      if (current === 'Requests') {
         setLoading(true)
         getPrinterRequestById(currentPrinter.printer_service_id, (error, res) => {
            setLoading(false)
            if (error) {
               console.log(error)
               return
            }
            setContent(
               res.map((item) => ({
                  ...item,
                  request_status: item.request_status === 'VALIDATE' ? 'PENDING' : item.request_status,
               }))
            )
         })
      } else {
         availability_ref.current.start()
      }
   }, [current])

   const back = React.useCallback(() => navigation.pop(), [])

   const showDetails = React.useCallback((item) => {
      setCurrentRequest(item, () => {
         navigation.navigate('RequestDetailsScreen')
      })
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
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 50 }]} numberOfLines={1}>
                  Printer service details
               </Text>
            </View>
         </View>
         <View style={styles.container}>
            <View style={styles.profile}>
               <Image source={default_profile} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
            </View>
            <Text
               style={{
                  color: COLORS.DARK_500,
                  fontSize: SIZES.H6,
                  marginVertical: 5,
                  fontWeight: 'bold',
               }}
            >
               {currentPrinter.service_name}
            </Text>
            <View style={[styles.line, { width: '100%' }]}>
               <Text
                  style={{
                     color: COLORS.DARK_300,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                  }}
               >
                  Email :{' '}
               </Text>
               <Text
                  style={{
                     color: COLORS.DARK_500,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                     fontWeight: 'bold',
                  }}
               >
                  {currentPrinter.service_email}
               </Text>
            </View>
            <View style={[styles.line, { width: '100%' }]}>
               <Text
                  style={{
                     color: COLORS.DARK_300,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                  }}
               >
                  Phone :{' '}
               </Text>
               <Text
                  style={{
                     color: COLORS.DARK_500,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                     fontWeight: 'bold',
                  }}
               >
                  {currentPrinter.service_phone}
               </Text>
            </View>
            <View style={[styles.line, { width: '100%' }]}>
               <Text
                  style={{
                     color: COLORS.DARK_300,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                  }}
               >
                  Address :{' '}
               </Text>
               <Text
                  style={{
                     color: COLORS.DARK_500,
                     fontSize: SIZES.H7,
                     marginVertical: 5,
                     fontWeight: 'bold',
                  }}
               >
                  {currentPrinter.service_address}
               </Text>
            </View>
         </View>
         <View style={styles.header_nav}>
            <ButtonNav onPress={() => setCurrent('Requests')} title={'Requests'} selected={current === 'Requests'} />
            <ButtonNav
               onPress={() => setCurrent('Availability')}
               title={'Availability'}
               selected={current === 'Availability'}
            />
         </View>
         {loading ? (
            <AppLoader />
         ) : current === 'Requests' ? (
            <>
               {content.length === 0 ? (
                  <View
                     style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200,
                     }}
                  >
                     <Image source={empty_requrest} resizeMode="contain" style={{ width: 200, height: 200 }} />
                     <Text
                        style={{
                           fontSize: SIZES.H6,
                           color: COLORS.DARK_300,
                           paddingHorizontal: SIZES.DEFAULT_PADDING,
                           textAlign: 'center',
                        }}
                     >
                        No request to show here!.
                     </Text>
                  </View>
               ) : (
                  <>
                     <FlatList
                        data={content}
                        keyExtractor={(item, index) => 'item' + item.request_id + index}
                        renderItem={({ item, index }) => (
                           <RequestItem onPress={() => showDetails(item)} item={item} index={index} />
                        )}
                     />
                  </>
               )}
            </>
         ) : (
            <PrinterAvailability ref={availability_ref} />
         )}
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   profile: {
      height: 80,
      width: 80,
      borderRadius: 100,
      overflow: 'hidden',
      backgroundColor: COLORS.DARK_200,
   },
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   subTitle: {
      color: COLORS.DARK_800,
      fontSize: SIZES.H6,
      paddingHorizontal: SIZES.SMALL_PADDING,
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      padding: SIZES.DEFAULT_PADDING,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
   header_nav: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingTop: 5,
      paddingBottom: SIZES.SMALL_PADDING,
   },
})

PrinterServiceDetailsScreen.navigationOptions = () => ({
   headerShown: false,
})

export default PrinterServiceDetailsScreen
