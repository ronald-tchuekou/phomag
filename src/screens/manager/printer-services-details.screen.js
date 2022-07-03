import moment from 'moment'
import React from 'react'
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, PrinterAvailability, RequestItem, Space } from '../../components'
import { Context as PrinterContext } from '../../contexts/printerServiceContext'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import { default_profile } from '../../themes/images'
import SIZES from '../../themes/sizes'
import { ButtonNav } from './bookings.screen'

const { width } = Dimensions.get('window')

const PrinterServiceDetailsScreen = ({ navigation }) => {
   const content = [
      { id: 'id1', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id2', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Validate' },
      { id: 'id3', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id4', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id5', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Validate' },
      { id: 'id6', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Validate' },
      { id: 'id7', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id8', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id9', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
      { id: 'id10', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Validate' },
   ]

   const {
      state: { currentPrinter },
   } = React.useContext(PrinterContext)

   const [current, setCurrent] = React.useState('Requests')
   const [loading, setLoading] = React.useState(false)

   React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
      }, 800)
   }, [current])

   const back = React.useCallback(() => navigation.pop(), [])

   const showDetails = React.useCallback(() => {
      navigation.navigate('RequestDetailsScreen')
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
            <FlatList
               data={content}
               keyExtractor={(item, index) => 'item' + item.id + index}
               renderItem={({ item, index }) => <RequestItem onPress={showDetails} item={item} index={index} />}
            />
         ) : (
            <PrinterAvailability />
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
