import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const BookingsScreen = ({}) => {
   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>All requests with status</Text>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   }
})

BookingsScreen.navigationOptions = () => ({
   headerShown: false
})

export default BookingsScreen