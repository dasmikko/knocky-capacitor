<template>
  <div class="bg-neutral-800 mb-4 p-4 rounded">
    <BbcodeRenderer
      :bbcode="post.content"
    />
    
  </div>
</template>

<script>
import BbcodeRenderer from '../../bbcode/bbcodeRenderer.vue';
export default {
    name: "PostListItem",
    props: {
        post: Object,
    },
    components: { BbcodeRenderer }
}

</script>

<style></style>