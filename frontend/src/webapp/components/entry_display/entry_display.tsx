import * as React from 'react'
import styles from './entry_display.module.css'
import { IEntry, IEntryImage } from '../../model'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import Button from '../button'
import { IS_MOBILE } from '../../config/style'
import Text, { P, H1, H2, H3, Label } from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../button/button'
import CloseButton from '../close_button'
import { assembleMediaUrl } from '../../helpers'
import arrow from '../../assets/ui/arrow.svg'
import VideoPlayer from '../video_player'
import gold from '../../assets/ui/crown_gold.svg'
import silver from '../../assets/ui/crown_silver.svg'
import './overrides.css'

interface props {
    entry: IEntry,
    categoryName: string,
    prevEntry?: IEntry,
    nextEntry?: IEntry,
    onPrevNextClick?: (entry: IEntry) => void,
    onVoteClick?: (entry: IEntry) => void,
    isVoted?: boolean,
    onClose?: () => void
}

const EntryDisplay = ({entry, categoryName, prevEntry, nextEntry, onPrevNextClick, onVoteClick, isVoted, onClose}:props) => {
    console.log(entry)
    const onVote = () => {
        if (onVoteClick) onVoteClick(entry)
    }

    const onPrevNext = (entry: IEntry) => {
        if (onPrevNextClick) onPrevNextClick(entry)
    }

    const getButtons = () => {
        if (onVoteClick) {
            return (
                <div className={styles.button}>
                    {isVoted ?
                        <Button 
                        variant={BUTTON_VARIANTS.PRIMARY} 
                        size={IS_MOBILE ? BUTTON_SIZES.SMALL : BUTTON_SIZES.STANDARD} 
                        className={styles.button_voted} 
                        onClick={onVote} 
                        title='Din röst' />
                        :
                        <Button 
                        variant={BUTTON_VARIANTS.TERTIARY} 
                        size={IS_MOBILE ? BUTTON_SIZES.SMALL : BUTTON_SIZES.STANDARD} 
                        onClick={onVote} 
                        title='Rösta' />
                    }
                    
                </div>
            )
        } else return null
        
    }

    const getCarousel = (e: IEntry) => {
        const images = e.entry_images as IEntryImage[]
        const featureStyle = {
            backgroundImage: `url(${assembleMediaUrl(e.avatar)})`
        }
        return (
            <Carousel
                interval={null} 
                nextIcon={<img src={arrow} className={styles.arrow_next} />}
                prevIcon={<img src={arrow} className={styles.arrow_prev} />}
                >
                <Carousel.Item>
                    <div className={styles.img_holder}>
                        <div className={styles.feature_img} style={featureStyle}></div>
                    </div>
                    <div className={styles.dot_container}></div>
                </Carousel.Item>
                {images.map((image:IEntryImage) => {
                    return (
                        <Carousel.Item key={image.image}>
                            <div className={styles.img_holder}>
                                <img className={styles.car_img} src={assembleMediaUrl(image.image)} alt={image.image} />
                            </div>
                            <div className={styles.dot_container}></div>
                        </Carousel.Item>
                    )
                })}
                {e.video_url !== '' && e.video_url !== null &&
                <Carousel.Item>
                    <div className={styles.img_holder}>
                        <VideoPlayer className={styles.video} videoUrl={e.video_url} />
                    </div>
                    <div className={styles.dot_container}></div>
                </Carousel.Item>
                }
            </Carousel>
        )
    }

    const displayCarousel = (e: IEntry) => {
        if (e.entry_images.length > 0) return true
        if (e.video_url !== '' && e.video_url !== null) return true
        return false
    }

    return (
        <div className={styles.container}>
        {onClose &&
            <div className={styles.close}>
                <CloseButton onClick={onClose} />
            </div>
        }
            <header className={styles.header}>
                <div>
                    <Text type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{entry.year}</Text>
                    <Text className={styles.category} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{categoryName}</Text>
                </div>
                {IS_MOBILE && getButtons()}
            </header>
            <section className={styles.section}>
                <div className={displayCarousel(entry) ? styles.car_container : styles.car_container_single}>
                    {displayCarousel(entry) ? getCarousel(entry) : <img src={assembleMediaUrl(entry.avatar)} className={styles.single_img} />}
                </div>
                <div className={styles.article_container}>
                    {/* {IS_MOBILE &&  */}
                    
                        {entry.is_winner_gold ? <img className={styles.crowns} src={gold} alt='Guldkrona'/> :
                        entry.is_winner_silver ? <img className={styles.crowns} src={silver} alt='Silverkrona'/> : null}
                    
                    {/* } */}
                    <article className={styles.article}>
                        <Text className={styles.title} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{entry.entry_name}</Text>
                        {entry.description !== '' && entry.description !== null &&
                        <div className={styles.contents}>
                            <P>{entry.description}</P>
                        </div>
                        }
                        <div className={styles.contents}>
                            <P><span className={styles.bold}>Byrå:</span> {entry.company}</P>
                        </div>
                        <div className={styles.contents}>
                        <P><span className={styles.bold}>Designer: </span>{entry.designer}</P>    
                        </div>
                        <div className={styles.contents}>
                        <P><span className={styles.bold}>Illustratör/fotograf: </span>{entry.illustrator}</P>   
                        </div>
                        <div className={styles.contents}>
                        <P><span className={styles.bold}>Projektledare: </span>{entry.leader}</P>   
                        </div>
                        <div className={styles.contents}>
                        <P><span className={styles.bold}>Kund: </span>{entry.customer}</P>   
                        </div>
                        {entry.motivation !== '' &&
                        <div className={styles.contents}>
                        <P><span className={styles.bold}>Motivering: </span>{entry.motivation}</P>   
                        </div>
                        }
                        {entry.source !== '' && entry.source !== null &&
                        <div className={styles.contents}>
                        {/* <P>{entry.motivation}</P> */}
                        <a href={assembleMediaUrl(entry.source)} target="_blank">Pdf-material</a>   
                        </div>
                        }
                        {entry.webpage !== '' && entry.webpage !== null &&
                        <div className={styles.contents}>
                        {/* <P>{entry.motivation}</P> */}
                        <a href={entry.webpage} target="_blank">{entry.webpage}</a>   
                        </div>
                        }       
                    </article>
                    {!IS_MOBILE && getButtons()}
                </div>
                
            </section>
            <hr></hr>
                <nav className={styles.nav}>
                    {prevEntry && 
                    <div className={styles.nav_button_container}>
                        <Label>Föregående bidrag</Label>
                        <Button 
                        variant={BUTTON_VARIANTS.NONE}
                        size={BUTTON_SIZES.NONE}
                        className={[styles.nav_button, styles.nav_button_left].join(' ')} 
                        onClick={() => onPrevNext(prevEntry)} 
                        title={prevEntry.entry_name} />
                    </div>}
                    {nextEntry && 
                    <div className={styles.nav_button_container_right}>
                        <Label>Nästa bidrag</Label>
                        <Button 
                        className={[styles.nav_button, styles.nav_button_right].join(' ')} 
                        variant={BUTTON_VARIANTS.NONE}
                        size={BUTTON_SIZES.NONE}
                        onClick={() => onPrevNext(nextEntry)} 
                        title={nextEntry.entry_name} />
                    </div>}
                </nav>
                
        </div>
    )
}

export default EntryDisplay
