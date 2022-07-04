import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Modal, StyleSheet, View, Text, Pressable, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'

const { width, height } = Dimensions.get('window')

export const ViewComponent = React.forwardRef((props, ref) => {
   const [path, setPath] = React.useState(null)
   const [show, setShow] = React.useState(false)
   const [renderedOnce, setRenderedOnce] = React.useState(false)

   const updateSource = () => {
      setRenderedOnce(true)
      console.log('Web view is loaded !')
   }
   // To show content file add this : 'file://'

   React.useImperativeHandle(ref, () => ({
      show: showModal,
      dismiss: closeModal,
   }))

   const showModal = (filePath) => {
      setShow(true)
      setPath(filePath)
   }

   const closeModal = () => {
      setShow(false)
      setPath(null)
   }

   return (
      <View style={[styles.centeredView, { height: 0, width: 0, overflow: 'hidden' }]}>
         <Modal animationType="slide" transparent={true} visible={show}>
            <View style={styles.centeredView}>
               <View style={styles.content}>
                  <View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: SIZES.DEFAULT_PADDING,
                     }}
                  >
                     <Text>File name</Text>
                     <Pressable
                        onPress={closeModal}
                        android_ripple={{
                           color: COLORS.DARK_200,
                           borderless: true,
                        }}
                     >
                        <Ionicons name="close" size={30} color={COLORS.DARK_300} />
                     </Pressable>
                  </View>
                  {path ? (
                     <WebView
                     originWhitelist={['*']}
                     source={renderedOnce ? { uri: path } : undefined}
                     style={{ flex: 1 }}
                     allowFileAccess={true}
                     allowUniversalAccessFromFileURLs={true}
                     onLoad={updateSource}
                  />
                  ) : null}
               </View>
            </View>
         </Modal>
      </View>
   )
})

const styles = StyleSheet.create({
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
      width: width,
      height: height,
      backgroundColor: COLORS.WHITE,
      flex: 1,
      backgroundColor: COLORS.DARK_50,
   },
})
