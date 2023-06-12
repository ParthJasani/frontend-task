<template>
    <v-container fluid>
      <div class="notification">
      <v-snackbar
        v-model="successNotification"
        :timeout="timeout"
        color="green"
        right
        top
      >
        <v-icon> mdi-checkbox-marked-circle-outline </v-icon>
        {{ successNotificationText }}

        <template v-slot:actions>
          <v-btn text @click="successNotification = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="errorNotification"
        :timeout="timeout"
        color="red"
        top
        right
      >
        <v-icon> mdi-close-circle </v-icon>
        {{ errorNotificationText }}

        <template v-slot:actions>
          <v-btn text @click="errorNotification = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
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
                  @click="updateDish(item._id)"
                ></v-btn
                ><v-btn size="x-small" color="error" icon="mdi-delete"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-container>
    <v-dialog v-model="dialog" persistent width="1024">
      <dish-update
      :id="dish_update_id"
      :isEdit="isEdit"
      @close="close"
      @save="dishSaved"
      ></dish-update>
    </v-dialog>
    
  </template>
  
  <script>
  import { ref, onMounted, defineComponent } from "vue";
  import ApiService from "@/services/ApiService";
  import dishUpdate from "./dishesUpdate.vue";
  
  export default defineComponent({
    name: "dishes",
  
    setup(props) {
      const isLoading = ref(true);
      let dishes = ref([]);
      const dialog = ref(false);
      const dish_update_id = ref(null);
      const isEdit = ref(false);

      const successNotification = ref(false);
      const errorNotification = ref(false);
      const successNotificationText = ref("");
      const errorNotificationText = ref("");
      const timeout = ref(2000);

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

       /**
     * Open create dish Dialog
     */
    async function createDish(){
      isEdit.value = false;
      dish_update_id.value = null;
      dialog.value = true;
    }

    /**
     * Open edit dish dialog
     */
    async function updateDish(id) {
      isEdit.value = true;
      dish_update_id.value = id ? id : null;
      dialog.value = true;
    }

    /**
     * Close Edit dish dialog
     */
    async function close() {
      dialog.value = false;
    }

    /**
     * Execure when dish created/updated
     */
    async function dishSaved(response) {
      dialog.value = false;
      if (response.status === 201 || response.status === 200) {
        successNotification.value = true;
        successNotificationText.value = `Item ${isEdit ? 'updated' : 'created'} successfully!`;
      } else {
        errorNotification.value = true;
        errorNotificationText.value = response.data.message;
      }
      //Get all the dishes once dish created/updated
      await getDishes();
    }
  
      return {
        dishes,
        isLoading,
        dialog,
        dish_update_id,
        isEdit,
        createDish,
        updateDish,
        close,
        dishSaved,
        successNotification,
        errorNotification,
        successNotificationText,
        errorNotificationText,
        timeout
      };
    },
    components: {
      dishUpdate,
    },
  });
  </script>

  