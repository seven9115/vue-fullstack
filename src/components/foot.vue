<template>
    <div class="foot">
        <ul>
            <li class="bottom-index" v-bind:class="{ 'bottom-cur': curNav=='index' }">
                <router-link :to="{ path: '/'}"></router-link>
            </li>
            <li class="bottom-course " v-bind:class="{ 'bottom-cur': curNav=='course' }">
                <router-link :to="{ path: '/courseList'}"></router-link>
            </li>
            <li class="bottom-my" v-bind:class="{ 'bottom-cur': curNav=='mine' }">
                <router-link :to="{ path: '/memberOnline'}"></router-link>
            </li>
            <li class="bottom-msg" v-bind:class="{ 'bottom-cur': curNav=='msg' }">
                <router-link :to="{ path: '/memberBenefit'}"></router-link>
            </li>
            <li class="bottom-community" v-bind:class="{ 'bottom-cur': curNav=='community' }">
                <router-link :to="{ path: '/memberBenefit'}"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'foot',
  props: ['curNav'],
  created(){

  }
}
</script>
