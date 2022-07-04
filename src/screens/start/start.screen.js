import React from 'react'
import { Image, View } from 'react-native'
import { ENV } from '../../api/env'
import { AppStatusBar } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import COLORS from '../../themes/colors'
import { splash_screen } from '../../themes/images'
import { getLocaleValue, registerForPushNotificationsAsync } from '../../utils'

const StartScreen = ({ navigation }) => {
   const { setUserInformations, setNotificationToken } = React.useContext(AuthContext)

   React.useEffect(() => {
      checkUser().then(() => {})
   }, [])

   const checkUser = () => {
      return getLocaleValue(ENV.user_key, async (error, value) => {
         console.log('Local value : ', value)
         if (value) {
            const notification_token = await registerForPushNotificationsAsync()
            setNotificationToken(
               {
                  id: value.user_id,
                  token: value.token,
                  notify_token: notification_token,
                  role: value.role,
               },
               (error, res) => {
                  setUserInformations(value, (error, res) => {
                     if (res) {
                        if (value.role === 'Chief') return navigation.navigate('ManagerFlow')
                        if (value.role === 'Teacher') return navigation.navigate('TeacherFlow')
                        if (value.role === 'Printer') return navigation.navigate('PrinterServiceFlow')
                     }
                  })
                  console.log(res)
               }
            )
         } else {
            navigation.navigate('AuthFlow')
         }
      })
   }

   return (
      <AppStatusBar>
         <View
            style={{
               width: '100%',
               height: '100%',
               flex: 1,
               backgroundColor: COLORS.WHITE,
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Image
               source={splash_screen}
               resizeMode={'contain'}
               style={{
                  margin: 'auto',
                  height: '100%',
               }}
            />
         </View>
      </AppStatusBar>
   )
}

StartScreen.navigationOptions = () => ({
   headerShown: false,
})

export default StartScreen
