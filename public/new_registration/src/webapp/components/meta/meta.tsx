import * as React from 'react'
import { Helmet } from 'react-helmet'
// import styles from './meta.module.css'

interface props {
    title?: string,
    description?: string,
    image?: string,
}

const Meta = ({title, description, image}:props) => {
    const getMeta = () => {
        return (
            <Helmet>
                <title>{title || "Svenska Designpriset"}</title>
                <meta name="description" content={description || "Svenska Designpriset"} />
                <meta property="og:title" content={title || "Svenska Designpriset"} />
                <meta property="og:description" content={description || "Svenska Designpriset"} />
                {/* WARNING: Vänta in design för standardbild */}
                <meta property="og:image" content={image} />
                <meta name="twitter:description" property="og:site_name" content="Svenska Designpriset" />
            </Helmet>
        )
    }
    return getMeta()
}

export default Meta
