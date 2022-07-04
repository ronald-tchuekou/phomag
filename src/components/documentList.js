import React from 'react'
import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native'
import { PdfSVG } from '../svg'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'

const { width } = Dimensions.get('window')

export const DocumentList = ({ documents }) => {
   return (
      <View style={[styles.container]}>
         {documents.map((item) => (
            <Pressable
               onPress={showDoc}
               android_ripple={{
                  color: COLORS.DARK_100,
               }}
               key={item.id}
               style={styles.doc_container}
            >
               <PdfSVG />
               <View style={{ padding: 5 }}>
                  <Text style={styles.doc_name}>{item.name}</Text>
                  <Text style={styles.doc_sub_name}>{item.page_num} pages</Text>
               </View>
            </Pressable>
         ))}
      </View>
   )
}

const styles = StyleSheet.create({
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
