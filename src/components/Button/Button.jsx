import styles from './Button.module.css';

const Button = ({ onClick, children, isActive, isDisabled, isNeutral }) => {
	return (
		<button
			className={`${styles.button} ${isActive ? styles.active : ''} ${isNeutral ? styles.neutral : ''}`}
			onClick={onClick}
			disabled={isDisabled}>
			{children}
		</button>
	);
};

export default Button;
