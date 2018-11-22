//  

import styled from "styled-components";

const square = styled.div`
  display: inline-block;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  margin: ${props => props.margin};
  &:hover {
    cursor: pointer;
  }
`;

export default square;
