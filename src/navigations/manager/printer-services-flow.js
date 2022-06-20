import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/manager/home.screen'
import PrinterServicesScreen from '../../screens/manager/printer-services.screen'

const PrinterServicesFlow = createStackNavigator({
   PrinterServicesScreen: PrinterServicesScreen
}, {
   initialRouteName: 'PrinterServicesScreen'
})

export default PrinterServicesFlow
