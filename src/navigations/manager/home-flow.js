import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/manager/home.screen'
import NotificationsScreen from '../../screens/manager/notifications.screen'
import RequestDetailsScreen from '../../screens/manager/request-details.screen'

const HomeFlow = createStackNavigator({
   HomeScreen: HomeScreen,
   RequestDetailsScreen: RequestDetailsScreen,
   NotificationsScreen: NotificationsScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default HomeFlow
