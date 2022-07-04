import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { BookingsSVG, HomeSVG, ProfileSVG } from '../../svg'
import SIZES from '../../themes/sizes'
import { styles, TabBarItem } from '../manager/manager-flow'
import ProfileFlow from '../teacher/profile-flow'
import BookingsFlow from './bookings-flow'
import HomeFlow from './home-flow'

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
            title={'Profile'}
            onPress={() => goTo('ProfileFlow')}
            icon={() => <ProfileSVG w={icon_size} h={icon_size} filled={index === 2} />}
            selected={index === 2}
         />
      </View>
   )
}

const TeacherFlow = createBottomTabNavigator(
   {
      HomeFlow,
      BookingsFlow,
      ProfileFlow,
   },
   {
      tabBarComponent,
   }
)

export default TeacherFlow
