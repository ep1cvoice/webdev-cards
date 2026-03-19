import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Header from '../Header/Header';
import HKLogo from '../../assets/hollow_knight-logo.png'

const MainLayout = () => {
	const currentDate = new Date();
	let year = currentDate.getFullYear();

	return (
		<div className={styles.mainLayout}>
			<Header className = {styles.header} />
			<div className={styles.mainWrapper}>
				<main className={styles.main}>
					<Outlet />
				</main>
				<footer className={styles.footer}>
					WebDev Cards {year} by ep1cvoice
					<img className={styles.hollowKnightIcon} src={HKLogo} alt='Hollow Knight Logo' />
				</footer>
			</div>
		</div>
	);
};

export default MainLayout;
