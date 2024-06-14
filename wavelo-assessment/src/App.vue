<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLoremIpsumStore } from './stores/loremIpsum'

// Refs
let items = ref([])
let imageUrl = ref('')
let title = ref('')

// store methods from pinia
const { getLoremIpsumInRange } = useLoremIpsumStore()

// Fetchs data from url given from challenge description, will assign ref values
const getImageAndTitle = async () => {
  try {
    fetch('https://dog.ceo/api/breeds/image/random/12')
      .then((res) => res.json())
      .then((data) => {
        // We want 9 different components rendered
        for (let i = 0; i < 9; i++) {
          // set imageUrl
          imageUrl.value = data.message[i]

          // using 3 and 6 so there are 3 words in the description, could use any numbers really
          let description = getLoremIpsumInRange(i + 3, i + 6)

          // lines 26-33 we are formatting the name of the dog from the imageUrl
          let split = imageUrl.value.split('/')
          let name = split[4].split('-')
          let formatted = []
          for (let word of name) {
            let firstLetter = word[0].toUpperCase()
            let rest = word.slice(1)
            formatted.push(firstLetter + rest)
          }

          // assign title the name of dog after formatting
          title.value = formatted.join(' ')

          // Add a dog object to items to rendered later
          items.value.push({ name: title.value, url: imageUrl.value, description: description })
        }

        console.log(items.value)
      })
  } catch (err) {
    console.log('this is the error for image get: ', err)
  }
}

// Run getData on start of page load
watchEffect(() => getImageAndTitle())
</script>

<template>
  <header class="outterContainer">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mainContainer"
      style="border: 2px solid white"
    >
      <div class="titleSection">{{ item.name }}</div>
      <div class="imageSection">
        <img :src="item.url" alt="A Picture of a Dog" class="image" />
      </div>
      <div class="descriptionSection">{{ item.description }}</div>
      <div class="linkSection">
        <a :href="item.url" target="_blank">Here is the link</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.outterContainer {
  display: flex;
  padding-right: 10vw;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  background-color: rgb(80, 79, 79);
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 80vh;
  margin-right: 2vw;
}

.titleSection {
  display: flex;
}
.imageSection {
  display: flex;
}

.image {
  width: 25vw;
  height: 25vw;
}
.descriptionSection {
  display: flex;
}
.linkSection {
  display: flex;
}
</style>
