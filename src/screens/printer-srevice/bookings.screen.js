import React from 'react'
import { Text } from 'react-native'
import { AppStatusBar } from '../../components'

const BookingsScreen = ({}) => {
   return (
      <AppStatusBar>
         <Text>Bookings screen</Text>
      </AppStatusBar>
   )
}

BookingsScreen.navigationOptions = () => ({
   headerShown: false
})

export default BookingsScreen