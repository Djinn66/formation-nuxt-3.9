<script setup lang="ts">
  /** CONFIG **/

  /**  PROPS  **/

  /**  EMITS  **/

  /**  REFS  **/

  const startHour = ref(0)
  const endHour = ref(23)
  const zoomLevel = ref(1)
  const minutes = ref([0, 15, 30, 45])

  /**  COMPUTED   **/

  const visibleHours = computed(() => {
    const visibleHours = []
    for (let i = startHour.value; i <= endHour.value; i++) {
      visibleHours.push(i)
    }
    return visibleHours
  })
  const quarters = computed(() => {
    return minutes.value
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/
  function handleWheel(event: WheelEvent) {
    event.preventDefault()
    const deltaY = event.deltaY
    if (deltaY > 0) {
      // Zoom out
      zoomOut()
    } else {
      // Zoom in
      zoomIn()
    }
  }

  function zoomIn() {
    if (zoomLevel.value < 4) {
      zoomLevel.value++
      updateHours()
    }
  }

  function zoomOut() {
    if (zoomLevel.value > 1) {
      zoomLevel.value--
      updateHours()
    }
  }

  function updateHours() {
    const totalHours = 24
    const visibleHours = totalHours / zoomLevel.value
    const middleHour = Math.floor(visibleHours / 2)
    startHour.value = Math.max(0, middleHour - Math.floor(visibleHours / 2))
    endHour.value = Math.min(23, startHour.value + visibleHours - 1)
  }

  function formatHour(hour: number) {
    if (hour === 0) {
      return '12 AM'
    } else if (hour < 12) {
      return hour + ' AM'
    } else if (hour === 12) {
      return '12 PM'
    } else {
      return hour - 12 + ' PM'
    }
  }
</script>

<template>
  <div class="day-calendar">
    <div class="header">
      <div
        class="hour-column"
        v-for="hour in visibleHours"
        :key="hour"
      >
        {{ formatHour(hour) }}
      </div>
    </div>
    <div
      class="body"
      ref="body"
      @wheel="handleWheel"
    >
      <div
        class="hour-column"
        v-for="hour in visibleHours"
        :key="hour"
      >
        <div
          class="hour-cell"
          v-for="quarter in quarters"
          :key="hour + '-' + quarter"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .day-calendar {
    display: flex;
    flex-direction: column;
    height: 50%;
  }
  .header {
    display: flex;
    flex: 0 0 auto;
    border-bottom: 2px solid #000;
    background-color: #0f2c69;
    text-align: center;
    padding: 10px;
  }
  .body {
    flex: 1 1 auto;
    display: flex;
    overflow-x: auto;
    border-bottom: 2px solid #000;
  }
  .hour-column {
    flex: 0 0 100px; /* Width of each hour column */
    border-right: 1px solid #000;
    display: flex;
    flex-direction: column;
  }
  .hour-cell {
    flex: 1 1 auto;
    border-bottom: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
