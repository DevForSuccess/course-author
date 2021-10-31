import React from 'react';
import styled from 'styled-components';
import { PointerSVG } from './Styles.jsx';

const Pointer = (props) => {
  return (
    <PointerSVG viewBox="0 0 24 24">
      {props.expanded ? (<path d="M 7.41 15.41 L 12 10.83 l 4.59 4.58 L 18 14 l -6 -6 l -6 6 l 1.41 1.41 Z"></path>): (<path d="M 16.59 8.59 L 12 13.17 L 7.41 8.59 L 6 10 l 6 6 l 6 -6 l -1.41 -1.41 Z"></path>)}
      </PointerSVG>
  );
};



export {Pointer as default};