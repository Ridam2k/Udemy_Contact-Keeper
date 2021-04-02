import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const { filterContacts, clearFilter, filtered } = contactContext;
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) {
			//Once clearFilter sets filtered null, this removes text from search bar
			text.current = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilter(); //Sets filtered as null
		}
	};

	return (
		<div>
			<form>
				<input type='text' placeholder='Search contacts' onChange={onChange} />
			</form>
		</div>
	);
};

export default ContactFilter;
