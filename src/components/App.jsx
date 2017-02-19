import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ContactCard from './ContactCard.jsx';
import ContactList from './ContactList.jsx';
import SearchPanel from './SearchPanel.jsx';

require('../scss/app.scss');

class App extends Component {
    constructor(props) {
        super(props);

        this.handleContactCreate = this.handleContactCreate.bind(this);
        this.handleContactEdit = this.handleContactEdit.bind(this);
        this.handleContactSave = this.handleContactSave.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            name: '',
            email: '',
            phone: '',
            address: '',
            contacts: (localStorage.getItem("contacts")) ? JSON.parse(localStorage.getItem("contacts")) : [], //TRY
            filter: '',
            mode: 'create',
            isCreating: false,
        };
    }

    handleContactCreate() {
        this.setState({
            isCreating: !this.state.isCreating
        });
    }

    handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        this.setState({
            filter: e.target.value
        });
    }

    handleContactSave(){
        const { name, email, phone, address } = this.state;
        if (name.length || email.length || phone.length || address.length) {
            let newContact = {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                address: address
            };
            let contacts = this.state.contacts;
            contacts.push(newContact)

            localStorage.setItem("contacts", JSON.stringify(contacts));

            this.setState({
                contacts: contacts,
                name: '',
                email: '',
                phone: '',
                address: '',
            });
        }
        this.setState({
            isCreating: false
        });
    }

    handleContactDelete(id){
        if (confirm("Вы точно хотите удалить запись?")) {
            let contacts = this.state.contacts.filter((el, index) => el.id != id);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            this.setState({
                contacts: contacts
            });
        }
    }

    handleContactEdit(e, id){
        if(id == 0){
            this.setState({
                [e.target.name]: e.target.value
            });
        }else{
            let contacts = this.state.contacts;
            contacts.forEach((item) => {
                if(item.id == id){
                    item[e.target.name] = e.target.value;
                }
            });
            localStorage.setItem("contacts", JSON.stringify(contacts));
            this.setState({
                contacts: contacts
            });
        }
    }

    render() {
        const { name, email, phone, address, isCreating, contacts, displayedContacts, filter } = this.state;

        var items = contacts.filter(item => {
            let searchString = item.name.toLowerCase() + item.email.toLowerCase() + item.phone.toLowerCase() + item.address.toLowerCase() ;
            return searchString.indexOf(filter) !== -1;
        });

        return (
            <div className="app">
                <div className="app__title">Адресная книга</div>
                <div
                    className="app__button"
                    onClick={this.handleContactCreate} >
                    Создать контакт
                </div>
                {
                    isCreating
                    ?
                    <div className="app-contact-list">
                        <ContactCard
                            item={{
                                id: 0,
                                name: name,
                                phone: phone,
                                address: address,
                                email: email
                            }}
                            onContactEdit={this.handleContactEdit}
                            onContactSave={this.handleContactSave} />
                    </div>
                    :
                    null
                }
                <SearchPanel onChange={this.handleSearch} filter={this.state.filter} />
                <ContactList items={items} onContactDelete={this.handleContactDelete} onContactEdit={this.handleContactEdit}/>

            </div>
    );
    }
}

render(<App />, document.getElementById('app'));
