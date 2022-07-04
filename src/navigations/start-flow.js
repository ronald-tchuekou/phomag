import { createStackNavigator } from 'react-navigation-stack'
import StartScreen from '../screens/start/start.screen'

const StartFlow = createStackNavigator(
   {
      StartScreen: StartScreen,
   },
   {
      initialRouteName: 'StartScreen',
   }
)

export default StartFlow
