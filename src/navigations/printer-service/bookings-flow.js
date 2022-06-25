import { createStackNavigator } from 'react-navigation-stack'
import BookingsScreen from '../../screens/printer-srevice/bookings.screen'
import RequestDetailsScreen from '../../screens/printer-srevice/request-details.screen'

const BookingsFlow = createStackNavigator({
   BookingsScreen: BookingsScreen,
   RequestDetailsScreen: RequestDetailsScreen
}, {
   initialRouteName: 'BookingsScreen'
})

export default BookingsFlow
