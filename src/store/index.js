import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    SAVE_CONTACTS(state, data) {
      state.contacts = data;
    },
    SAVE_TO_LS(state) {
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
  },
  actions: {
    getContacts({ commit }, url) {
      const savedData = localStorage.getItem('contacts');

      // Check if LocalStorage is empty
      if (!savedData || savedData === '[]') {
        // Get contacts from JSON Placeholder
        fetch(url)
          .then(response => response.json())
          // Save only 4 fields from JSON-Placeholder
            // and convert them into working view.
          .then(json => {
            json = json.map(({id, name = '', phone = '', email = ''}) => {
              return {
                id,
                0: {
                  field: 'Name',
                  value: name
                },
                1: {
                  field: 'Phone',
                  value: phone
                },
                2: {
                  field: 'Email',
                  value: email
                }
              }
            })
            commit('SAVE_CONTACTS', json)
            commit('SAVE_TO_LS', json)
          })
      } else {
        // Save contacts from LocalStorage
        commit('SAVE_CONTACTS', JSON.parse(savedData));
      }
    },
    addContact(context, newContact) {
      // In this case the last contact always will have biggest id
      // so I just increment id of the last one.
      const allContacts = context.getters.getContacts;
      newContact.id = allContacts[allContacts.length - 1].id + 1;

      allContacts.push(newContact);
      context.commit('SAVE_CONTACTS', allContacts);
      context.commit('SAVE_TO_LS');
    },
    removeContact(context, id) {
      const allContacts = context.getters.getContacts;
      allContacts.splice(allContacts.findIndex(contact => contact.id === id), 1);

      context.commit('SAVE_CONTACTS', allContacts);
      context.commit('SAVE_TO_LS');
    },
    editContact(context, newContact) {
      const allContacts = context.getters.getContacts;
      // Find this contact and overwrite him with new one.
      allContacts[allContacts.findIndex(oldContact => oldContact.id === newContact.id)] = newContact;

      context.commit('SAVE_CONTACTS', allContacts);
      context.commit('SAVE_TO_LS');
    }
  },
  getters: {
    getContacts(state) {
      return state.contacts;
    }
  }
})
