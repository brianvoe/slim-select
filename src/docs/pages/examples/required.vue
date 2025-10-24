<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Required',
  data() {
    return {
      country: null as SlimSelect | null,
      interests: null as SlimSelect | null,
      priority: null as SlimSelect | null,
      message: ''
    }
  },
  mounted() {
    this.country = new SlimSelect({
      select: this.$refs.country as HTMLSelectElement
    })
    this.interests = new SlimSelect({
      select: this.$refs.interests as HTMLSelectElement
    })
    this.priority = new SlimSelect({
      select: this.$refs.priority as HTMLSelectElement
    })
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault()
      const form = e.target as HTMLFormElement

      if (form.checkValidity()) {
        const formData = {
          country: this.country!.getSelected()[0],
          interests: this.interests!.getSelected(),
          priority: this.priority!.getSelected()[0]
        }
        this.message = `✅ Form is valid! Submitted data:\n${JSON.stringify(formData, null, 2)}`
      } else {
        this.message = '❌ Please fill in all required fields'
      }
    }
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
#required {
  .required-form {
    max-width: 500px;
    margin-bottom: var(--spacing);
  }

  .form-group {
    margin-bottom: var(--spacing);

    label {
      display: block;
      margin-bottom: var(--spacing-half);
      font-weight: 600;
    }
  }
}
</style>

<template>
  <div id="required" class="content">
    <h2 class="header">Required Attribute</h2>
    <p>
      This example demonstrates HTML5 form validation with SlimSelect using the <code>required</code> attribute. The
      form will prevent submission if required fields are empty, and SlimSelect seamlessly integrates with native
      browser validation to provide a consistent user experience.
    </p>

    <form class="required-form" @submit="onSubmit">
      <div class="form-group">
        <label for="country-select">Country *</label>
        <select id="country-select" ref="country" name="country" required>
          <option value="">Select a country</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
          <option value="australia">Australia</option>
          <option value="germany">Germany</option>
        </select>
      </div>

      <div class="form-group">
        <label for="interests-select">Interests * (Multiple)</label>
        <select id="interests-select" ref="interests" name="interests" multiple required>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="technology">Technology</option>
          <option value="travel">Travel</option>
          <option value="reading">Reading</option>
          <option value="art">Art</option>
        </select>
      </div>

      <div class="form-group">
        <label for="priority-select">Priority *</label>
        <select id="priority-select" ref="priority" name="priority" required>
          <option value="">Select priority level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <button type="submit" class="button">Submit Form</button>

      <div v-if="message" :class="['message', message.includes('✅') ? 'success' : 'error']">
        <pre>{{ message }}</pre>
      </div>
    </form>

    <h3>HTML</h3>
    <ShikiStyle language="html">
      <pre>
        &lt;form id="form"&gt;
          &lt;label for="country"&gt;Country *&lt;/label&gt;
          &lt;select id="country" name="country" required&gt;
            &lt;option value=""&gt;Select a country&lt;/option&gt;
            &lt;option value="usa"&gt;United States&lt;/option&gt;
            &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
          &lt;/select&gt;

          &lt;label for="interests"&gt;Interests *&lt;/label&gt;
          &lt;select id="interests" name="interests" multiple required&gt;
            &lt;option value="sports"&gt;Sports&lt;/option&gt;
            &lt;option value="music"&gt;Music&lt;/option&gt;
            &lt;option value="technology"&gt;Technology&lt;/option&gt;
          &lt;/select&gt;

          &lt;button type="submit"&gt;Submit Form&lt;/button&gt;
        &lt;/form&gt;
      </pre>
    </ShikiStyle>

    <h3>Javascript</h3>
    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#country'
        })

        new SlimSelect({
          select: '#interests'
        })

        // Browser will automatically prevent form submission
        // if required fields are not filled
        document.querySelector('#form').addEventListener('submit', (e) => {
          e.preventDefault()

          if (e.target.checkValidity()) {
            console.log('Form is valid!')
            // Submit form data
          } else {
            console.log('Form is invalid - required fields not filled')
          }
        })
      </pre>
    </ShikiStyle>

    <div class="alert">
      <p>
        <strong>How it works:</strong> SlimSelect visually hides the original select element but keeps it focusable for
        native HTML5 validation. This means:
      </p>
      <ul>
        <li>✅ The <code>required</code> attribute works correctly</li>
        <li>✅ Browser validation messages appear</li>
        <li>✅ <code>form.checkValidity()</code> works as expected</li>
        <li>✅ No console errors about unfocusable elements</li>
      </ul>
    </div>
  </div>
</template>
