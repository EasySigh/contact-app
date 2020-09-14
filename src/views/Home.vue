<template>
  <main class="container">
    <form @submit.prevent="addContact" ref="form">
      <input type="text" placeholder="Name*" name="Name" required>
      <input type="number" placeholder="Phone number" name="Phone" required>
      <input type="email" placeholder="Email" name="Email" required>

      <button type="submit">Save</button>
    </form>

    <Contact v-for="contact in contacts" :key="contact.id" :contactData="contact"></Contact>
    <div ref="bottom"></div>
  </main>
</template>

<script>
import Contact from "@/components/Contact";
export default {
  name: 'Home',
  components: {
    Contact
  },
  computed: {
    contacts() {
      return this.$store.getters.getContacts;
    }
  },
  methods: {
    addContact() {
      const newContact = {};
      Object.values(this.$refs.form).forEach((el, idx) => {
        if (el.localName === 'input') {
          newContact[idx] = {
            field: el.name,
            value: el.value
          }
        }
      })
      this.$store.dispatch('addContact', newContact);
      // Scroll to bottom, to show new contact
      this.$refs.bottom.scrollIntoView();
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    input {
      margin-bottom: 15px;
    }
  }
</style>
