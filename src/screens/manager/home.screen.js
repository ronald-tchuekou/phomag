import React from 'react'
import { Text } from 'react-native'
import { AppStatusBar } from '../../components'

const HomeScreen = ({}) => {
   return (
      <AppStatusBar>
         <Text>Home screen</Text>
      </AppStatusBar>
   )
}

HomeScreen.navigationOptions = () => ({
   headerShown: false
})

export default HomeScreen