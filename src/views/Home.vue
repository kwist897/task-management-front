<template>
<v-container fluid>
  <v-row>
    <v-col>

    </v-col>
  </v-row>
 <v-row>
   <v-col cols="6">
     <div class="d-flex flex-column">
       <h4>Projects: </h4>
       <v-list nav dense class="ma-8">
         <v-list-item-group v-model="selectedItem" color="primary">
           <v-list-item v-for="(item, i) in items" :key="i">
             <v-list-item-icon>
               <v-icon v-text="item.icon"></v-icon>
             </v-list-item-icon>

             <v-list-item-content>
               <v-list-item-title v-text="item.text" @click="$router.push(`${item.route}`)"></v-list-item-title>
             </v-list-item-content>
           </v-list-item>
         </v-list-item-group>
       </v-list>
     </div>
   </v-col>
 </v-row>
  <v-row>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>