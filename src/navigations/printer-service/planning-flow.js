import { createStackNavigator } from 'react-navigation-stack'
import AddAvailabilityScreen from '../../screens/printer-srevice/add-availability.screen'
import PlanningScreen from '../../screens/printer-srevice/planning.screen'

const PlanningFlow = createStackNavigator(
   {
      PlanningScreen: PlanningScreen,
      AddAvailabilityScreen: AddAvailabilityScreen,
   },
   {
      initialRouteName: 'PlanningScreen',
   }
)

export default PlanningFlow
