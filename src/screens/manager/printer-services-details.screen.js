import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import React from 'react'
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars/src/index'
import Svg, { Path } from 'react-native-svg'
import { AppLoader, AppStatusBar, RequestItem, Space } from '../../components'
import { ArrowBackSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { ButtonNav } from './bookings.screen'
import { PrinterServiceItem } from './printer-services.screen'

const { width } = Dimensions.get('window')

const PrinterServiceDetailsScreen = ({ navigation }) => {

   const current_day = moment().format('YYYY-MM-DD')
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
      { id: 'id10', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: 'Validate' }
   ]

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

   const dateHandler = React.useCallback((day) => {
      console.log(day)
   }, [])

   return (
      <AppStatusBar>
         <View style={styles.line_between}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable onPress={back} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <ArrowBackSVG/>
               </Pressable>
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>
                  Printer service details
               </Text>
            </View>
         </View>
         <PrinterServiceItem item={{
            id: 'printer1',
            firstname: 'Printer',
            lastname: 'Service',
            email: 'printer.service@gmail.com',
            profile_image: 'default_profile.png'
         }} onPress={() => {
         }} />
         <View style={styles.header_nav}>
            <ButtonNav
               onPress={() => setCurrent('Requests')}
               title={'Requests'}
               selected={current === 'Requests'}
            />
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
               renderItem={({ item, index }) => (
                  <RequestItem onPress={showDetails} item={item} index={index} />
               )} />
         ) : (
            <ScrollView style={{ flex: 1 }}>

               <Space />
               <Space />

               <View style={styles.container}>

                  <Space />
                  <Space />

                  <Calendar
                     theme={{
                        selectedDayBackgroundColor: COLORS.PRIMARY,
                        selectedDayTextColor: COLORS.WHITE,
                        arrowColor: COLORS.PRIMARY,
                        indicatorColor: COLORS.PRIMARY
                     }}
                     renderArrow={(direction) => {
                        if (direction === 'left') {
                           return <MaterialIcons name='keyboard-arrow-left' size={28} color={COLORS.PRIMARY} />
                        }
                        return <MaterialIcons name='keyboard-arrow-right' size={28} color={COLORS.PRIMARY} />
                     }}
                     scrollEnabled={true}
                     enableSwipeMonths={true}
                     current={current_day}
                     markedDates={{
                        [current_day]: { selected: true }
                     }}
                     onDayPress={dateHandler}
                  />

                  <Space />
                  <Space />

               </View>

               <Space />
               <Space />

               <View style={{
                  marginHorizontal: SIZES.MEDIUM_MARGIN,
                  paddingHorizontal: SIZES.SMALL_PADDING,
                  paddingBottom: 5
               }}>
                  <Text style={styles.title}>Plages</Text>
               </View>

               <View style={[styles.container_plage, styles.line]}>
                  <Text style={styles.subTitle}>8h00</Text>
                  <Text style={styles.subTitle}>to</Text>
                  <Text style={styles.subTitle}>12h30</Text>
               </View>

               <Space />

               <View style={[styles.container_plage, styles.line]}>
                  <Text style={styles.subTitle}>13h00</Text>
                  <Text style={styles.subTitle}>to</Text>
                  <Text style={styles.subTitle}>17h30</Text>
               </View>

               <Space />

               <View style={[styles.container_plage, styles.line]}>
                  <Text style={styles.subTitle}>18h00</Text>
                  <Text style={styles.subTitle}>to</Text>
                  <Text style={styles.subTitle}>20h30</Text>
               </View>

               <Space />
               <Space />
               <Space />
               <Space />

            </ScrollView>
         )}
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
      fontSize: SIZES.H6,
      paddingHorizontal: SIZES.SMALL_PADDING
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      padding: SIZES.DEFAULT_PADDING
   },
   container_plage: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      padding: SIZES.SMALL_PADDING
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
   },
   header_nav: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingTop: 5,
      paddingBottom: SIZES.SMALL_PADDING
   }
})

PrinterServiceDetailsScreen.navigationOptions = () => ({
   headerShown: false
})

export default PrinterServiceDetailsScreen