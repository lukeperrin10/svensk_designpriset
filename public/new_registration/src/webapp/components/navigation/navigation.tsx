import React, {Suspense} from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps} from 'react-router-dom'
// import Registration from '../../pages/registration'
// import Vote from '../../pages/vote'
import Start from '../../pages/start'
// import Winners from '../../pages/winners'
// import StandardPage from '../standard_page'
import * as hosts from '../../config/host'
import Header from '../header'
import Footer from '../footer'
import { CONTENT_TEMPLATES, IContent, ILink, IYearConfig } from '../../model'
import { createSlug } from '../../helpers'
import { PATHS } from '../../config/path'
import { IState } from '../../model/state'
import {getConfig, changePhase} from '../../redux/actions/year_config'
import { connect } from 'react-redux'
import DevHeader from '../dev_header'
import { PHASES } from '../../model/constants'
import * as queryString from 'query-string'
import styles from './navigation.module.css'
// const Start = React.lazy(() => import('../../pages/start'))
const StandardPage = React.lazy(() => import('../standard_page'))
const Winners = React.lazy(() => import('../../pages/winners'))
const Vote = React.lazy(() => import('../../pages/vote'))
const Registration = React.lazy(() => import('../../pages/registration'));

const fallback = <div></div>

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
    const [calendarContent, setCalendarContent] = useState<IContent[]>([])
    const [footerLinks, setFooterLinks] = useState<ILink[]>([])
    const [footerRightContent, setFooterRightContent] = useState<IContent[]>([])
    const [didFetch, setDidFetch] = useState(false)
    const [currentWinnerYear, setCurrentWinnerYear] = useState<number>()
    const isDevVersion = process.env.REACT_APP_IS_DEV === "true"
    
    useEffect(() => {
        fetchConfig()
        fetchContent()
    }, [])

    useEffect(() => {
        setCurrentWinnerYear(getCurrentWinnerYear(yearConfig))
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
        if (CONTENT_TEMPLATES.START_CONTENT in sortedContent) {
            setStartContent(sortedContent[CONTENT_TEMPLATES.START_CONTENT])
        }
        if (CONTENT_TEMPLATES.REGISTER_INFO in sortedContent) {
            setRegisterInfoContent(sortedContent[CONTENT_TEMPLATES.REGISTER_INFO])
        }
        if (CONTENT_TEMPLATES.FOOTER_RIGHT_CONTENT in sortedContent) {
            setFooterRightContent(sortedContent[CONTENT_TEMPLATES.FOOTER_RIGHT_CONTENT])
        }
        if (CONTENT_TEMPLATES.START_CALENDAR in sortedContent) {
            setCalendarContent(sortedContent[CONTENT_TEMPLATES.START_CALENDAR])
        }
    }

    const sortLinks = () => {
        const links: ILink[] = []
        content.sort((a,b) => a.order - b.order).forEach(cont => {
            if (cont.template === CONTENT_TEMPLATES.STANDARD) {
                links.push({
                    title: cont.title,
                    path: createSlug(cont.title)
                })
            }
        })
        links.splice(1,0,{
            title: 'Vinnare',
            path: 'vinnare'
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
                        <Suspense fallback={fallback}>
                            <StandardPage 
                            title={cont.title}
                            content={cont.content}
                            image={cont.image}/>
                        </Suspense>
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
        return yearConfig.current_phase === PHASES.THREE
    }

    const checkIfRegisterAllowed = () => {
        const query = queryString.parse(window.location.search)

        if (yearConfig.current_phase === PHASES.ONE) return true

        const now = new Date()
        console.log(yearConfig)
        console.log(yearConfig.delayed_deadline_end)
        if (now < new Date(yearConfig.delayed_deadline_end)) return true

        const nomineeCanEdit = now > new Date(yearConfig.nominees_can_edit_start) && now < new Date(yearConfig.nominees_can_edit_end)
        return 'secret' in query && nomineeCanEdit
    }

    const redirect = () => {
        return <Redirect to="/" />
    }

    const getHeaderClick = (phase: string) => {
        switch (phase) {
            case PHASES.ONE:
                return {
                    title: 'Anmäl bidrag',
                    path: '/anmalan'
                }
            case PHASES.TWO:
                return {
                    title: 'Juryarbete',
                    path: '/juryn'
                }
            case PHASES.THREE:
                return {
                    title: 'Rösta',
                    path: '/rostning'
                }
            case PHASES.FOUR:
                return {
                    title: 'Prisutdelningen',
                    path: '/prisutdelning'
                }
            case PHASES.FIVE:
                return {
                    title: 'Vinnare',
                    path: '/vinnare'
                }
            default:
                return {
                    title: '',
                    path: ''
                }
        }
    }

    const getCurrentWinnerYear = (yearConfig: IYearConfig) => {
        const today = new Date()
        if (yearConfig.year === '') return today.getFullYear()-1
        const phaseFiveStart = new Date(yearConfig.phase_5_start)
        if (today < phaseFiveStart) {
            return today.getFullYear()-1
        } 
        else {
            return today.getFullYear()
        }
    }

    const getLastRegisterDate = (yearConfig: IYearConfig) => {
        const p2 = new Date(yearConfig.phase_2_start)
        p2.setDate(p2.getDate() -1)
        return p2
    }

    return (
        <Router>
            {isDevVersion && 
            <DevHeader 
            currentPhase={yearConfig.current_phase} 
            changePhase={onChangePhase}
            />}
            <div className={styles.container}>
            <Header 
                path={getHeaderClick(yearConfig.current_phase).path}
                buttonTitle={getHeaderClick(yearConfig.current_phase).title}
                />
            {didFetch && yearConfig.year !== '' &&
            
            <Switch>
             
                <Route exact path='/' render={() => {
                    return (
                        // <Suspense fallback={fallback}>
                            <Start calendar={calendarContent} content={startContent}/>
                        // </Suspense>
                        
                    )
                }}/>

                <Route 
                path={`${PATHS.WINNERS}/:year?`} 
                render={
                    ({ match, history, location }:RouteComponentProps<{year:string}>) => {
                        return (
                            <Suspense fallback={fallback}>
                                <Winners 
                                history={history} 
                                location={location} 
                                match={match} 
                                currentWinnerYear={currentWinnerYear || new Date('2019').getFullYear()} />
                            </Suspense>
                        )
                    } }/>

                {yearConfig.current_phase !== "" &&
                <Route path={PATHS.VOTE} render={() => {
                    if (checkIfVoteAllowed()) return (
                        <Suspense fallback={fallback}>
                            <Vote awardDate={yearConfig.award_date} awardPlace={yearConfig.award_place} />
                        </Suspense>
                    )
                    else return redirect()
                }} />}

                <Route path={PATHS.REGISTRATION} render={() => {
                    if  (checkIfRegisterAllowed()) return (
                        <Suspense fallback={fallback}>
                            <Registration lastDate={getLastRegisterDate(yearConfig)} registerInfo={registerInfoContent} />
                        </Suspense>
                    ) 
                    else return redirect()
                }} />

                {standardPages.length > 0 && getStandardRoutes(standardPages)}
                <Route render={() => {
                    return (
                        <Suspense fallback={fallback}>
                            <Start calendar={calendarContent} content={startContent}/>    
                        </Suspense>
                    )
                }}/>
            </Switch> 
            
            }
            

            </div>
            {didFetch && yearConfig.year !== '' &&
                <Footer content={footerRightContent} links={footerLinks}/>
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
