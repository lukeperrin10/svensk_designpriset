import * as React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from '../../pages/registration'
import Vote from '../../pages/vote'
import Start from '../../pages/start'
import * as hosts from '../../config/host'
import Header from '../header'
import Footer from '../footer'
import { CONTENT_TEMPLATES, IContent, ILink, IYearConfig } from '../../model'
import { createSlug } from '../../helpers'
import StandardPage from '../standard_page'
import { PATHS } from '../../config/path'
import Winner from '../../pages/winner'
import Winners from '../../pages/winners'
import { IState, IYearConfigState } from '../../model/state'
import {getConfig} from '../../redux/actions/year_config'
import { connect } from 'react-redux'

interface ReduxProps {
    yearConfig: IYearConfigState
}

interface DispatchProps {
    getConfig: () => Promise<any>
}

type props = ReduxProps & DispatchProps

const Navigation = (props:props) => {

    const [content, setContent] = useState<IContent[]>([])
    const [standardPages, setStandardPages] = useState<IContent[]>([])
    const [startContent, setStartContent] = useState<IContent[]>([])
    const [footerLinks, setFooterLinks] = useState<ILink[]>([])

    useEffect(() => {
        fetchConfig()
        fetchContent()
    }, [])

    useEffect(() => {
        console.log(props.yearConfig)
    }, [props.yearConfig])

    useEffect(() => {
        sortContent()
        sortLinks()
    },[content])

    const fetchConfig = async() => {
        await props.getConfig()
        console.log(props.yearConfig)
    }

    const sortContent = () => {
        const sortedContent: {[key: string]: IContent[]} = {}
        content.forEach(cont => {
            if (cont.template in sortedContent) {
                sortedContent[cont.template].push(cont)
            } else {
                sortedContent[cont.template] = [cont]
            }
        })
        if (CONTENT_TEMPLATES.STANDARD in sortedContent) {
            setStandardPages(sortedContent[CONTENT_TEMPLATES.STANDARD])
        }
        if (CONTENT_TEMPLATES.START_INFO in sortedContent) {
            setStartContent(sortedContent[CONTENT_TEMPLATES.START_INFO])
        }
    }

    const sortLinks = () => {
        const links: ILink[] = []
        content.forEach(cont => {
            if (cont.template === CONTENT_TEMPLATES.STANDARD) {
                links.push({
                    title: cont.title,
                    path: createSlug(cont.title)
                })
            }
        })
        setFooterLinks(links)
    }

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

    const getStandardRoutes = (standardContent: IContent[]) => {
        const routes = standardContent.map(cont => {
            return (
                <Route 
                    key={cont.title} 
                    path={`/${createSlug(cont.title)}`} 
                    render={() => {
                    return (
                        <div>
                            <StandardPage 
                                title={cont.title}
                                content={cont.content}
                                image={cont.image}/>
                        </div>
                    )
                }} />
            )
        })
        return routes
    }

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/' render={() => {
                    return (
                        <Start content={startContent[0]}/>
                    )
                }}/>
                <Route path={`${PATHS.WINNERS}/:year`} component={Winners}/>
                <Route path={`${PATHS.WINNERS}`} component={Winners}/>
                <Route path={`${PATHS.WINNER_ENTRY}/:id`} component={Winner}/>
                <Route path={PATHS.VOTE} component={Vote} />
                <Route path={PATHS.REGISTRATION} component={Registration} />
                {standardPages.length > 0 && getStandardRoutes(standardPages)}
            </Switch>
            <Footer links={footerLinks}/>
        </Router>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        yearConfig: state.yearConfigState
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getConfig: () => dispatch(getConfig())
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Navigation)
