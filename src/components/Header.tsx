import styled from "styled-components"; 


const HeaderDiv = styled.div`
  padding-top: 16px;
  label { 
    font-size: x-large;
  };
`

export const Header = (props: { heading: string}) => {
    return (
      <HeaderDiv>
          <label>{props.heading}</label>
      </HeaderDiv>
    )
}