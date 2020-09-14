<template>
  <section class="contact-card">
    <div class="avatar">
      <router-link :to="`/contact/${contactData.id}`" :style="`background-color: ${generateColor()}`">
        {{ contactData[0] && contactData[0].value ? contactData[0].value[0] : 'U' }}
      </router-link>
    </div>
    <div class="contact-data">
      <router-link :to="`/contact/${contactData.id}`">
        <p>
          <i>{{ contactData[0].field ? contactData[0].field+': ' : 'Field: ' }}</i>
          {{ contactData[0].value ? contactData[0].value : 'Unknown' }}
        </p>
        <p>
          <i>{{ contactData[1] ? contactData[1].field+': ' : 'Field: ' }}</i>
          {{ contactData[1] ? contactData[1].value : 'Unknown' }}
        </p>
        <p>
          <i>{{ contactData[2] ? contactData[2].field+': ' : 'Field: ' }}</i>
          {{ contactData[2] ? contactData[2].value : 'Unknown' }}
        </p>
      </router-link>
    </div>
    <aside class="actions">
      <button @click="removeContact(contactData.id)" class="remove-btn">✕</button>
    </aside>
  </section>
</template>

<script>
  export default {
    name: "Contact",
    props: {
      contactData: {
        type: Object,
        default: {}
      }
    },
    methods: {
      removeContact(id) {
        if (confirm('Are you sure?')) {
          this.$store.dispatch('removeContact', id);
        }
      },
      generateColor() {
        // This function was added just for UI.
        // and doesnt affect on project functionality.
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    }
  }
</script>
