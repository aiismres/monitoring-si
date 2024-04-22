

async function readmetrology() { 
  let responseOt = await fetch('/api/readot');
console.log('responseOt', responseOt)
	if (responseOt.ok) { // если HTTP-статус в диапазоне 200-299
	// получаем тело ответа (см. про этот метод ниже)
	ot = await responseOt.json();
	console.log('ot', ot)
	} else {
	alert("Ошибка HTTP: " + responseOt.status);
	}
};



const app = Vue.createApp({
  data() {
      return {count: 4}
  },
  methods: {
    increment() {
        this.count++;
        console.log(this.count)
    }
  }          
})
const vm = app.mount('#app')

Vue.createApp({
  data() {
    return {
      ot: [],
    }
  },
  computed: {
    classObject() {
      console.log('this.ot.rabZaplan', this.ot.rabZaplan);
      return {
        textRed: this.ot.rabZaplan == "нет"
      }
    }
  },
  methods: {
    fetchActiveTimers() {
      fetch("/api/readot").
      then(function (ot) {
        return ot.json();
      }).
      then((ot) => {
        console.log('activeTimers', ot);
        this.ot = ot;
      })
    },
    sortSdSop() {
      this.ot.sort(function(a, b) {
		  	return (Date.parse(a.sdSop) || 1) - (Date.parse(b.sdSop) || 1)
        
		  });
    },
    sortNaimAiis1() {
      this.ot.sort(function(a, b) {
        return ('' + a.naimAiis1).localeCompare(b.naimAiis1)
        // return a.naimAiis1 - b.naimAiis1
		  });
      console.log('sortNaimAiis1', ot);
    }
  }, 
  created() {
    this.fetchActiveTimers();
  },
}).mount('#array-rendering');

readmetrology();

/*ot = [
  {gr: "70838-18", sdSop: "2222"}, 
  {gr: "81291-21", sdSop: "3333"}
];*/
/*
let vm2 = new Vue({
    el: "#app2",
    data: {
      desc: "",
      activeTimers: [],
      oldTimers: [],
    },
    methods: {
      fetchActiveTimers() {
        fetch("/api/readot").then((activeTimers) => {
          this.activeTimers = activeTimers;
        });
      }
    }, 
    created() {
      this.fetchActiveTimers();
      console.log('this.activeTimers', this.activeTimers);
    },
});*/