import { createStackNavigator } from 'react-navigation-stack'
import BookingsScreen from '../../screens/manager/bookings.screen'
import HomeScreen from '../../screens/manager/home.screen'

const BookingsFlow = createStackNavigator({
   BookingsScreen: BookingsScreen
}, {
   initialRouteName: 'BookingsScreen'
})

export default BookingsFlow
