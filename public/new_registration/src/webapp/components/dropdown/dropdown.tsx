import * as React from 'react'
import styles from './dropdown.module.css'
import BootDropDown from 'react-bootstrap/Dropdown'

interface props {
    onAction: (item: string) => void,
    items: string[],
    label: string
}

const DropDown = ({onAction, items, label}:props) => {
    return (
        <div className={styles.dropdown}>
                <BootDropDown>
                    <BootDropDown.Toggle id='hej'>
                        {label}
                    </BootDropDown.Toggle>
                    <BootDropDown.Menu>
                    {items.map(item => {
                        return (
                            <BootDropDown.Item key={item} onClick={() => onAction(item)}>{item}</BootDropDown.Item>
                        )
                    })}
                    </BootDropDown.Menu>
                </BootDropDown>
            </div>
    )
}

export default DropDown
