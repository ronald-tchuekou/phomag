import { StyleSheet } from 'react-native'
import COLORS from './colors'
import SIZES from './sizes'

const STYLES = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   button_primary: {
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      backgroundColor: COLORS.PRIMARY,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
      color: COLORS.WHITE,
      overflow: 'hidden'
   },
   button_accent: {
      borderWidth: 1,
      borderColor: COLORS.WARNING,
      backgroundColor: COLORS.WARNING,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
      color: COLORS.WHITE,
      overflow: 'hidden'
   },
   button_text_primary: {
      color: COLORS.WHITE,
      fontSize: SIZES.H7,
      textAlign: 'center'
   },
   button_text_accent: {
      color: COLORS.WHITE,
      fontSize: SIZES.H7,
      textAlign: 'center'
   }
})

export default STYLES
