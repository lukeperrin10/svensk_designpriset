import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from '../../../../components/button'
// import styles from './styles'
import styles from './dp_form.module.css'
import { formItems } from '../../../../config/text';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../../../components/button/button';
import Text from '../../../../components/text';
import { TEXT_TYPES } from '../../../../components/text/text';
import { H3 } from '../../../../components/text/text_semantict';
import arrow from '../../../../assets/ui/arrow_down.svg'

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
    onDisabled: () => void,
    onDelete?: () => void,
    shouldSubmit: boolean, 
    onError: () => void,
    categoryType?: string
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
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            this.props.onSubmit(this.state.formInput)
            e.preventDefault()
        }
    }

    onControlChange = (name: string) => (e: React.FormEvent<HTMLInputElement>)  => {
        let obj = this.state.formInput
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
        const {fields, categoryType} = this.props
        return (
            <div className={styles.container}>
                <hr></hr>
                <header className={styles.header}>
                    <H3>{this.props.title}</H3>
                    {this.props.onDelete? 
                        <Button variant={BUTTON_VARIANTS.SECONDARY} size={BUTTON_SIZES.SMALL} onClick={() => this.deleteForm()} title={'Ta bort'}/>
                    :null}
                </header> 
                <Form
                    ref={this.formRef}
                    validated={formValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                    <div className={styles.form}>
                        {Object.keys(fields).map(key => {
                            const item = fields[key]
                            if (item.categoryType && item.categoryType !== categoryType) {
                                return null
                            }
                            if (item.type === 'header') {
                                return (
                                    <Text key={item.key} className={styles.header_label} type={TEXT_TYPES.LABEL}>{item.label}</Text>
                                )
                            }
                            return (
                                <div key={key} className={[styles.input_container, 
                                item.singleRow && styles.single_row, 
                                item.marginBottom && styles.margin_bottom].join(' ')}>
                                    <Form.Group>
                                        <Form.Label className={styles.label}>{item.label}</Form.Label>
                                        {item.type === 'select' ?
                                            <Form.Control
                                            as='select'
                                            className={[styles.input, styles.input_select].join(' ')}
                                            required
                                            type={item.type}
                                            value={this.getDefaultValue(item.key, item.type) || ''}
                                            onChange={this.onControlChange(key)}>
                                            <option className={styles.select_header} value='' disabled>
                                                V??lj ett alternativ
                                            </option>
                                            {item.selectList ? item.selectList.map(listItem => {
                                                return (
                                                    <option
                                                        className={styles.select_option}
                                                        value={listItem.id} 
                                                        key={listItem.id}>{listItem.name}
                                                    </option>
                                                )
                                            }):null}
                                            </Form.Control>
                                            :
                                            <Form.Control
                                                className={[styles.input, 
                                                    item.small && styles.small_input, 
                                                    item.medium && styles.medium_input].join(' ')}
                                                required={item.required}
                                                maxLength={item.maxLength || undefined}
                                                type={item.type}
                                                as={item.largeTextInput? 'textarea' : 'input'}
                                                rows={item.largeTextInput ? '4' : '1'}
                                                // placeholder={item.label} 
                                                defaultValue={this.getDefaultValue(item.key, item.type)}
                                                onChange={this.onControlChange(key)}/>
                                        }
                                        <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                        </Form.Control.Feedback>
                                    </Form.Group>  
                                </div>
                            )
                        })}
                    </div>
                </Form>
                {this.props.customComponents ?
                    <div>
                        {this.props.customComponents}
                    </div>
                    :null}
            </div>
        )
    }
}

export default DpForm