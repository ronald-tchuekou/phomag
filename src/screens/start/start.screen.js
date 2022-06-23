import React from 'react'
import { Image, View } from 'react-native'
import { ENV } from '../../api/env'
import { AppStatusBar } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import COLORS from '../../themes/colors'
import { splash_screen } from '../../themes/images'
import { getLocaleValue } from '../../utils'

const StartScreen = ({ navigation }) => {
   const {} = React.useContext(AuthContext)

   React.useEffect(() => {
      checkUser().then(() => {
      })
   }, [])

   const checkUser = () => {
      return getLocaleValue(ENV.user_key, (error, value) => {
         console.log(value)
         setTimeout(() => navigation.navigate('AuthFlow'), 1000)
      })
   }

   return (
      <AppStatusBar>
         <View style={{
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: COLORS.WHITE,
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <Image
               source={splash_screen}
               resizeMode={'contain'}
               style={{
                  margin: 'auto',
                  height: '100%'
               }}
            />
         </View>
      </AppStatusBar>
   )
}

StartScreen.navigationOptions = () => ({
   headerShown: false
})

export default StartScreen
