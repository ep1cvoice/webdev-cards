import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STORAGE } from '../../constants';

import Button from '../Button';

import htmlLogo from '../../assets/HTML5.png';
import cssLogo from '../../assets/CSS3.png';
import JSLogo from '../../assets/javascript-logo.svg';
import ReactLogo from '../../assets/react.svg';
import AngularLogo from '../../assets/angular-logo.svg';
import VueLogo from '../../assets/vue-logo.png';
import NodeJSLogo from '../../assets/nodejs-icon.svg';
import NextJSLogo from '../../assets/nextjs-icon.svg';
import TagLogo from '../../assets/html-tag.svg?react';

import { Plus, LogIn } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
	const navigate = useNavigate();
	const { isAuth, setIsAuth } = useAuth();

	console.log('isAuth', isAuth);

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const goToTechnology = (tech) => {
		navigate(`/?technology=${tech}`);
		setIsOpen(false);
	};

	const [searchParams] = useSearchParams();
	const activeTechnology = searchParams.get('technology');

	const loginHandler = () => {
		localStorage.setItem(AUTH_STORAGE, !isAuth)
		setIsAuth(!isAuth);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.burger} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div className={styles.techIcons}>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'html' ? styles.active : ''}`}
						onClick={() => goToTechnology('html')}>
						<img className={styles.headerIcon} src={htmlLogo} alt='html logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'css' ? styles.active : ''}`}
						onClick={() => goToTechnology('css')}>
						<img className={styles.headerIcon} src={cssLogo} alt='css logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'javascript' ? styles.active : ''}`}
						onClick={() => goToTechnology('javascript')}>
						<img className={styles.headerIcon} src={JSLogo} alt='JS logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'react' ? styles.active : ''}`}
						onClick={() => goToTechnology('react')}>
						<img className={styles.headerIcon} src={ReactLogo} alt='React logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'angular' ? styles.active : ''}`}
						onClick={() => goToTechnology('angular')}>
						<img className={styles.headerIcon} src={AngularLogo} alt='Angular logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'vue' ? styles.active : ''}`}
						onClick={() => goToTechnology('vue')}>
						<img className={styles.headerIcon} src={VueLogo} alt='Vue logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'node' ? styles.active : ''}`}
						onClick={() => goToTechnology('node')}>
						<img className={styles.headerIcon} src={NodeJSLogo} alt='Node.js logo' />
					</button>
					<button
						className={`${styles.headerButton} ${activeTechnology === 'next' ? styles.active : ''}`}
						onClick={() => goToTechnology('next')}>
						<img className={styles.headerIcon} src={NextJSLogo} alt='Next.js logo' />
					</button>
				</div>

				<div className={styles.rightSide}>
					<div className={styles.brand} onClick={() => navigate('/')}>
						<TagLogo className={`${styles.headerIcon} ${styles.tagIcon}`} />
						<span>WebDev Cards</span>
					</div>

					<div className={styles.headerButtons}>
						{isAuth ? (
							<Button onClick={() => navigate('/addquestion')} isDisabled={false} isNeutral={true}>
								<Plus size={18} /> Add New Card{' '}
							</Button>
						) : (
							''
						)}
						<Button onClick={loginHandler} isActive={!isAuth}>
							<LogIn size={18} i />
							{isAuth ? 'Log Out' : 'Log In'}
						</Button>
					</div>
				</div>
			</header>

			{isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

			<div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
				<h3>Technologies</h3>

				<div className={styles.menuItem} onClick={() => goToTechnology('html')}>
					<img src={htmlLogo} alt='html' />
					<span>HTML</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('css')}>
					<img src={cssLogo} alt='css' />
					<span>CSS</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('javascript')}>
					<img src={JSLogo} alt='JS' />
					<span>JavaScript</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('react')}>
					<img src={ReactLogo} alt='React' />
					<span>React</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('angular')}>
					<img src={AngularLogo} alt='Angular' />
					<span>Angular</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('vue')}>
					<img src={VueLogo} alt='Vue' />
					<span>Vue</span>
				</div>

				<div className={styles.menuItem} onClick={() => goToTechnology('node')}>
					<img src={NodeJSLogo} alt='Node.js' />
					<span>Node.js</span>
				</div>
				<div className={styles.menuItem} onClick={() => goToTechnology('next')}>
					<img src={NextJSLogo} alt='Next.js' />
					<span>Next.js</span>
				</div>

				{isAuth ? (
					<Button onClick={() => navigate('/addquestion')} isNeutral={true} isDisabled={false}>
						<Plus size={16} /> Add New Card{' '}
					</Button>
				) : (
					''
				)}
				<Button onClick={loginHandler} isActive={!isAuth}>
					<LogIn size={16} />
					{isAuth ? 'Log Out' : 'Log In'}
				</Button>
			</div>
		</>
	);
};

export default Header;
