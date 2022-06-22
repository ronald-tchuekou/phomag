import React from 'react'
import { Text } from 'react-native'
import { AppStatusBar } from '../../components'

const RequestDetails = ({}) => {
   return (
      <AppStatusBar>
         <Text>Home screen</Text>
      </AppStatusBar>
   )
}

RequestDetails.navigationOptions = () => ({
   headerShown: false
})

export default RequestDetails