import React from "react"
import {Modal, StyleSheet, View} from "react-native"
import SIZES from '../themes/sizes'

export const AppModal = ({visible, onClose, children, openMode = 'slide'}) => {
   return (
      <View style={[
         styles.centeredView,
         {
            height: 0,
            width: 0
         }
      ]}>
         <Modal
            animationType={openMode}
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
         >
            {visible && (
               <View style={styles.centeredView}>
                  {children}
               </View>
            )}
         </Modal>
      </View>
   )
}

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      zIndex: 100000,
      padding: SIZES.LARGE_PADDING
   }
})
