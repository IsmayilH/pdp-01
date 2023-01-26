import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function InfoIcon({stroke = '#C72525', ...props}) {
  const {color} = props;
  return (
    <Svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
      <Circle
        cx={13.5}
        cy={13.5}
        r={12.5}
        stroke={color || '#C72525'}
        strokeWidth={2}
      />
      <Path
        d="M14.515 17.8c0 .34-.12.625-.36.855-.23.23-.515.345-.855.345-.33 0-.615-.115-.855-.345a1.161 1.161 0 01-.345-.855c0-.34.115-.625.345-.855.24-.23.525-.345.855-.345.34 0 .625.115.855.345.24.23.36.515.36.855zm-2.145-2.325l-.24-7.74h2.25l-.24 7.74h-1.77z"
        fill={color || '#C72525'}
      />
    </Svg>
  );
}

export default InfoIcon;
