import React, { Component, PropTypes } from 'react';

const ContactCard = (props) => {
    const { item, onContactEdit, onContactSave, onContactDelete } = props;

    const createButton = (item.id == 0) ? ( <div className="app__button app__button_save" onClick={onContactSave} tabIndex="7"> Сохранить </div> ) : null;
    const closeIcon = (item.id != 0) ? ( <div className="contact-card__close" onClick={ (e) => onContactDelete(item.id) }/> ) : null;

    return (
        <div className="contact-card">
            {closeIcon}
            <div className="contact-card-left">
                <input
                    className="contact-card__input"
                    placeholder="ФИО"
                    type="text"
                    value={item.name}
                    name='name'
                    onChange={ (e) => onContactEdit(e, item.id)} />
                <input
                    className="contact-card__input"
                    placeholder="E-mail"
                    type="email"
                    value={item.email}
                    name='email'
                    onChange={ (e) => onContactEdit(e, item.id)} />
                <input
                    className="contact-card__input"
                    placeholder="Телефон"
                    type="tel"
                    name='phone'
                    onChange={ (e) => onContactEdit(e, item.id)} />
            </div>
                <textarea
                    className="contact-card__input contact-card__input_large"
                    placeholder="Адрес"
                    type="text"
                    value={item.address}
                    name='address'
                    onChange={ (e) => onContactEdit(e, item.id)} />
            {createButton}
        </div>
    );
  };

ContactCard.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onInputChange: PropTypes.func,
    onDeleteContact: PropTypes.func,
    onSaveContact: PropTypes.func,
};

export default ContactCard;
