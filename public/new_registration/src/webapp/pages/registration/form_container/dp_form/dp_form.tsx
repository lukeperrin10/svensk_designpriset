import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormControlProps } from 'react-bootstrap/FormControl';
import styles from './styles'
import { formItems } from 'src/webapp/config/text';

export interface IEnteredValues {
    [key: string]: string
}

interface IDpFormProps {
    fields: formItems,
    buttonText: string, 
    onSubmit: (e: IEnteredValues) => void,
    disabled: boolean,
    title: string,
    buttonDisabledText?: string
    defaultValue?: any,
    onValueChange?: Function,
    customComponents?: JSX.Element[]
}
class DpForm extends React.Component<IDpFormProps> {
    state = {
        formValidated: false,
        formInput: {}
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            this.props.onSubmit(this.state.formInput)
            e.preventDefault()
        }
    }

    onControlChange = (name: string) => (e: React.FormEvent<FormControlProps>)  => {
        let obj = this.state.formInput
        obj[name] = e.currentTarget.value
        this.setState({newProfile: obj})
        if(this.props.onValueChange) {
            this.props.onValueChange(obj)
        }
    }

    getDefaultValue(key: string, inputType: string) {
        const {defaultValue} = this.props
        if (defaultValue) {
            if (key in defaultValue) {
                switch (inputType) {
                    case "number":
                    return this.formatNumber(defaultValue[key])
                    default:
                    return defaultValue[key]
                }
            } else {
                return undefined
            }
        }
    }
    // FORTSÄTT HÄR! TAR BORT '0'
    formatNumber(number: string) {
        return parseInt(number.replace(/ /g,''))
    }

    render() {
        const {formValidated} = this.state
        const {fields} = this.props
        return (
            <div style={styles.container}>
                <h3 style={styles.title}>{this.props.title}</h3>
                <Form
                    validated={formValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                    <div style={styles.formGroup}>
                        {Object.keys(fields).map(key => {
                            // i++
                            const item = fields[key]
                            return (
                                <div key={key} style={styles.inputContainer}>
                                    <Form.Group >
                                        <Form.Label>{item.label}</Form.Label>
                                        {item.type === 'select' ?
                                            <Form.Control
                                            as='select'
                                            style={styles.input} 
                                            required
                                            disabled={this.props.disabled}
                                            type={item.type}
                                            placeholder={item.label} 
                                            defaultValue={this.getDefaultValue(item.key, item.type)}
                                            onChange={this.onControlChange(key)}>
                                            {item.selectList ? item.selectList.map(listItem => {
                                                return (
                                                    <option key={listItem.id}>{listItem.name}</option>
                                                )
                                            }):null}
                                            </Form.Control>
                                            :
                                        
                                            <Form.Control
                                                style={styles.input} 
                                                required
                                                disabled={this.props.disabled}
                                                type={item.type}
                                                placeholder={item.label} 
                                                defaultValue={this.getDefaultValue(item.key, item.type)}
                                                onChange={this.onControlChange(key)}/>
                                        }
                                        {/* <Form.Control.Feedback type="invalid">
                                            Får inte vara tomt!
                                        </Form.Control.Feedback> */}
                                    </Form.Group>  
                                </div>
                            )
                        })}
                    </div>
                    {this.props.customComponents ?
                    <div style={styles.customComponentContainer}>
                        {this.props.customComponents}
                    </div>
                    :null}
                    <div style={styles.buttonContainer}>
                        {this.props.disabled ? 
                        <Button style={styles.button} variant="primary">
                            {this.props.buttonDisabledText || this.props.buttonText}
                        </Button>
                        :
                        <Button style={styles.button} variant="primary" type="submit">
                            {this.props.buttonText}
                        </Button>
                        }
                        
                    </div>
                </Form>
            </div>
        )
    }
}

export default DpForm