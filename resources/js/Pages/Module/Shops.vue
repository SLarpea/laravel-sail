<script setup>
import InputError from '@/Components/InputError.vue';
import MainLayout from '@/Layouts/MainLayout.vue';
import SearchLayout from '@/Layouts/SearchLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { inject, ref } from 'vue';

const global = inject('globalVar');

const handleUpdateQueryParams = (val) => {
  router.get(route("shops.index"), val, {
    preserveState: true,
    replace: true,
    onStart: () => (global.isSearchLoading = true),
    onFinish: () => (global.isSearchLoading = false),
  });
};

let initialState = {
  id: null,
  name: "",
  description: "",
  status: 0,
  filename: null
};
const form = useForm({ ...initialState });
const imagePreview = ref('');

const triggerFileInput = () => {
  document.getElementById('getFile').click();
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    form.filename = selectedFile.name;
    if (selectedFile.type == 'image/jpeg') imagePreview.value = URL.createObjectURL(selectedFile); 
  }
};
</script>

<template>
  <MainLayout module="Shops" header-module="Modules" :include-add-btn="true" :include-delete-btn="true">
    <div class="px-6 pt-2 pb-6">
      <div class="page-content">
        <SearchLayout @update-query-params="handleUpdateQueryParams" />
        <div class="table-responsive">
          <table class="table table-sm table-striped table-bordered table-data">
            <colgroup>
              <!-- <col style="width: 1%" /> -->
              <col style="width: 1%" />
              <col style="width: 21%" />
              <col style="width: 66%" />
              <col style="width: 1%" />
              <col style="width: 1%" />
            </colgroup>
            <thead>
              <tr>
                <!-- <th>
                  <input type="checkbox" :indeterminate="checkAllIndeterminate" @click="checkAll = !checkAll"
                    :checked="checkAll" />
                </th> -->
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <!-- <th>
                  <input type="checkbox" :indeterminate="checkAllIndeterminate" @click="checkAll = !checkAll"
                    :checked="checkAll" />
                </th> -->
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th class="text-center">Action</th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td>Arnold</td>
                <td>Core Main</td>
                <td class="text-center">
                  <div class="toggle">
                    <input type="checkbox" id="swicth" />
                    <label for="switch"></label>
                  </div>
                </td>
                <td>
                  <div class="btn-groups">
                    <button type="button" class="btn btn-xs dropdown-toggle rounded-none" data-toggle="dropdown">
                      Select
                    </button>
                    <ul class="text-sm dropdown-menu dropdown-menu-md dropdown-menu-right">
                      <li>
                        <button type="button" class="dropdown-item py-1.5">
                          <i class="bi bi-pencil-square mr-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" class="dropdown-item py-1.5">
                          <i class="bi bi-eye mr-2"></i>View
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <!-- <tr v-for="(item, idx) in shops.data" :key="idx">
                <td>
                  <input v-model="checkAllData" :value="item.id" class="checkbox" :id="'checkbox_' + item.id"
                    type="checkbox" />
                  <label :for="'checkbox_' + item.id" class="checkbox"></label>
                </td>
                <td>{{ idx + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td class="text-center">
                  <div class="toggle">
                    <input type="checkbox" :id="'switch_' + item.id" :checked="shopStatus[item.id] === 1"
                      @click="selectAction('status', item)" v-tippy="(item.status === 1) ? 'Active' : 'Inactive'" />
                    <label :for="'switch_' + item.id"></label>
                  </div>
                </td>
                <td>
                  <div class="btn-groups">
                    <button type="button" class="btn btn-xs dropdown-toggle rounded-none" data-toggle="dropdown">
                      Select
                    </button>
                    <ul class="text-sm dropdown-menu dropdown-menu-md dropdown-menu-right">
                      <li>
                        <button type="button" class="dropdown-item py-1.5" @click.prevent="selectAction('edit', item)">
                          <i class="bi bi-pencil-square mr-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" class="dropdown-item py-1.5" @click.prevent="selectAction('view', item)">
                          <i class="bi bi-eye mr-2"></i>View
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainLayout>
  <form @submit.prevent="submit">
    <transition name="modal-fade">
      <div v-if="global.showAddForm" class="modal custom-modal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="text-capitalize">Add Form</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                @click.prevent="global.showAddForm = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="imagePreview" class="form-group">
                <div class="image-preview">
                  <img :src="imagePreview" alt="Image Preview" />
                </div>
                <span>Image Preview</span>
              </div>
              <div class="form-group">
                <button id="btn-file" class="btn-file-input" @click="triggerFileInput">{{ form.filename ?? 'Choose File' }}</button>
                <input type='file' id="getFile" style="display:none" @change="handleFileChange">
                <span id="btn-file">File</span>
              </div>
              <div class="form-group floating">
                <input v-model="form.name" type="text" class="form-control floating" id="name" placeholder="Name" />
                <label for="name">Name</label>
                <InputError :message="form.errors.name" />
              </div>
            </div>
            <div class="modal-footer">
              <span>Footer</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </form>
</template>
