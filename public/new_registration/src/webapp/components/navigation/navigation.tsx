import * as React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from 'src/webapp/pages/registration'
import Vote from 'src/webapp/pages/vote'
import Start from 'src/webapp/pages/start'
import * as hosts from '../../config/host'
import Header from '../header'
import Footer from '../footer'

const Navigation = () => {

    const [content, setContent] = useState([])

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        console.log('fetch content')
        try {
            const response = await fetch(hosts.CONTENT_URL)
            const json = await response.json()
            setContent(json)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Router>
            <Switch>
                <Route path='/' render={() => {
                    return (
                        <div>
                            <Header />
                                <Start content={content[0]}/>
                            <Footer />
                        </div>
                        
                    )
                }} />
                <Route path='/rostning' component={Vote} />
                <Route path='/anmalan' component={Registration} />
            </Switch>
        </Router>
    )
}

export default Navigation