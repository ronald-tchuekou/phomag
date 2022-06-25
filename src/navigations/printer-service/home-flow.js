import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/printer-srevice/home.screen'
import NotificationsScreen from '../../screens/manager/notifications.screen'
import RequestDetailsScreen from '../../screens/printer-srevice/request-details.screen'

const HomeFlow = createStackNavigator({
   HomeScreen: HomeScreen,
   RequestDetailsScreen: RequestDetailsScreen,
   NotificationsScreen: NotificationsScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default HomeFlow
