import { createStackNavigator } from 'react-navigation-stack'
import BookingsScreen from '../../screens/manager/bookings.screen'
import AddRequestScreen from '../../screens/teacher/add-request.screen'
import RequestDetailsScreen from '../../screens/teacher/request-details.screen'

const BookingsFlow = createStackNavigator(
   {
      BookingsScreen: BookingsScreen,
      RequestDetailsScreen: RequestDetailsScreen,
      AddRequestScreen: AddRequestScreen,
   },
   {
      initialRouteName: 'BookingsScreen',
   }
)

export default BookingsFlow
