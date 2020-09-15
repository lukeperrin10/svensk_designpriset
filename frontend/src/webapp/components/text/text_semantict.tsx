import * as React from 'react'
import Text, { TEXT_TYPES } from './text'

interface props {
    className?: string
}

export const H1 : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.H1}>{children}</Text>
}

export const H2 : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.H2}>{children}</Text>
}

export const H3 : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.H3}>{children}</Text>
}

export const H4 : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.H4}>{children}</Text>
}

export const P : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.P}>{children}</Text>
}

export const Ingress : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.INGRESS}>{children}</Text>
}

export const Label : React.FunctionComponent<props> = ({className, children}) => {
    return <Text type={TEXT_TYPES.LABEL}>{children}</Text>
}
