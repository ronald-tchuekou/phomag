import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { BookingsSVG, HomeSVG, PrinterSVG, ProfileSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import BookingsFlow from './bookings-flow'
import HomeFlow from './home-flow'
import PrinterServicesFlow from './printer-services-flow'
import ProfileFlow from './profile-flow'

export const styles = StyleSheet.create({
   bottom_tab_container: {
      borderTopWidth: 1,
      borderTopColor: COLORS.DARK_100,
      backgroundColor: COLORS.WHITE,
      paddingHorizontal: 5,
      paddingVertical: 2,
      height: 55,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
   bottom_tab_item: {
      display: 'flex',
      width: 60,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
})

const tabBarComponent = (props) => {
   const { navigation } = props
   const index = navigation.state.index
   const icon_size = SIZES.ICON_SIZE

   function goTo(path) {
      navigation.navigate(path)
   }

   return (
      <View style={styles.bottom_tab_container}>
         <TabBarItem
            title={'Home'}
            onPress={() => goTo('HomeFlow')}
            icon={() => <HomeSVG w={icon_size} h={icon_size} filled={index === 0} />}
            selected={index === 0}
         />
         <TabBarItem
            title={'Bookings'}
            onPress={() => goTo('BookingsFlow')}
            icon={() => <BookingsSVG w={icon_size} h={icon_size} filled={index === 1} />}
            selected={index === 1}
         />
         <TabBarItem
            title={'Printers'}
            onPress={() => goTo('PrinterServicesFlow')}
            icon={() => <PrinterSVG w={icon_size} h={icon_size} filled={index === 2} />}
            selected={index === 2}
         />
         <TabBarItem
            title={'Profile'}
            onPress={() => goTo('ProfileFlow')}
            icon={() => <ProfileSVG w={icon_size} h={icon_size} filled={index === 3} />}
            selected={index === 3}
         />
      </View>
   )
}

export const TabBarItem = ({ title, icon, selected, onPress }) => {
   const item_styles = StyleSheet.create({
      text: {
         color: selected ? COLORS.PRIMARY : COLORS.DARK_200,
         textAlign: 'center',
         fontSize: 10,
      },
   })
   return (
      <Pressable
         android_ripple={{
            color: COLORS.PRIMARY_25,
            borderless: true,
         }}
         onPress={onPress}
      >
         <View style={styles.bottom_tab_item}>
            {icon()}
            <Text style={item_styles.text}>{title}</Text>
         </View>
      </Pressable>
   )
}

const ManagerFlow = createBottomTabNavigator(
   {
      HomeFlow,
      BookingsFlow,
      PrinterServicesFlow,
      ProfileFlow,
   },
   {
      tabBarComponent,
   }
)

export default ManagerFlow
