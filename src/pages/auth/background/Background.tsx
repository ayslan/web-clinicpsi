import React, { FC } from 'react';
import styles from './Background.module.scss';

const Background: FC = ({ children }) => {

    return (
        <>
            <div className={styles['background']}>
                {children}
            </div>
        </>
    );
};

export default Background;
