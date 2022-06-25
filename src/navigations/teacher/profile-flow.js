import { createStackNavigator } from 'react-navigation-stack'
import NotificationsScreen from '../../screens/manager/notifications.screen'
import ProfileScreen from '../../screens/manager/profile.screen'

const ProfileFlow = createStackNavigator({
   ProfileScreen: ProfileScreen,
   NotificationsScreen: NotificationsScreen
}, {
   initialRouteName: 'ProfileScreen'
})

export default ProfileFlow
