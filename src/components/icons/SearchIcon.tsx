import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SearchIcon = (props: SvgProps) => {
  const {color, width, height} = props;

  return (
    <Svg
      width={width || 23}
      height={height || 23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.679 9.205c0 4.668-3.79 8.454-8.465 8.454S.75 13.873.75 9.205C.75 4.536 4.539.75 9.214.75c4.676 0 8.465 3.786 8.465 8.455Z"
        stroke={color || '#84949C'}
        strokeWidth={1.5}
      />
      <Path
        transform="rotate(44.97 -11.365 24.985)"
        stroke={color || '#84949C'}
        strokeWidth={1.5}
        strokeLinecap="round"
        d="M.75-.75h8.63"
      />
    </Svg>
  );
};

export default SearchIcon;
