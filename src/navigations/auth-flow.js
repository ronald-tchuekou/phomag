import { createStackNavigator } from 'react-navigation-stack'
import SignInScreen from '../screens/auth/sign-in.screen'

const AuthFlow = createStackNavigator({
   SignInScreen: SignInScreen
}, {
   initialRouteName: 'SignInScreen'
})

export default AuthFlow
