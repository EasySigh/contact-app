<template>
  <main>
    <h1 class="page-title">Contact</h1>
    <form @submit.prevent="saveResult" class="form">
      <div
        class="form-row"
        v-for="([prop, value], idx) in Object.entries(contact)"
        :key="idx"
        v-if="prop !== 'id'"
      >
        <div class="form-group">
          <input
            type="text"
            :value="value.field"
            @input="changeContact($event, prop, 'field')"
            placeholder="Field Name">
          <button
            type="button"
            title="Cancel"
            class="cancel-btn"
            v-if="showCancelBtn(prop, 'field', value.field)"
            @click="cancelAction(prop, 'field')"
          >🚫</button>
        </div>
        
        <div class="decorative">:</div>
        
        <div class="form-group">
          <input
            type="text"
            :value="value.value"
            @input="changeContact($event, prop, 'value')"
            placeholder="Field Value">
          <button
            type="button"
            title="Cancel"
            class="cancel-btn"
            v-if="showCancelBtn(prop, 'value', value.value)"
            @click="cancelAction(prop, 'value')"
          >🚫</button>
        </div>

        <button type="button" class="remove-btn" @click="removeField(prop)">✕</button>
      </div>
      
      <div class="row">
        <div>
          <button type="button" @click="back" v-if="backBtn" class="back-btn">↶ Back</button>
        </div>
  
        <div>
          <button type="button" @click="addField" class="add-btn">
            <i>Add new field</i>
            <span>＋</span>
          </button>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  </main>
</template>

<script>
  export default {
    name: 'ContactInfo',
    data() {
      return {
        // Here I save form states.
        history: [],
        // Get contact from VueX or LocalStorage with this id.
        contact: this.$store.state.contacts.find(contact => contact.id === +this.$route.params.id),
        // backBtn controls display of "↶ Back" button.
        backBtn: false
      }
    },
    methods: {
      changeContact(event, prop, fieldName) {
        // Save previous state of the form
        this.saveStep(JSON.stringify(this.contact));
        // Verify if "Cancel" button should be displayed.
        this.showCancelBtn(prop, fieldName, event.target.value);
        // Change this contact
        this.contact[prop][fieldName] = event.target.value;
      },
      addField() {
        // I used JSON.stringify to convert Observer to normal Object.
        this.saveStep(JSON.stringify(this.contact));
        
        // Generate new key for new form field
        const newKey = Math.max(...Object.keys(this.contact).filter(key => isFinite(key))) + 1;
        const copy = this.contact;
        copy[newKey] = {field: '', value: ''};
        
        // I need an extra variable "copy" and to use Object.assign()
        // to force "this.contact" re-render when new field (obj prop) is added.
        this.contact = Object.assign({}, copy);
      },
      saveStep(step) {
        // Save previous state of form in "this.history" array.
        // Save only last 10 states.
        this.history.push(JSON.parse(step));
        if (this.history.length > 10) this.history.shift();
        this.backBtn = true;
      },
      back() {
        if (this.history.length) {
          this.contact = this.history[this.history.length - 1];
          this.history.splice(-1, 1);
          // Check if "Back" button should be displayed.
          this.backBtn = Boolean(this.history.length);
        }
      },
      cancelAction(prop, field) {
        if(confirm('Are you sure?')) {
          const sourceContactData = JSON.parse(localStorage.getItem('contacts'))
            .find(contact => contact.id === +this.$route.params.id);
          // Return original (last saved) value of this field.
          this.contact[prop][field] = sourceContactData[prop][field];
        }
      },
      removeField(prop) {
        if(Object.keys(this.contact).length > 2) {
          if (confirm('Are you sure?')) {
            this.$delete(this.contact, prop);
          }
        } else {
          alert("You can't delete last field. You can remove this contact from Home page.")
        }
      },
      saveResult() {
        this.$store.dispatch('editContact', this.contact);
        this.backBtn = false;
        this.history.length = 0;
        alert('Changes are saved!');
      },
      showCancelBtn(prop, fieldName, value) {
        // Get this contact from LS.
        const sourceContactData = JSON.parse(localStorage.getItem('contacts'))
          .find(contact => contact.id === +this.$route.params.id);
        // Check if this field (obj prop) exist in original (last saved) Object
        if (sourceContactData[prop]) {
          // Display "Cancel" button if this field is different of saved one.
          return sourceContactData[prop][fieldName] !== value;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-title {
    text-align: center;
    margin: 30px 0;
    font-weight: 400;
  }
  .row {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
  }
  .form {
    &-row {
      display: flex;
      padding: 5px 10px;
      justify-content: space-between;
      transition: .2s all;
      &:hover {
        background-color: lighten(#212121, 2%);
      }
    }
    &-group {
      flex: 0 0 40%;
      position: relative;
      input {
        padding-right: 30px;
      }
    }
    .decorative {
      display: flex;
      align-items: center;
    }
  }

  .add-btn {
    line-height: 1.1;
    padding: 10px 12px;
    span {
      color: #0ab834;
      font-size: 25px;
      font-weight: bold;
      margin-left: 10px;
    }
    transition: .2s all;
    &:hover {
      background-color: lighten(#212121, 5%);
    }
  }
  .cancel-btn {
    position: absolute;
    top: 8px;
    right: 0;
  }
  .back-btn {
    padding: 10px 12px;
    transition: .2s all;
    &:hover {
      background-color: lighten(#212121, 5%);
    }
  }
</style>
