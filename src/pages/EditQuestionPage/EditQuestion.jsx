import { useActionState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { X } from 'lucide-react';
import { API_URL } from '../../constants';

import styles from './EditQuestionPage.module.css';

const updateCardFetch = async (id, data) => {
	const response = await fetch(`${API_URL}/checkycards/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return await response.json();
};

const editCardAction = async (_prevState, formData) => {
	try {
		const newQuestion = Object.fromEntries(formData);
		const resources = newQuestion.resources.trim();
		const isClearForm = newQuestion.clearForm === 'on';
		const questionId = newQuestion.id;

		const question = await updateCardFetch(questionId, {
			question: newQuestion.question.trim(),
			category: newQuestion.category.trim(),
			level: Number(newQuestion.level),
			answer: newQuestion.answer.trim(),
			description: newQuestion.description.trim(),
			resources: newQuestion.resources.length
				? resources.split(',').map((r) => r.trim())
				: [],
			editDate: dateFormat(new Date()),
		});

		return isClearForm ? { clearForm: true } : { ...question, clearForm: false };
	} catch (err) {
		console.log(err.message);
		return { clearForm: false };
	}
};

const EditQuestion = ({ initialState = {} }) => {
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);

	const [formState, formAction] = useActionState(editCardAction, {
		...initialState,
		clearForm: false,
	});

	useEffect(() => {
		if (submitted && formState?.id) {
			navigate(`/question/${formState.id}`);
		}
	}, [submitted, formState, navigate]);

	const handleSubmit = (e) => {
		setSubmitted(true);
		formAction(e);
	};

	const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
		await fetch(`${API_URL}/checkycards/${initialState.id}`, {
			method: 'DELETE',
		});

		navigate('/');
	});

	return (
		<>
			<h1 className={styles.formTitle}>Edit card</h1>

			<div className={styles.formContainer}>
				<QuestionForm
					formAction={handleSubmit}
					formState={formState}
					submitBtnText="Edit Card"
				/>

				<button
					className={styles.deleteBtn}
					onClick={removeQuestion}
					disabled={isQuestionRemoving}
				>
					<X />
				</button>
			</div>
		</>
	);
};

export default EditQuestion;