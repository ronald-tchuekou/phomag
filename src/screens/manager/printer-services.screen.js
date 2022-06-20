import React from 'react'
import { Text } from 'react-native'
import { AppStatusBar } from '../../components'

const PrinterServices = ({}) => {
   return (
      <AppStatusBar>
         <Text>Printer services screen</Text>
      </AppStatusBar>
   )
}

PrinterServices.navigationOptions = () => ({
   headerShown: false
})

export default PrinterServices