import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormControlProps } from 'react-bootstrap/FormControl';
import OverLay from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import styles from './styles'
import { formItems } from '../../../../config/text';

export interface IEnteredValues {
    [key: string]: string
}

interface IDpFormProps {
    fields: formItems,
    buttonText: string, 
    onSubmit: (e: IEnteredValues) => void,
    title: string,
    buttonDisabledText?: string
    defaultValue?: any,
    onValueChange?: Function,
    customComponents?: JSX.Element[],
    disabled: boolean,
    onDisabled: () => void,
    onDelete?: () => void
}
class DpForm extends React.Component<IDpFormProps> {
    state = {
        formValidated: false,
        formInput: this.defineFormInput(),
        
    }

    defineFormInput() {
        const fi: {[key:string]: any} = {}
        return fi
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
        console.log(name)
        obj[name] = e.currentTarget.value
        this.setState({newProfile: obj})
        if(this.props.onValueChange) {
            this.props.onValueChange(obj)
        }
    }

    validateSelect() {
        
    }

    deleteForm() {
        if(this.props.onDelete) this.props.onDelete()
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
    
    formatNumber(number: string) {
        return parseInt(number.replace(/ /g,''))
    }
    // FORTSÄTT HÄR MED SELECT VALIDERING!
    render() {
        const {formValidated, } = this.state
        const {fields, disabled} = this.props
        return (
            <div style={styles.container}>
                <div style={styles.headerContainer}>
                    <h3 style={styles.title}>{this.props.title}</h3>
                    {this.props.onDelete? 
                        <Button variant="outline-secondary" onClick={() => this.deleteForm()}>
                            Ta bort
                        </Button>
                    
                    :null}
                </div> 
                <Form
                    validated={formValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                    <div style={styles.formGroup}>
                        {Object.keys(fields).map(key => {
                            const item = fields[key]
                            console.log(item)
                            console.log(key)
                            return (
                                <div key={key} style={styles.inputContainer}>
                                    <Form.Group >
                                        <Form.Label>{item.label}</Form.Label>
                                        {item.type === 'select' ?
                                            <Form.Control
                                            as='select'
                                            style={styles.input} 
                                            required
                                            disabled={disabled}
                                            type={item.type}
                                            placeholder={item.label} 
                                            value={this.getDefaultValue(item.key, item.type) || ''}
                                            
                                            onChange={this.onControlChange(key)}>
                                            <option value='' disabled>Välj ett alternativ</option>
                                            {item.selectList ? item.selectList.map(listItem => {
                                                return (
                                                    <option
                                                        value={listItem.id} 
                                                        key={listItem.id}>{listItem.name}
                                                    </option>
                                                )
                                            }):null}
                                            </Form.Control>
                                            :
                                        
                                            <Form.Control
                                                style={styles.input} 
                                                required={item.required}
                                                disabled={disabled}
                                                maxLength={item.maxLength || undefined}
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
                    {!disabled ? 
                    <div style={styles.buttonContainer}>
                    <OverLay
                        placement="left"
                        overlay={
                            <ToolTip id="hej">
                                Du kan redigera senare
                            </ToolTip>
                        }>
                            <Button style={styles.button} variant="primary" type="submit">
                                {this.props.buttonText}
                            </Button>
                        </OverLay>

                        
                    </div> 
                    :null}
                </Form>
                {disabled ? 
                <div style={styles.buttonContainer}>
                    <Button style={styles.button} variant="primary" onClick={() => this.props.onDisabled()}>
                        {this.props.buttonDisabledText || this.props.buttonText}
                    </Button>
                </div> 
                :null}
                
                
            </div>
        )
    }
}

export default DpForm