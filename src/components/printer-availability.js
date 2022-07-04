import moment from 'moment'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars/src/index'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { AppLoader } from './loader'
import { Space } from './space'
import { MaterialIcons } from '@expo/vector-icons'
import { empty_plage } from '../themes/images'
import { Context as AvailabilityContext } from '../contexts/availabilityContext'
import { Context as PrinterContext } from '../contexts/printerServiceContext'

export const PrinterAvailability = React.forwardRef((props, ref) => {
   const {} = props

   const [currentDay, setCurrentDay] = React.useState(moment().format('YYYY-MM-DD'))
   const [plages, setPlages] = React.useState([])
   const [loading, setLoading] = React.useState(false)

   const { getPlagesByDate } = React.useContext(AvailabilityContext)
   const {
      state: { currentPrinter },
   } = React.useContext(PrinterContext)

   const dateHandler = React.useCallback((day) => {
      setCurrentDay(day.dateString)
      loadPlages(day.dateString)
   }, [])

   React.useImperativeHandle(ref, () => ({
      start: () => loadPlages(currentDay),
   }))

   const loadPlages = (date) => {
      setLoading(true)
      getPlagesByDate(currentPrinter.printer_service_id, date, (error, res) => {
         setLoading(false)
         if (error) {
            console.log(error)
            return
         }
         console.log(res)
         setPlages(res)
      })
   }

   return (
      <ScrollView style={{ flex: 1 }}>
         <Space />
         <Space />
         <View style={styles.container}>
            <Space />
            <Space />
            <View style={{ width: '100%' }}>
               <Calendar
                  theme={{
                     selectedDayBackgroundColor: COLORS.PRIMARY,
                     selectedDayTextColor: COLORS.WHITE,
                     arrowColor: COLORS.PRIMARY,
                     indicatorColor: COLORS.PRIMARY,
                  }}
                  renderArrow={(direction) => {
                     if (direction === 'left') {
                        return <MaterialIcons name="keyboard-arrow-left" size={28} color={COLORS.PRIMARY} />
                     }
                     return <MaterialIcons name="keyboard-arrow-right" size={28} color={COLORS.PRIMARY} />
                  }}
                  scrollEnabled={true}
                  enableSwipeMonths={true}
                  current={currentDay}
                  markedDates={{
                     [currentDay]: { selected: true },
                  }}
                  onDayPress={dateHandler}
               />
            </View>
            <Space />
            <Space />
         </View>
         <Space />
         <Space />
         <View
            style={{
               marginHorizontal: SIZES.MEDIUM_MARGIN,
               paddingHorizontal: SIZES.SMALL_PADDING,
               paddingBottom: 5,
            }}
         >
            <Text style={styles.title}>Plages</Text>
         </View>
         {loading ? (
            <AppLoader />
         ) : plages.length === 0 ? (
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 270,
               }}
            >
               <Image source={empty_plage} resizeMode="contain" style={{ width: 150, height: 150 }} />
               <Space />
               <Text
                  style={{
                     fontSize: SIZES.H6,
                     color: COLORS.DARK_300,
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                  }}
               >
                  No availability set to the day !
               </Text>
               <Space />
            </View>
         ) : (
            plages.map((item) => (
               <View key={item.availability_id}>
                  <View style={[styles.container_plage, styles.line]}>
                     <Text style={styles.subTitle}>{item.begin}</Text>
                     <Text style={styles.subTitle}>to</Text>
                     <Text style={styles.subTitle}>{item.end}</Text>
                  </View>
                  <Space />
               </View>
            ))
         )}
         <Space />
         <Space />
         <Space />
      </ScrollView>
   )
})

const styles = StyleSheet.create({
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
   container_plage: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      padding: SIZES.SMALL_PADDING,
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
})
