import styled from "styled-components"; 

type ErrorType = {
  message: string
}

const errorVisible = (props: { message: string}) : string => {
  console.log({errorV: props.message})
  if (!!props.message) {
    return ''
  } else {
    return 'visibility: hidden;'

  }
}

const ErrorDiv = styled.div<ErrorType>`
  label { 
    color: red;
  };
  ${errorVisible}
`

export const Error = (props: { message: string}) => {
    console.log({messageXXXX: props.message})
    return (
      <ErrorDiv message={props.message}>
          <label>{props.message}</label>
      </ErrorDiv>
    )
}