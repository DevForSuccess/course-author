import styled from 'styled-components';
import React from 'react';

export const AuthorWrapper = styled.div`
    font-family: sf pro display,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  `;

export const InstHeader = styled.div`
  font-family: sf pro display,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -.02rem;
  font-size: 24px;
  margin-bottom: 16px;
  color: black;
  `;

export const NameHeader = styled.a`
  font-family: sf pro display,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 4px;
  letter-spacing: -.02rem;
  font-size: 19px;
  color: #0F7C90;
  text-decoration: none;
  &:hover {
    color: #083E48;
  }
  `;

export const JobHeader = styled.div`
  color: #73726C;
  font-weight: 400;
  line-height: 1.4;
  font-size: 16px;
  `;

export const AvatarInfo = styled.div`
  margin-top: 8px;
  display: flex;
  `;

export const AvatarParent = styled.a`
  flex: 0 0 auto;
  min-width: .1rem;
  margin: 0 1.6rem 0 0;
  `;

export const AvatarImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  `;

export const InstructorStats = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: 400;
  display: block;
  width: 100%;
  height: auto;
  text-align: left;
  letter-spacing: normal;
  white-space: normal;
  `;

export const StatListItem = styled.li`
  padding: 0;
  color: #3c3b37;
  font-family: sf pro display,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  font-size: 14px;
  align-items: center;
  vertical-align: middle;
  display: block;
  `;

export const MiniIcon = styled.svg`
  color: #eb8a2f;
  min-height: 1.96rem;
  width: 1.6rem;
  height: 1.6rem;
  fill: currentColor;
  display: inline-block;
  flex-shrink: 0;
  box-sizing: border-box;
  vertical-align: -15px;
  display: inline-block;
  `;


export const StatListItemText = styled.div`
  margin-left: 1rem;
  min-height: 1.96rem;
  flex: 1;
  min-width: 1px;
  display: inline;
  `;

export const BioWrapper = styled.div`
  height: ${props => props.expanded ? 'auto' : '100px'};
  padding-bottom: ${props => props.expanded ? '14px' : '0px'};
  font-weight: 400;
  line-height: 1.4;
  font-size: 14px;
  background: white;
  position:relative;
  height: auto;
  overflow: hidden;
  `;
export const BioBefore = styled.div`
  cursor: pointer;
  font-weight: 700;
  color: #0F7C90;
  &:hover {
    color: #083E48;
  }
  position: absolute;
  bottom: 0px;
  left:0;
  width:100%;
  z-index: 2;
  text-align: left;
  `;

export const BioAfter = styled.div`
    display: ${props => props.expanded ? 'none' : 'block'};
    content: "";
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    z-index: 1;
    background: -webkit-linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    background: -moz-linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    background: -o-linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
  `;

export const BioContents = styled.div`
  max-height: ${props => props.expanded ? 'none' : '100px'};
  `;

export const BioParagraph = styled.p`
  text-indent: 1rem;
  color: #3c3b37;
  font-weight: 400;
  max-height: ${props => props.expanded ? 'none' : '100px'};
  `;

export const PointerSVG = styled.svg`
  position: relative;
  top: 2px;
  width: 24px;
  height: 15px;
  margin-left: 6px;
  fill: currentColor;
  }
  `;

export const PentPath = (
  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
);

export const RibbonPath = (
  <path d="M20.39 19.37L16.38 18 15 22l-3.08-6L9 22l-1.38-4-4.01 1.37 2.92-6A6.97 6.97 0 015 9a6.999 6.999 0 1114 0c0 1.65-.57 3.17-1.53 4.37l2.92 6zM7 9l2.69 1.34-.19 3 2.5-1.66 2.5 1.65-.17-2.99L17 9l-2.68-1.35.18-2.98L12 6.31 9.5 4.65l.17 3.01L7 9z"></path>
);

export const PeoplePath = (
  <path d="M16 10c1.66 0 2.99-1.34 2.99-3S17.66 4 16 4c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 4 8 4C6.34 4 5 5.34 5 7s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-4.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-4.5c0-2.33-4.67-3.5-7-3.5z"></path>
);

export const PlayPath = (
  <path d="M2 12c0 5.525 4.475 10 10 10s10-4.475 10-10S17.525 2 12 2 2 6.475 2 12zm15 .114L9 16V8l8 4.114z"></path>
);