import { createStackNavigator } from 'react-navigation-stack'
import AddRequestScreen from '../../screens/teacher/add-request.screen'
import HomeScreen from '../../screens/teacher/home.screen'
import NotificationsScreen from '../../screens/manager/notifications.screen'
import RequestDetailsScreen from '../../screens/teacher/request-details.screen'

const HomeFlow = createStackNavigator(
   {
      HomeScreen: HomeScreen,
      RequestDetailsScreen: RequestDetailsScreen,
      AddRequestScreen: AddRequestScreen,
      NotificationsScreen: NotificationsScreen,
   },
   {
      initialRouteName: 'HomeScreen',
   }
)

export default HomeFlow
