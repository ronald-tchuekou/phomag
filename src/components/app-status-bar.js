import React from 'react'
import { Platform, SafeAreaView, StatusBar, View } from 'react-native'
import COLORS from '../themes/colors'

const AppStatusBar = ({ children, hidden = false, bgColor = COLORS.DARK_50, barStyle = 'dark-content' }) => {
   if (Platform.OS === 'ios')
      return (
         <View style={{ flex: 1, backgroundColor: COLORS.DARK_50 }}>
            <StatusBar
               animated
               hidden={hidden}
               backgroundColor={bgColor}
               barStyle={Platform.OS === 'ios' ? 'dark-content' : barStyle}
            />
            {children}
         </View>
      )
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.DARK_50 }}>
         <StatusBar
            animated
            hidden={hidden}
            backgroundColor={bgColor}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : barStyle}
         />
         {children}
      </SafeAreaView>
   )
}

export default AppStatusBar
