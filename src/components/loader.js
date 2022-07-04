import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'

export const ModalLoader = React.forwardRef((props, ref) => {
   const [show, setShow] = React.useState(false)
   React.useImperativeHandle(ref, () => ({
      show: () => setShow(true),
      dismiss: () => setShow(false),
   }))
   return (
      <View style={[loader_styles.centeredView, { height: 0, width: 0, overflow: 'hidden' }]}>
         <Modal animationType="fade" transparent={true} visible={show}>
            <View style={loader_styles.centeredView}>
               <View style={loader_styles.content}>
                  <ActivityIndicator size="large" color={COLORS.PRIMARY_75} />
               </View>
            </View>
         </Modal>
      </View>
   )
})

export const AppLoader = () => {
   return (
      <View style={loader_styles.centeredView1}>
         <View style={loader_styles.content}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY_75} />
         </View>
      </View>
   )
}

export const loader_styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.12)',
   },
   centeredView1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
   },
   content: {
      padding: SIZES.DEFAULT_PADDING,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.WHITE,
   },
})
