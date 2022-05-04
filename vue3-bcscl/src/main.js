/*const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')*/




/*Vue*/
const ACCESS_TOKEN = import.meta.env.VITE_CLIENT_SECRET
console.log(import.meta.env.VITE_CLIENT_SECRET)
const URL = "https://startup.bolsadesantiago.com/api/consulta/ClienteMD/";


window.addEventListener('load', ()=>{

  const app =Vue.createApp({
      data() {
        return {
          users: [],
          indexes:{},
          message: 'Hello Vue!',
          selectedNemo: "All",
          el: "#lista",
          indexesGraph: [],
        }
      },
      created(){
        if (localStorage.getItem('vue.indexes')!== null) {
          console.log("localStorage not null");
          this.indexes = JSON.parse(localStorage.getItem('vue.indexes'));
          console.log(this.indexes);


        }else{
          console.log("localStorage null");
          this.listIndexes();
        }
               
        
      },
      mounted(){
        this.updateGraphData();
        this.graficar();
      },
      computed: {
        filteredList: function() {
          var vm = this;
          var selectedNemo = vm.selectedNemo;
          
          if(selectedNemo === "All") {
            return vm.indexes;
          } else {
            return vm.indexes.filter(function(indice) {
              return indice.nemo === selectedNemo;
            });
          }
        }
      },
      methods:{
        listUsers: async function(){



          console.log("listUsers");
          const res = await fetch(URL);
          console.log(res);
          const data = await res.json();
          console.log(data);
          this.users = data.slice(0,5);
          this.updateLocalStorage();
        },

        listIndexes: async function() {


          var options = {
              method: 'POST',  
          };



          var object = { access_token: ACCESS_TOKEN };
          var response = await fetch( URL + 'getIndicesRV?access_token=' + ACCESS_TOKEN , options);
          console.log("response:"); // logs 'OK'

          console.log(response.url); // logs 'OK'

          var objectResponse = await response.json().then(function(json) {
            return json;
            
                       
          });
          this.indexes = await objectResponse.listaResult;
          this.updateGraphData();
          this.graficar();
          localStorage.setItem('vue.indexes', JSON.stringify(this.indexes));


          
          console.log("RESPONSE BOLSA"); // logs 'OK'
          console.log(this.indexes); // logs 'OK'

          
        },


        updateLocalStorage: function(){
          localStorage.setItem('vue.indexes', JSON.stringify(this.indexes));
        },
        updateGraphData : function(){
        	console.log("updateGraphData 1");
         this.indexesGraph = [];
          for (var j = 0 ; j < this.indexes.length ; j++) {
          	console.log("j: " + j);
              var indice = this.indexes[j];
              console.log("updateGraphData");
              

              if (indice.nemo == "SPCLXIGPA") {

              	console.log( indice);
                this.indexesGraph.push(indice);
              }
              if (indice.nemo == "SP IPSA") {
              	console.log( indice);
                this.indexesGraph.push(indice);
              }
              if (indice.nemo == "SPMILA") {
              	console.log( indice);
                this.indexesGraph.push(indice);
              }
          }
          console.log("///////");

          console.log("RESPONSE indexesGraph"); // logs 'OK
          console.log(this.indexesGraph); // logs 'OK' 
        },



        graficar: function(){
          feather.replace({ 'aria-hidden': 'true' })

          // Graphs
          const ctx = document.getElementById('myChart')
          // eslint-disable-next-line no-unused-vars

  
          var labels_aux = [];
          var data_aux = [];
          console.log("**GRaficas");
          console.log(this.indexesGraph);
          for (var i = 0 ; i < this.indexesGraph.length ; i++) {
            var indice = this.indexesGraph[i];

            labels_aux.push(indice.indice);
            data_aux.push(indice.price);
            console.log (indice.indice);
            console.log (indice.price);


          }
          console.log (labels_aux)
          console.log (data_aux)
          const myChart = new Chart(ctx, {
            type: 'bar',
            data:{
			  labels: labels_aux,
			  datasets: [{
			    label: "Variación principales indices",
			    data: data_aux,
			    backgroundColor: [
			      'rgba(255, 99, 132, 0.2)',
			      'rgba(255, 159, 64, 0.2)',
			      'rgba(255, 205, 86, 0.2)',
			      'rgba(75, 192, 192, 0.2)',
			      'rgba(54, 162, 235, 0.2)',
			      'rgba(153, 102, 255, 0.2)',
			      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
},
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          });
        },
      },
    });
  app.mount('#app')

});

