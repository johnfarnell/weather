import styled from "styled-components"; 
const switchCursor = (props: {loading: boolean}) => {
  // Show the cursor if anything is loading
  if (props.loading) {
      return 'cursor: wait;'
  }

  return null;
}
export const MainGrid = styled.div<{loading: boolean}>`
    display: grid;
    height: 800px;
    grid-template-rows: 10% 20% auto;
    align-content: flex-start;
    justify-items: center;
    row-gap: 1px;
    ${switchCursor}
  `