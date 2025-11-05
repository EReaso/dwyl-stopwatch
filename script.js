// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

class Stopwatch {
  running = false

  constructor(display, running_time = 0) {
    this.display = display
    this.running_time = running_time
  }

  get time() {
    if (this.running) {
      return this.running_time + (Date.now() - this.start_time)
    } else {
      return this.running_time
    }
  }

  start() {
    if (!this.running) {
      this.running = true
      this.start_time = Date.now()
      this.timer = setInterval(() => this.update(), 10)
    }
  }

  stop() {
    if (this.running) {
      this.running = false
      this.running_time += Date.now() - this.start_time
      clearInterval(this.timer)
    }
  }

  clear() {
    this.running_time = 0
    this.start_time = Date.now()
    this.update()
  }

  update() {
    this.display
    (
      {
      hours: Math.floor(this.time / 3600000),
      minutes: Math.floor((this.time % 3600000) / 60000),
      seconds: Math.floor((this.time % 60000) / 1000),
      centiseconds: Math.floor((this.time % 1000) / 10),
      }
      , this.running
    )
  }
}

function display(time, running) {
  document.getElementById('timer').textContent =
    // Format time as HH:MM:SS:CC
    Object.entries(time)
      .map(([key, value]) => value.toString().padStart(2, '0'))
      .join(':') 

  // Update buttons
  if (running) {
    document.getElementById('start').disabled = true
    document.getElementById('stop').disabled = true
  } else {
    document.getElementById('start').disabled = false
    document.getElementById('stop').disabled = false
  }
}

// create the stopwatch
let stopwatch = new Stopwatch(display, 0)

// add event listensers for buttons

document.getElementById('go').addEventListener("click",() => stopwatch.start())
document.getElementById('stop').addEventListener("click",() => stopwatch.stop())
document.getElementById('clear').addEventListener("click",() => stopwatch.clear())
