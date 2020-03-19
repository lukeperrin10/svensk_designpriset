import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
    onDelete?: () => void,
    shouldSubmit: boolean, 
    onError: () => void
}
class DpForm extends React.Component<IDpFormProps> {
    state = {
        formValidated: false,
        formInput: this.defineFormInput(),
    }

    private formRef : React.RefObject<Form<"form"> & HTMLFormElement>

    constructor(p: IDpFormProps) {
        super(p)
        this.formRef = React.createRef()
    }

    defineFormInput() {
        const fi: {[key:string]: any} = {}
        return fi
    }

    componentWillReceiveProps(p: IDpFormProps) {
        if (p.shouldSubmit !== this.props.shouldSubmit) {
            if (p.shouldSubmit) {
                this.onOutsideSubmit()
            }
        }
    }

    onOutsideSubmit() {
        if (this.formRef.current?.reportValidity()) {
            this.props.onSubmit(this.state.formInput)
        } else {
            this.props.onError()
        }
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        console.log('ON SUBMIT')
        const form = e.currentTarget
        console.log(form)
        if (form.checkValidity() === false) {
            console.log('nepp')
            e.preventDefault()
            e.stopPropagation()
        } else {
            this.props.onSubmit(this.state.formInput)
            e.preventDefault()
        }
    }

    onControlChange = (name: string) => (e: React.FormEvent<HTMLInputElement>)  => {
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
                    ref={this.formRef}
                    validated={formValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                    <div style={styles.formGroup}>
                        {Object.keys(fields).map(key => {
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