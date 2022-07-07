import React from 'react'
import { Pressable, View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { PdfSVG } from '../svg'
import COLORS from '../themes/colors'
import { empty_file } from '../themes/images'
import SIZES from '../themes/sizes'
import { formatFileSize, getMediaPath, openPDF } from '../utils'

const { width } = Dimensions.get('window')

export const DocumentList = ({ documents }) => {
   const showDoc = React.useCallback((file) => {
      openPDF(getMediaPath(file.path, 'documents'))
   }, [])

   return (
      <>
         <Text style={styles.subTitle}>Document list</Text>
         {documents.length === 0 ? (
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 170,
               }}
            >
               <Image source={empty_file} resizeMode="contain" style={{ width: 150, height: 150 }} />
               <Text
                  style={{
                     fontSize: SIZES.H6,
                     color: COLORS.DARK_300,
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                  }}
               >
                  No file add to this request !
               </Text>
            </View>
         ) : (
            <View style={[styles.container]}>
               {documents.map((item, index) => (
                  <Pressable
                     onPress={() => showDoc(item)}
                     android_ripple={{
                        color: COLORS.DARK_100,
                     }}
                     key={index}
                     style={styles.doc_container}
                  >
                     <PdfSVG />
                     <View style={{ padding: 5 }}>
                        <Text numberOfLines={1} style={styles.doc_name}>
                           {item.name}
                        </Text>
                        <Text style={styles.doc_sub_name}>{formatFileSize(item.size)}</Text>
                     </View>
                  </Pressable>
               ))}
            </View>
         )}
      </>
   )
}

const styles = StyleSheet.create({
   subTitle: {
      color: COLORS.DARK_800,
      fontWeight: 'bold',
      fontSize: SIZES.H6,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingBottom: 4,
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      padding: SIZES.SMALL_PADDING,
   },
   doc_container: {
      flexDirection: 'row',
      paddingVertical: 5,
   },
   doc_name: {
      fontSize: SIZES.H7,
      fontWeight: 'bold',
      color: COLORS.DARK_800,
      width: width - 125,
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300,
   },
})
