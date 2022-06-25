import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars/src/index'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const PlanningScreen = ({ navigation }) => {
   const current_day = moment().format('YYYY-MM-DD')

   const dateHandler = React.useCallback((day) => {
      console.log(day)
   }, [])

   const addNewAvailability = React.useCallback(() => {
      navigation.navigate('AddAvailabilityScreen')
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>Planning manager</Text>
         </View>
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
            <View style={[styles.line, {
               marginHorizontal: SIZES.MEDIUM_MARGIN,
               paddingHorizontal: SIZES.SMALL_PADDING,
               paddingBottom: SIZES.SMALL_PADDING
            }]}>
               <Text style={styles.title}>Plages</Text>
               <Pressable onPress={addNewAvailability} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Ionicons name={'add'} size={30} color={COLORS.DARK_300} />
               </Pressable>
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
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   },
   header_nav: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingTop: 5,
      paddingBottom: SIZES.SMALL_PADDING
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
   }
})

PlanningScreen.navigationOptions = () => ({
   headerShown: false
})

export default PlanningScreen