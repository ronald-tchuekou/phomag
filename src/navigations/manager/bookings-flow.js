import { createStackNavigator } from 'react-navigation-stack'
import BookingsScreen from '../../screens/manager/bookings.screen'
import HomeScreen from '../../screens/manager/home.screen'
import RequestDetailsScreen from '../../screens/manager/request-details.screen'

const BookingsFlow = createStackNavigator({
   BookingsScreen: BookingsScreen,
   RequestDetailsScreen: RequestDetailsScreen
}, {
   initialRouteName: 'BookingsScreen'
})

export default BookingsFlow
