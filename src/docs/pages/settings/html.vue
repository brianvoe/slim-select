<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

const statusData = [
  {
    value: 'open',
    text: 'Open',
    html: '<span class="html-demo-status html-demo-status--open"></span> Open'
  },
  {
    value: 'progress',
    text: 'In progress',
    html: '<span class="html-demo-status html-demo-status--progress"></span> In progress'
  },
  {
    value: 'blocked',
    text: 'Blocked',
    html: '<span class="html-demo-status html-demo-status--blocked"></span> Blocked'
  },
  {
    value: 'done',
    text: 'Done',
    html: '<span class="html-demo-status html-demo-status--done"></span> Done'
  }
]

const teamData = [
  {
    value: 'ada',
    text: 'Ada Lovelace',
    html: '<span class="html-demo-avatar">AL</span> Ada Lovelace · Engineering'
  },
  {
    value: 'grace',
    text: 'Grace Hopper',
    html: '<span class="html-demo-avatar">GH</span> Grace Hopper · Platform'
  },
  {
    value: 'katherine',
    text: 'Katherine Johnson',
    html: '<span class="html-demo-avatar">KJ</span> Katherine Johnson · Research'
  },
  {
    value: 'margaret',
    text: 'Margaret Hamilton',
    html: '<span class="html-demo-avatar">MH</span> Margaret Hamilton · Flight'
  }
]

export default defineComponent({
  name: 'Html',
  components: {
    HighlightStyle
  },
  data() {
    return {
      instances: [] as SlimSelect[]
    }
  },
  mounted() {
    this.instances = [
      new SlimSelect({
        select: this.$refs.statusSingle as HTMLSelectElement,
        data: statusData
      }),
      new SlimSelect({
        select: this.$refs.teamMulti as HTMLSelectElement,
        settings: {
          closeOnSelect: false
        },
        data: teamData
      }),
      new SlimSelect({
        select: this.$refs.nativeHtml as HTMLSelectElement
      })
    ]
  },
  unmounted() {
    this.instances.forEach((instance) => instance.destroy())
    this.instances = []
  }
})
</script>

<style lang="scss">
.html-demo-status {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  border-radius: 50%;
  vertical-align: middle;
}

.html-demo-status--open {
  background: #27ae60;
}

.html-demo-status--progress {
  background: #f39c12;
}

.html-demo-status--blocked {
  background: #e74c3c;
}

.html-demo-status--done {
  background: #5897fb;
}

.html-demo-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-right: 8px;
  border-radius: 50%;
  background: #5897fb;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  vertical-align: middle;
}

#html {
  .hint {
    margin: 0 0 var(--spacing-quarter);
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.85;
  }

  .html-quick-ref {
    display: grid;
    grid-template-columns: minmax(5rem, auto) 1fr;
    gap: var(--spacing-quarter) var(--spacing-half);
    margin: 0 0 var(--spacing);
    font-size: var(--font-size);

    dt {
      margin: 0;
      font-weight: bold;
    }

    dd {
      margin: 0;
    }

    code {
      white-space: normal;
      overflow-wrap: anywhere;
    }

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .html-demo {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    margin-bottom: var(--spacing);

    label {
      font-weight: bold;
      font-size: var(--font-size);
    }

    select,
    .ss-main {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>

<template>
  <div id="html" class="content">
    <h2 class="header">html</h2>
    <p>
      Use the <code>html</code> field to render rich markup in the option list — status dots, avatars, icons, or inline
      formatting. Always pair it with <code>text</code> for search, accessibility, and multi-select value pills.
    </p>

    <dl class="html-quick-ref">
      <dt>html</dt>
      <dd>Markup shown in the dropdown; single-select also uses it for the closed value</dd>
      <dt>text</dt>
      <dd>Plain label used for search and multi-select tags (pills always show <code>text</code>)</dd>
      <dt>data-html</dt>
      <dd>Set <code>html</code> on native <code>&lt;option&gt;</code> elements without JavaScript data</dd>
    </dl>

    <h3>Issue status (single select)</h3>
    <p class="hint">
      Colored indicators in the list and in the closed control. Search still matches the plain <code>text</code> value.
    </p>
    <div class="html-demo">
      <label for="html-status">Status</label>
      <select id="html-status" ref="statusSingle">
        <option data-placeholder="true"></option>
      </select>
    </div>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#status',
          data: [
            {
              value: 'open',
              text: 'Open',
              html: '&lt;span class="status-dot open"&gt;&lt;/span&gt; Open'
            },
            {
              value: 'progress',
              text: 'In progress',
              html: '&lt;span class="status-dot progress"&gt;&lt;/span&gt; In progress'
            }
          ]
        })
      </pre>
    </HighlightStyle>

    <h3>Assign reviewers (multi select)</h3>
    <p class="hint">
      Avatars and roles in the dropdown; selected pills show names only. Open the list to see the HTML layout.
    </p>
    <div class="html-demo">
      <label for="html-team">Reviewers</label>
      <select id="html-team" ref="teamMulti" multiple>
        <option data-placeholder="true"></option>
      </select>
    </div>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#team',
          settings: { closeOnSelect: false },
          data: [
            {
              value: 'ada',
              text: 'Ada Lovelace',
              html: '&lt;span class="avatar"&gt;AL&lt;/span&gt; Ada Lovelace · Engineering'
            }
          ]
        })
      </pre>
    </HighlightStyle>

    <h3>Native options (data-html)</h3>
    <p class="hint">
      Markup lives on the <code>&lt;option&gt;</code> — SlimSelect reads <code>data-html</code> on init. Inner option
      text stays the plain fallback.
    </p>
    <div class="html-demo">
      <label for="html-native">Priority</label>
      <select id="html-native" ref="nativeHtml">
        <option value="low" data-html="<span class='html-demo-status html-demo-status--done'></span> Low">
          Low
        </option>
        <option value="medium" data-html="<span class='html-demo-status html-demo-status--progress'></span> Medium">
          Medium
        </option>
        <option value="high" data-html="<span class='html-demo-status html-demo-status--blocked'></span> High">
          High
        </option>
      </select>
    </div>
    <HighlightStyle language="html">
      <pre>
        &lt;select id="priority"&gt;
          &lt;option
            value="high"
            data-html="&lt;span class='badge high'&gt;&lt;/span&gt; High"
          &gt;
            High
          &lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>
  </div>
</template>
