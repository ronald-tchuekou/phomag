import { StyleSheet } from 'react-native'
import COLORS from './colors'
import SIZES from './sizes'

const STYLES = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   button_primary: {
      backgroundColor: COLORS.TRANSPARENT,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
      overflow: 'hidden',
   },
   button_accent: {
      backgroundColor: COLORS.TRANSPARENT,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
      overflow: 'hidden',
   },
   button_container: {
      backgroundColor: COLORS.TRANSPARENT,
      borderRadius: 10,
      overflow: 'hidden',
   },
   button_text_primary: {
      color: COLORS.WHITE,
      fontSize: SIZES.H7,
      textAlign: 'center',
   },
   button_text_accent: {
      color: COLORS.WHITE,
      fontSize: SIZES.H7,
      textAlign: 'center',
   },
})

export default STYLES
