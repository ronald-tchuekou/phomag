import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/manager/home.screen'

const HomeFlow = createStackNavigator({
   HomeScreen: HomeScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default HomeFlow
