<template>
  <div>
    <h1 class="ui header">Words</h1>
    <table class="ui celled compact striped table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Spanish</th>
          <th class="center aligned">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, i) in words" :key="i">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.spanish }}</td>
          <td class="center aligned">
            <router-link
              :to="{ name: 'show', params: { id: word._id } }"
              class="ui mini teal button"
              style="margin-right: 5px;"
            >
              Show
            </router-link>
            <router-link
              :to="{ name: 'edit', params: { id: word._id } }"
              class="ui mini blue button"
              style="margin-right: 5px;"
            >
              Edit
            </router-link>
            <button
              class="ui mini red button"
              @click.prevent="onDestroy(word._id)"
            >
              Destroy
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: []
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      this.words = this.words.filter(word => word._id !== id);
    }
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>