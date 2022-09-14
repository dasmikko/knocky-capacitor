<template>
  <q-pagination
    :max="totalPages"
    v-model="currentPage"/>
  <!--<div v-if="false" class="pagination" v-show="totalPages > 1">
    <div class="start">
      <div class="page-button" :class="{ disabled: page === 1}" @click="onPageClick(page - 1)">
        <MenuLeftIcon/>
      </div>
    </div>
    <div class="pages" ref="paginationContent">
      <div class="page-button" :id="'page-'+pageNum"
          v-for="pageNum in totalPages"
          :key="pageNum"
          :class="{ 'active': page === pageNum }"
          @click="onPageClick(pageNum)"
      >{{pageNum}}</div>
    </div>
    <div class="end">
      <div class="page-button" :class="{ disabled: page === totalPages}" @click="onPageClick(page + 1)">
        <MenuRightIcon/>
      </div>
    </div>
  </div>-->
</template>

<script>
import MenuLeftIcon from 'vue-material-design-icons/MenuLeft.vue'
import MenuRightIcon from 'vue-material-design-icons/MenuRight.vue'
import {computed, nextTick, onMounted, watch, ref} from 'vue'

export default {
  name: 'PaginationComponent',
  components: {
    //MenuLeftIcon,
    //MenuRightIcon
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
    const paginationContent = ref(null)

    const currentPage = computed({
      get() {
        return props.page
      },
      set(page) {
        emit('update:page', page)
      }
    })

    const getContent = () => {
      //return document.querySelector('#pagination-content')
    }

    const totalPages = computed(() => Math.ceil(props.totalCount / props.perPage))

    const onPageClick = (page) => {
      emit('update:page', page)
    }

    onMounted(() => {
      nextTick(() => {
        return
        const pageButton = paginationContent.value.querySelector('#page-'+props.page)
        paginationContent.value.scroll(pageButton.offsetLeft - (paginationContent.value.clientWidth / 2) - 28, 0)
      })
    })

    watch(
      () => props.page,
      (page) => {
        return
        const pageButton = paginationContent.value.querySelector('#page-'+page)
        paginationContent.value.scroll(pageButton.offsetLeft - (paginationContent.value.clientWidth / 2) - 28, 0)
      }
    );

    return {
      totalPages,
      onPageClick,
      paginationContent,
      currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    @apply tw-flex tw-px-2;

    .pages {
      @apply tw-flex-1 tw-flex tw-flex-row tw-overflow-auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .page-button {
        @apply tw-mr-2;

        &:last-child {
          @apply tw-mr-0;
        }
      }
    }

    .start {
      @apply tw-mr-2;
    }

    .end {
      @apply tw-ml-2;
    }

    .page-button {
      @apply tw-bg-neutral-700 tw-px-3 tw-h-7 tw-w-7 tw-text-sm tw-flex tw-justify-center tw-items-center tw-rounded;

      &.active {
        @apply tw-bg-neutral-500;
      }

      &.disabled {
        @apply tw-opacity-50 tw-pointer-events-none;
      }
    }
  }
</style>
