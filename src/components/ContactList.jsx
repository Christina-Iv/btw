import React, { PropTypes } from 'react';
import ContactCard from './ContactCard.jsx';

const ContactList = (props) => {
    const { items, onContactDelete, onContactEdit } = props;

    const itemsView = items.map((item) =>
        <ContactCard key={item.id} item={item} onContactDelete={onContactDelete} onContactEdit={onContactEdit} />
    );
    return (
        <ul className="app-contact-list">
            { itemsView }
        </ul>
    );
};

ContactList .propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onContactDelete: PropTypes.func,
    onContactEdit: PropTypes.func,
};

export default ContactList;
