import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import COLORS from '../themes/colors'

export const ChartProgress = ({ value }) => {
   const strokeWidth = 13
   const strokeDasharray = 368
   const progress = useSharedValue(0)
   React.useEffect(() => {
      progress.value = withTiming(value, {
         easing: Easing.linear,
         duration: 500
      })
   }, [value])
   const AnimatedCircle = Animated.createAnimatedComponent(Circle)
   const StrokeAnimation = useAnimatedProps(() => ({
      strokeDashoffset: strokeDasharray - (strokeDasharray * progress.value) / 100
   }))
   return (
      <View style={styles.container}>
         <Svg viewBox='0 0 130 130' style={styles.transition}>
            <Circle
               strokeDasharray={strokeDasharray}
               strokeDashoffset={0}
               strokeLinecap={'round'}
               stroke={COLORS.PRIMARY_15}
               strokeWidth={strokeWidth}
               cx='50%'
               cy='50%'
               r='45%' style={styles.transition} />
            <AnimatedCircle
               strokeDasharray={strokeDasharray}
               animatedProps={StrokeAnimation}
               strokeLinecap={'round'}
               stroke={COLORS.PRIMARY}
               strokeWidth={strokeWidth}
               cx='50%'
               cy='50%'
               r='45%' style={styles.transition} />
         </Svg>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      position: 'relative'
   },
   transition: {
      transition: '300ms'
   }
})