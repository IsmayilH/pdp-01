import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg
      width={width || 25}
      height={height || 25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M23.12 9.2 12.25 1 1.38 9.2c-.23.21-.36.49-.38.8v12.52c0 .54.44.98.98.98H8.5v-5.25c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75v5.25h6.52c.54 0 .98-.44.98-.98V10c-.02-.31-.15-.59-.38-.8Z"
        stroke={color || '#84949C'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default HomeIcon;
