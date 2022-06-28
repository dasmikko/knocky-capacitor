<template>
  <div class="pagination">
    <div class="start">
      <div class="page-button">
        <MenuLeftIcon/>
      </div>
    </div>
    <div class="pages">

      <div class="page-button"
           v-for="pageNum in totalPages"
           :class="{ 'active': page === pageNum }"
           @click="onPageClick(pageNum)"
      >{{pageNum}}</div>
    </div>
    <div class="end">
      <div class="page-button">
        <MenuRightIcon/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLeftIcon from 'vue-material-design-icons/MenuLeft.vue'
import MenuRightIcon from 'vue-material-design-icons/MenuRight.vue'
import {computed} from 'vue'

export default {
  name: 'pagination',
  components: {
    MenuLeftIcon,
    MenuRightIcon
  },
  props: {
    page: Number,
    postCount: Number
  },
  emits: ['update:page'],
  setup(props, {emit}) {
    const pageSize = 12
    const totalPages = computed(() => Math.ceil(props.postCount / pageSize))

    const onPageClick = (page) => {
      emit('update:page', page)
    }

    return {
      totalPages,
      onPageClick
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    @apply flex p-2;

    .pages {
      @apply flex-1 flex overflow-auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .page-button {
        @apply mr-2;
      }
    }

    .start {
      @apply mr-2;
    }

    .end {
      @apply ml-2;
    }

    .page-button {
      @apply bg-neutral-700 px-2 h-7 w-7 text-sm flex justify-center items-center;

      &.active {
        @apply bg-neutral-500;
      }
    }
  }
</style>