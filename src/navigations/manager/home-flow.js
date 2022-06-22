import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/manager/home.screen'
import RequestDetailsScreen from '../../screens/manager/request-details.screen'

const HomeFlow = createStackNavigator({
   HomeScreen: HomeScreen,
   RequestDetailsScreen: RequestDetailsScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default HomeFlow
