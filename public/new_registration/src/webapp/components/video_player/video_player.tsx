import * as React from 'react'
import styles from './video_player.module.css'

interface props {
    videoUrl: string,
    className?: string
}

const VideoPlayer = ({videoUrl, className}:props) => {

    const extractId = (url: string) => {
        let checkedUrl = url
        if (url.substring(url.length-1) === '/') {
            checkedUrl = url.substring(0, url.length-1);
        }
        const id = checkedUrl.substring(checkedUrl.lastIndexOf('/') + 1)
        return id.substring(id.lastIndexOf('=') + 1)
    }

    const getIframe = (url: string, isVimeo?:boolean) => {
        return (
            <div className={styles.container}>
                <div className={styles.sub_container}>
                    <iframe src={url} className={styles.vimeo_iframe} allow="autoplay; fullscreen"></iframe>
                </div>
                {isVimeo &&
                <script src="https://player.vimeo.com/api/player.js"></script>
                }
            </div>
        )
    }

    const getVideo = () => {
        const vimeoReg = /\b(\w*vimeo\w*)\b/
        const vimeoCheck = videoUrl.match(vimeoReg)
        const isVimeo = vimeoCheck && vimeoCheck.length > 0

        if (isVimeo) {
            return getIframe(`https://player.vimeo.com/video/${extractId(videoUrl)}`, true)
        }
        const youtubeReg = /\b(\w*youtube\w*)\b/
        const youtubeCheck = videoUrl.match(youtubeReg)
        const isYoutube = youtubeCheck && youtubeCheck.length > 0
        
        if (isYoutube) {
            return getIframe(`https://www.youtube.com/embed/${extractId(videoUrl)}`)
        }
        return null
    }

    return (
        <div className={className}>
            {getVideo()}
        </div>
    )
}

export default VideoPlayer
