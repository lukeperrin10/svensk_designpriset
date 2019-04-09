import * as React from 'react'
import Button from 'react-bootstrap/Button';
import fetch from 'cross-fetch'
import { IMAGE_TEST_URL } from 'src/webapp/config/host';


class DpImageUpload extends React.Component {
    state = {
        image: '',
        result: ''
    }
    constructor(p: {}) {
        super(p)
    }
    
    saveImage = async () => {
        console.log('save image')
        const formData = new FormData()
        formData.append('image', this.state.image)
        try {
            const res = await fetch(IMAGE_TEST_URL, {
                method: 'POST',
                body: formData,
            })
            const result = await res.json()
            console.log(result)
        } catch (error) {
            console.log('error')
            console.log(JSON.parse(error))
        }
        
    }

    render() {
        console.log(this.state.image)
        return (
            <div>
                <input onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => this.setState({image: (e.target.files as any)[0]})} 
                    type="file" />
                <Button variant="primary" onClick={() => this.saveImage()}>Ladda upp</Button>    
            </div>
            
        )
    }
}

export default DpImageUpload