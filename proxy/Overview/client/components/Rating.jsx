import React from 'react';
import styled from 'styled-components';
import { StarIcon, StarSet, StarDisp, RatingInternalWrapper, Total } from './Styles.jsx';

const star = (fill, num) => {
  // 0 = empty, 0.5 = half, 1 = full
  return StarDisp(fill, num);
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Rating = (props) => {
  const five = [0, 1, 2, 3, 4];
  const starArray = five.map(num => {
    if (props.average - num <= 0.2) {
      return star(0, num);
    }
    if (props.average - num >= 0.8) {
      return star(1, num);
    }
    return star(0.5, num);
  });
  return (
    <RatingInternalWrapper>
      {props.average.toFixed(1)}
      <StarSet>{starArray}</StarSet>
      <Total>{"(" + numberWithCommas(props.total) + " ratings)"}</Total>
      <Total>{props.students ? numberWithCommas(props.students) : null} students</Total>
    </RatingInternalWrapper>
  )
};

export { Rating as default };
