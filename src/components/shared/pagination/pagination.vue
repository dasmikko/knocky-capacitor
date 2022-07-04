<template>
  <div class="pagination" v-show="totalPages > 1">
    <div class="start">
      <div class="page-button" :class="{ disabled: page === 1}" @click="onPageClick(page - 1)">
        <MenuLeftIcon/>
      </div>
    </div>
    <ion-content style="height: 28px" :scrollX="true" :scrollY="false" :force-overscroll="true">
      <div class="pages">
        <div class="page-button"
            v-for="pageNum in totalPages"
            :class="{ 'active': page === pageNum }"
            @click="onPageClick(pageNum)"
        >{{pageNum}}</div>
      </div>
    </ion-content>
    <div class="end">
      <div class="page-button" :class="{ disabled: page === totalPages}" @click="onPageClick(page + 1)">
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
    perPage: {
      type: Number,
      default: 20
    },
    totalCount: Number
  },
  emits: ['update:page'],
  setup(props, {emit}) {
    const totalPages = computed(() => Math.ceil(props.totalCount / props.perPage))

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
    @apply flex px-2;

    .pages {
      @apply flex-1 flex flex-row overflow-auto h-12;

      &::-webkit-scrollbar {
        display: none;
      }

      .page-button {
        @apply mr-2;

        &:last-child {
          @apply mr-0;
        }
      }
    }

    .start {
      @apply mr-2;
    }

    .end {
      @apply ml-2;
    }

    .page-button {
      @apply bg-neutral-700 px-3 h-7 w-7 text-sm flex justify-center items-center rounded;

      &.active {
        @apply bg-neutral-500;
      }

      &.disabled {
        @apply opacity-50 pointer-events-none;
      }
    }
  }
</style>