import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Header from '../Header/Header';

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
					WebDev Cards {} {year} by ep1cvoice
				</footer>
			</div>
		</div>
	);
};

export default MainLayout;
