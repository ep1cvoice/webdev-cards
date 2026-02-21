import styles from './Badge.module.css';

const Badge = ({ option, children }) => {
	
    switch (option) {
        case 'primary':
            return (
                <div className={`${styles.badge} ${styles.primary}`}>
                    {children}
                </div>
            );

        case 'success':
            return (
                <div className={`${styles.badge} ${styles.success}`}>
                    {children}
                </div>
            );

        case 'warning':
            return (
                <div className={`${styles.badge} ${styles.warning}`}>
                    {children}
                </div>
            );

        case 'alert':
            return (
                <div className={`${styles.badge} ${styles.alert}`}>
                    {children}
                </div>
            );
        case 'danger':
            return (
                <div className={`${styles.badge} ${styles.danger}`}>
                    {children}
                </div>
            );

        default:
            return (
                <div className={styles.badge}>
                    {children}
                </div>
            );
    }
    
};

export default Badge;
