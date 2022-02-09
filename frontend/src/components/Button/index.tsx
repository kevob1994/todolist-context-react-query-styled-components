import styled from 'styled-components'
import { PropsBtn } from '../../types/Style'

const Button = styled.button<PropsBtn>`
  background: ${(props: PropsBtn) =>
    props.primary ? (props.color ? props.color : '#282c34') : 'white'};
  color: ${(props) => (props.primary ? 'white' : props.color ? props.color : '#282c34')};
  font-size: 1em;
  padding: 1em 1em;
  border: 2px solid ${(props: PropsBtn) => (props.color ? props.color : '#282c34')};
  border-radius: 3px;
  margin: 6px;
  min-width: 150px;
  width: ${(props) => (props.width ? props.width : '-webkit-fill-available;')};
  &:hover {
    background: ${(props: PropsBtn) => (props.hovercolor ? props.hovercolor : '#4b5566')};
    color: white;
  }
  &:active {
    background: ${(props: PropsBtn) => (props.clickcolor ? props.clickcolor : '#768091')};
  }
`

export default Button
