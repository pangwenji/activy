<template>
    <div class="carousel-container">
      <div class="carousel">
        <div v-for="(item, index) in items" :key="index" :class="{ 'active': index === currentIndex }">
          <!-- Your carousel item content goes here -->
          {{ item }}
        </div>
      </div>
  
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        currentIndex: 0,
        progressBarWidth: '0%',
        items: ['Slide 1', 'Slide 2', 'Slide 3'], // Add more slides as needed
      };
    },
    mounted() {
      this.updateProgressBar();
      setInterval(this.nextSlide, 3000); // Auto-advance every 3 seconds (adjust as needed)
    },
    methods: {
      updateProgressBar() {
        const percent = (this.currentIndex / (this.items.length - 1)) * 100;
        this.progressBarWidth = percent + '%';
      },
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
      },
    },
  };
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
  }
  
  .carousel {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel div {
    width: 100%;
  }
  
  .progress-bar-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: #ddd;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s ease;
  }
  </style>
  