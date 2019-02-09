<template>
  <div>   
    <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Upload Images</h6>
          </v-card-title>

          <v-card-text>
            <!-- <form action="/api/items/image" enctype="multipart/form-data" method="post">a -->
            <!-- <div>
              <input 
                type="file" 
                multiple 
                name="image" 
                accept="image/*"                 
                @change="fileChange">
              <v-btn
                color="success"                
                type="submit">
                Upload
              </v-btn> 
              </div> -->
            <!-- </form>  -->
            
            <form 
              enctype="multipart/form-data" 
              novalidate 
              v-if="isInitial || isSaving">              
              <div class="dropbox">
                <input 
                  type="file" 
                  multiple 
                  name="image" 
                  :disabled="isSaving" 
                  @change="fileChange"
                  accept="image/*" 
                  class="input-file">
                  <p v-if="isInitial">
                    Drag your file(s) here to begin<br> or click to browse
                  </p>
                  <p v-if="isSaving">
                    Uploading {{ this.fileCount }} files...
                  </p>
              </div>
            </form>
            
          </v-card-text>
        </v-card>
  </div>
</template>

<!-- SASS styling -->
<style lang="scss">
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
<script>
  // import { upload } from '../services/pictureUpload.service';

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'app',
    data() {
      return {
        currentFile: '',
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'image',
        fileCount: 0
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      // save(formData) {
      //   console.log('FROM save(formData)')
      //   console.log(formData)
      //   // upload data to the server
      //   this.currentStatus = STATUS_SAVING;

      //   // upload(formData)
      //   //   .then(x => {
      //   //     this.uploadedFiles = [].concat(x);
      //   //     this.currentStatus = STATUS_SUCCESS;
      //   //   })
      //   //   .catch(err => {
      //   //     this.uploadError = err.response;
      //   //     this.currentStatus = STATUS_FAILED;
      //   //   });

      //   this.loading = true
        
      //   this.$store.dispatch('items/postImage', formData)
      //   .then((resp)=>{          
      //     console.log(resp)
      //     this.currentStatus = STATUS_SUCCESS;          
      //   }).catch((err)=>{     
      //     console.log(err)
      //     this.currentStatus = STATUS_FAILED;
      //   })
      // },
      fileChange(e){
        const file = e.target.files[0]
        console.log(file)
        this.$store.dispatch('items/postImage', file)
        .then((resp)=>{          
          console.log(resp)  
          this.currentStatus = STATUS_SUCCESS;        
        }).catch((err)=>{     
          console.log(err)
          this.currentStatus = STATUS_FAILED;
        })       
      },
      // filesChange(fieldName, fileList) {
      //   console.log('FROM filesChange()')
      //   console.log(fieldName)
      //   // handle file changes
      //   const formData = new FormData();

      //   if (!fileList.length) return;

      //   // append the files to FormData
      //   Array
      //     .from(Array(fileList.length).keys())
      //     .map(x => {
      //       formData.append(fieldName, fileList[x], fileList[x].name);
      //     });

      //   // save it
      //   console.log(formData);
      //   this.save(formData);
      // }
    },
    mounted() {
      this.reset();
    },
  }

</script>