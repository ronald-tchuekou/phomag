import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppModal } from '../base-component/modal'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'

const { width } = Dimensions.get('window')

export const RequestConfirmationModal = React.forwardRef((props, ref) => {
   const [show, setShow] = React.useState(false)
   const [title, setTitle] = React.useState('')

   React.useImperativeHandle(ref, () => ({
      show: (title) => {
         setShow(true)
         setTitle(title)
      },
      dismiss: () => setShow(false),
   }))

   const onPress = React.useCallback(
      (value) => {
         setShow(false)
         props.onConfirm(value)
      },
      [props.onConfirm]
   )

   return (
      <AppModal openMode="fade" visible={show}>
         <View style={styles.container}>
            <Text style={styles.title}>Confirmation</Text>
            <Text style={styles.message}>{title}</Text>
            <View style={styles.line}>
               <View style={styles.btn_container}>
                  <Pressable
                     onPress={() => onPress(false)}
                     android_ripple={{
                        color: COLORS.ERROR_25,
                     }}
                     style={styles.btn}
                  >
                     <Text style={styles.btn_cancel_text}>Cancel</Text>
                  </Pressable>
               </View>
               <View style={styles.btn_container}>
                  <Pressable
                     onPress={() => onPress(true)}
                     android_ripple={{
                        color: COLORS.PRIMARY_25,
                     }}
                     style={styles.btn}
                  >
                     <Text style={styles.btn_validate_text}>Validate</Text>
                  </Pressable>
               </View>
            </View>
         </View>
      </AppModal>
   )
})

const styles = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      padding: SIZES.DEFAULT_PADDING,
      maxWidth: 400,
      width: width - 80,
   },
   title: {
      fontSize: SIZES.H6,
      fontWeight: 'bold',
      color: COLORS.DARK_800,
   },
   message: {
      fontSize: SIZES.H7,
      color: COLORS.DARK_500,
      paddingVertical: SIZES.SMALL_PADDING,
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   btn_container: {
      borderRadius: 10,
      overflow: 'hidden',
   },
   btn: {
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingVertical: 5,
   },
   btn_cancel_text: {
      color: COLORS.ERROR,
      fontSize: SIZES.H7,
      fontWeight: 'bold',
   },
   btn_validate_text: {
      color: COLORS.PRIMARY,
      fontSize: SIZES.H7,
      fontWeight: 'bold',
   },
})
