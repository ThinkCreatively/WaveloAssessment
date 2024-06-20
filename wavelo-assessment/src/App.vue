<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useLoremIpsumStore } from './stores/loremIpsum'

// Refs
let items: Ref<{ name: string; url: string; description: string }[]> = ref([])
let imageUrl = ref('')
let title = ref('')
let amountSelected = ref(0)
let questionAmount = ref(0)

// store methods from pinia
const { getLoremIpsumInRange } = useLoremIpsumStore()

// Fetchs data from url given from challenge description, will assign ref values
const getImageAndTitle = async () => {
  try {
    // ask for amount of dogs based on amountSelected
    fetch(`https://dog.ceo/api/breeds/image/random/${amountSelected.value}`)
      .then((res) => res.json())
      .then((data) => {
        // We want 9 different components rendered
        for (let i = 0; i < amountSelected.value; i++) {
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
      })
  } catch (err) {
    console.log('this is the error for image get: ', err)
  }
}
</script>

<template>
  <header class="outterContainer">
    <div v-if="amountSelected > 0" class="holdingContainer">
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
    </div>
    <div class="qusetionDiv" v-else>
      <div>
        <h1>How many dogs would you like to see?</h1>
        <div>
          Amount (1-24):
          <input v-model="questionAmount" />
          <div
            class="confirmButton"
            @click="
              (e) => {
                e.preventDefault()
                amountSelected = questionAmount
                getImageAndTitle()
              }
            "
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.outterContainer {
  display: flex;
  padding-right: 10vw;
}

.qusetionDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.confirmButton {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: gray;
  border-radius: 10px;
  width: 5vw;
}

.holdingContainer {
  display: flex;
  justify-content: center;
  align-items: center;
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
