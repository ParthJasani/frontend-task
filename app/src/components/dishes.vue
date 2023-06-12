<template>
    <v-container fluid>
      <div v-if="isLoading">
        <v-row align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            Loading data
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="primary"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </div>
      <div v-if="!isLoading">
        <div>
          <v-btn color="primary" class="ma-4" @click="createDish">
            <v-icon left>mdi-plus</v-icon>
            Add new
          </v-btn>
        </div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Short Description</th>
              <th class="text-left">Price</th>
              <th class="text-left">Category</th>
              <th class="text-left">Type</th>
              <th class="text-left">Available</th>
              <th class="text-left" width="110px">Best Seller</th>
              <th class="text-left" width="100px">Wait time</th>
              <th class="text-left" width="120px">Action</th>
            </tr>
          </thead>
          <tbody class="text-body-2">
            <tr v-if="!dishes.length">
              <td colspan="10">There are no dishes yet!</td>
            </tr>
  
            <tr v-for="item in dishes" :key="item._id">
              <td>{{ item._id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <v-tooltip activator="parent" location="bottom">{{
                  item.shortDescription
                }}</v-tooltip>
                <p class="ellipsis">{{ item.shortDescription }}</p>
              </td>
              <td>${{ item.price }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.type }}</td>
              <td>
                <v-icon :color="item.available ? 'sucess' : 'error'"
                  >{{ item.available ? "mdi-check" : "mdi-close" }}
                </v-icon>
              </td>
              <td>
                <v-icon :color="item.bestSeller ? 'sucess' : 'error'"
                  >{{ item.bestSeller ? "mdi-check" : "mdi-close" }}
                </v-icon>
              </td>
              <td>{{ item.waitTime }} min</td>
              <td>
                <v-btn
                  class="mr-2"
                  size="x-small"
                  color="warning"
                  icon="mdi-pencil"
                ></v-btn
                ><v-btn size="x-small" color="error" icon="mdi-delete"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted, defineComponent } from "vue";
  import ApiService from "@/services/ApiService";
  
  export default defineComponent({
    name: "dishes",
  
    setup(props) {
      const isLoading = ref(true);
      let dishes = ref([]);
  
      const apiService = new ApiService();
  
      onMounted(async () => {
        try {
          await getDishes();
        } catch (error) {
          console.log("error:", error);
        }
        isLoading.value = false;
      });
  
      /**
       * Get all the dishse
       */
      async function getDishes() {
        isLoading.value = true;
        await apiService.get().then((response) => {
          dishes.value = response.data.data;
        });
        isLoading.value = false;
      }
  
      return {
        dishes,
        isLoading,
      };
    },

  });
  </script>

  