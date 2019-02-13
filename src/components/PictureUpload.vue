<template>
  <div>   
    <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Upload Images</h6>
          </v-card-title>

          <v-card-text>
            
            <form 
              enctype="multipart/form-data" 
              novalidate >              
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
      fileChange(e){
        const file = e.target.files[0]
        this.currentStatus = STATUS_SAVING
        this.Loading(true)
        this.$store.dispatch('items/postImage', file)
        .then((resp)=>{          
          this.Loading(false)
          this.currentStatus = STATUS_INITIAL; 
          this.Message('The image was successfully uploaded.')          
          this.$emit('pictureUploaded')
        }).catch((err)=>{     
          this.Loading(false)
          this.currentStatus = STATUS_FAILED;
          this.Error('The image failed to upload.')
        })       
      }
    },
    mounted() {
      this.reset();
    },
  }

</script>