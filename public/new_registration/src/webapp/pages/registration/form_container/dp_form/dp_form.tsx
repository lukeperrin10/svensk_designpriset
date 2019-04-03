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
    onSubmit: (e: IEnteredValues) => void
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
    }

    render() {
        const {formValidated} = this.state
        const {fields} = this.props
        return (
            <div>
                <Form
                    style={styles.formGroup}
                    validated={formValidated}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.onSubmit(e)}>
                        {Object.keys(fields).map(key => {
                            // i++
                            const item = fields[key]
                            return (
                                <Form.Group key={key}>
                                    <Form.Control
                                        style={styles.input} 
                                        required
                                        type={item.type}
                                        placeholder={item.label} 
                                        onChange={this.onControlChange(key)}/>
                                    {/* <Form.Control.Feedback type="invalid">
                                        Får inte vara tomt!
                                    </Form.Control.Feedback> */}
                                </Form.Group>  
                            )
                        })}
                    <div style={styles.buttonContainer}>
                        <Button variant="primary" type="submit">
                            {this.props.buttonText}
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default DpForm