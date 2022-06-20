import React from 'react'
import { Text } from 'react-native'
import { AppStatusBar } from '../../components'

const ProfileScreen = ({}) => {
   return (
      <AppStatusBar>
         <Text>Profile screen</Text>
      </AppStatusBar>
   )
}

ProfileScreen.navigationOptions = () => ({
   headerShown: false
})

export default ProfileScreen