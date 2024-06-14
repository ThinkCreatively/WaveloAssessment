import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoremIpsumStore = defineStore('counter', () => {
  const loremIpsum = ref(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa sapien faucibus. Magna fermentum iaculis eu non diam phasellus. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Morbi leo urna molestie at elementum. Vulputate eu scelerisque felis imperdiet. Nunc sed augue lacus viverra vitae congue eu consequat ac. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Tortor posuere ac ut consequat semper viverra nam libero justo. Quam lacus suspendisse faucibus interdum posuere. At elementum eu facilisis sed odio.'
  )

  // a function to get a slice of the lorem ipsum text
  const getLoremIpsumInRange = (start: number, end: number): string => {
    const slice = loremIpsum.value.split(' ').slice(start, end)

    return slice.join(' ')
  }

  return { getLoremIpsumInRange }
})
