import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const PrinterServices = ({}) => {
   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>Printer services manager</Text>
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

PrinterServices.navigationOptions = () => ({
   headerShown: false
})

export default PrinterServices