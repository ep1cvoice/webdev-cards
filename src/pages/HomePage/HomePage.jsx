import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import SearchInput from '../../components/SearchInput';

import styles from './HomePage.module.css';

const HomePage = () => {
	const [questions, setQuestions] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [sortSelectValue, setSortSelectValue] = useState('');
	const [filterSelectValue, setFilterSelectValue] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const getLimit = () => {
		if (window.innerWidth >= 1500) return 10;
		if (window.innerWidth >= 768) return 8;
		return 5;
	};
	const [limit, setLimit] = useState(getLimit());

	const [getQuestions, isLoading, error] = useFetch(async (url) => {
		const response = await fetch(`${API_URL}/${url}`);

		const total = response.headers.get('X-Total-Count');
		const data = await response.json();

		setQuestions(data);

		if (total) {
			setTotalPages(Math.ceil(total / limit));
		}

		return data;
	});

	useEffect(() => {
		const params = [];

		if (searchValue.trim()) {
			params.push(`q=${searchValue.trim()}`);
		}

		if (filterSelectValue) {
			params.push(`category=${filterSelectValue}`);
		}

		if (sortSelectValue) {
			const isDesc = sortSelectValue.startsWith('-');
			const field = sortSelectValue.replace('-', '');

			params.push(`_sort=${field}`);
			params.push(`_order=${isDesc ? 'desc' : 'asc'}`);
		}

		params.push(`_page=${page}`);
		params.push(`_limit=${limit}`);

		const queryString = `?${params.join('&')}`;

		getQuestions(`checkycards${queryString}`);
	}, [searchValue, filterSelectValue, sortSelectValue, page, limit]);

	useEffect(() => {
		setPage(1);
	}, [searchValue, filterSelectValue, sortSelectValue, limit]);

	const onSearchChangeHandler = (e) => {
		setSearchValue(e.target.value);
	};

	const onSortSelectChangeHandler = (e) => {
		setSortSelectValue(e.target.value);
	};
	const onFilterSelectChangeHandler = (e) => {
		setFilterSelectValue(e.target.value);
	};

	useEffect(() => {
		const handleResize = () => {
			setLimit(getLimit());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<div className={styles.controlsContainer}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />

				<div className={styles.selectGroup}>
					<select value={filterSelectValue} onChange={onFilterSelectChangeHandler} className={styles.select}>
						<option value=''>technology</option>
						<option value='js'>Vanilla JS</option>
						<option value='react'>React</option>
						<option value='angular'>Angular</option>
						<option value='vue'>Vue</option>
						<option value='node'>Node.js</option>
						<option value='next'>Next.js</option>
					</select>
					<select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={styles.select}>
						<option value=''>sort by</option>
						<option value='level'>LVL asc</option>
						<option value='-level'>LVL desc</option>
						<option value='completed'>completed asc</option>
						<option value='-completed'>not completed desc</option>
					</select>
				</div>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			{!isLoading && questions.length === 0 && (
				<div className={styles.noCardsWrapper}>
					<div className={styles.noCards}>
						<div className={styles.icon}>🔍</div>
						<h3>No results found</h3>
						<p>Try adjusting your search phrase.</p>
					</div>
				</div>
			)}

			<QuestionCardList cards={questions} />

			<div className={styles.pagination}>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i}
						onClick={() => setPage(i + 1)}
						className={`${styles.pageButton} ${page === i + 1 ? styles.active : ''}`}>
						{i + 1}
					</button>
				))}
			</div>
		</>
	);
};

export default HomePage;
