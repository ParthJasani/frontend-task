<template>
  <v-card width="700px" class="ma-auto pa-4">
    <v-card-title>
      <span class="text-h5">{{isEdit ? "Dish create" : "Dish Edit"}}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
        label="Dish Name*"
        required
        v-model="name"
        ></v-text-field>
        <v-text-field label="Short Description*" v-model="shortDescription" required></v-text-field>
        <v-text-field label="Price*" prefix="$" v-model="price" type="number" required></v-text-field>
        <v-select
          :items="categories"
          label="Category*"
          v-model="category"
          required
        ></v-select>
        <v-select
          :items="types"
          v-model="type"
          label="Available on*"
          required
        ></v-select>
        <div>
          <v-switch label="In stock?" v-model="available"></v-switch>
        </div>
        <div>
          <v-switch label="Is Best seller?" v-model="bestSeller"></v-switch>
        </div>
        <v-text-field label="Waitting time*" v-model="waitTime" hint="how long the guest approximately has to wait for the dish after they order" persistent-hint required></v-text-field>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="elevated" @click="close">
        Close
      </v-btn>
      <v-btn color="blue-darken-1" variant="elevated" @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, reactive, onMounted, defineComponent, toRefs } from "vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "dishesUpdate",
  props: {
    id: {
      type: String,
      required: true,
    },
    isEdit:{
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dish = reactive({
      _id: props.id,
      name: null,
      shortDescription: null,
      price: null,
      category: null,
      type: null,
      available: null,
      bestSeller: null,
      waitTime: null,
    });

    const initialDish = reactive({
      _id: 0,
      name: null,
      shortDescription: null,
      price: null,
      category: null,
      type: null,
      available: null,
      bestSeller: null,
      waitTime: null,
    });
    const categories = ref(["Beverage", "Starter", "Main Course", "Dessert"]);
    const types = ref(["Weekdays", "Weekends", "All Days"]);
    const isLoading = ref(true);

    const apiService = new ApiService();

    onMounted(async () => {
      if(props.isEdit){
      try {
          await apiService.get(props.id).then((response) => {
            dish._id = response.data.data._id;
            dish.name = response.data.data.name;
            dish.shortDescription = response.data.data.shortDescription;
            dish.price = response.data.data.price;
            dish.category = response.data.data.category;
            dish.type = response.data.data.type;
            dish.available = response.data.data.available;
            dish.bestSeller = response.data.data.bestSeller;
            dish.waitTime = response.data.data.waitTime;
          });
        } catch (error) {
          console.log("error:", error);
        }
      }
      isLoading.value = false;
    });

    function close(){
      Object.assign(dish, initialDish);
      emit("close");
    }
    
    async function save(){
      try {
        await apiService.update(dish).then((response) => {
          emit("save",response);
        });
      } catch (error) {
        console.log("error:", error);
      }
    }

    return {
      ...toRefs(dish),
      categories,
      types,
      close,
      save
    };
  },
});
</script>