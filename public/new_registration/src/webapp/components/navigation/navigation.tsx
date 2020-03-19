import * as React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
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
import { IState } from '../../model/state'
import {getConfig, changePhase} from '../../redux/actions/year_config'
import { connect } from 'react-redux'
import DevHeader from '../dev_header'
import { PHASES } from '../../model/constants'
import * as queryString from 'query-string'

interface ReduxProps {
    yearConfig: IYearConfig
}

interface DispatchProps {
    getConfig: () => Promise<any>,
    changePhase: (phase: PHASES) => void
}

type props = ReduxProps & DispatchProps

const Navigation = ({yearConfig, getConfig, changePhase}:props) => {

    const [content, setContent] = useState<IContent[]>([])
    const [registerInfoContent, setRegisterInfoContent] = useState<IContent[]>([])
    const [standardPages, setStandardPages] = useState<IContent[]>([])
    const [startContent, setStartContent] = useState<IContent[]>([])
    const [footerLinks, setFooterLinks] = useState<ILink[]>([])
    const [didFetch, setDidFetch] = useState(false)
    const isDevVersion = process.env.REACT_APP_IS_DEV === "true"
    
    useEffect(() => {
        fetchConfig()
        fetchContent()
    }, [])

    useEffect(() => {
        console.log(yearConfig)
    }, [yearConfig])

    useEffect(() => {
        sortContent()
        sortLinks()
    },[content])

    const fetchConfig = async() => {
        await getConfig()
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
        if (CONTENT_TEMPLATES.REGISTER_INFO in sortedContent) {
            setRegisterInfoContent(sortedContent[CONTENT_TEMPLATES.REGISTER_INFO])
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
        setDidFetch(true)
    }

    const fetchContent = async () => {
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
                        <StandardPage 
                            title={cont.title}
                            content={cont.content}
                            image={cont.image}/>
                    )
                }} />
            )
        })
        return routes
    }

    const onChangePhase = (phase: PHASES) => {
        changePhase(phase)
    }

    const checkIfVoteAllowed = () => {
        //WARNING: CHANGE BEFORE DEPLOY
        return true
        return yearConfig.current_phase === PHASES.FOUR
    }

    const checkIfRegisterAllowed = () => {
        //WARNING: CHANGE BEFORE DEPLOY
        return true
        const query = queryString.parse(window.location.search)
        if (yearConfig.current_phase === PHASES.ONE) return true
        const now = new Date()
        const nomineeCanEdit = now > new Date(yearConfig.nominees_can_edit_start) 
        && now < new Date(yearConfig.nominees_can_edit_end)
        return 'secret' in query && nomineeCanEdit
    }

    const redirect = () => {
        return <Redirect to="/" />
    }

    return (
        <Router>
            {isDevVersion && 
            <DevHeader 
            currentPhase={yearConfig.current_phase} 
            changePhase={onChangePhase}
            />}
            {didFetch &&
            <div>
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

                {yearConfig.current_phase !== "" &&
                <Route path={PATHS.VOTE} render={() => {
                    if (checkIfVoteAllowed()) return <Vote />
                    else return redirect()
                }} />}

                <Route path={PATHS.REGISTRATION} render={() => {
                    if (checkIfRegisterAllowed()) return <Registration registerInfo={registerInfoContent} />
                    else return redirect()
                }} />

                {standardPages.length > 0 && getStandardRoutes(standardPages)}
            </Switch>
            <Footer links={footerLinks}/>
            </div>
            }
        </Router>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        yearConfig: state.yearConfigState.config
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getConfig: () => dispatch(getConfig()),
        changePhase: (phase: PHASES) => dispatch(changePhase(phase))
    }
}

export default connect<ReduxProps, DispatchProps, {}, IState>(mapStateToProps, mapDispatchToProps)(Navigation)
