<template>
  <div id="app" class="container my-3">
    <h3>Vue Axios Call Api by https://jsonplaceholder.typicode.com</h3>

    <div>
      <div>Vue Axios GET</div>
      <div>
        <div>
          <button @click="getAllData">Get All</button>

          <input
            type="text"
            ref="get_id"
            class="form-control ml-2"
            placeholder="Id"
          />
          <div>
            <button @click="getDataById">Get by Id</button>
          </div>

          <!-- <input type="text" ref="get_title" class="form-control ml-2" placeholder="Title" /> -->
          <div>
            <!-- <button class="btn btn-sm btn-primary" @click="getDataByTitle">Find By Title</button> -->
          </div>

          <button @click="clearGetOutput">Clear</button>
        </div>

        <div v-if="getResult" role="alert">
          <pre>{{ getResult }}</pre>
        </div>
      </div>
    </div>

    <div>
      <div>Vue Axios POST</div>
      <div>
        <div>
          <input type="text" ref="post_title" placeholder="Title" />
        </div>
        <div>
          <input type="text" ref="post_body" placeholder="Description" />
        </div>
        <button @click="postData">Post Data</button>
        <button @click="clearPostOutput">Clear</button>

        <div v-if="postResult" role="alert">
          <pre>{{ postResult }}</pre>
        </div>
      </div>
    </div>

    <div>
      <div>Vue Axios PUT</div>
      <div>
        <div>
          <input type="text" ref="put_id" placeholder="Id" />
        </div>
        <div class="form-group">
          <input type="text" ref="put_title" placeholder="Title" />
        </div>
        <div class="form-group">
          <input type="text" ref="put_body" placeholder="Description" />
        </div>
        <div>
          <input type="checkbox" ref="put_published" />
          <label for="put_published">Publish</label>
        </div>
        <button @click="putData">Update Data</button>
        <button @click="clearPutOutput">Clear</button>

        <div v-if="putResult" role="alert">
          <pre>{{ putResult }}</pre>
        </div>
      </div>
    </div>

    <div>
      <div>Vue Axios DELETE</div>
      <div>
        <div>
          <!-- <button class="btn btn-sm btn-danger" @click="deleteAllData">
            Delete All
          </button> -->

          <input type="text" ref="delete_id" placeholder="Id" />
          <div>
            <button @click="deleteDataById">Delete by Id</button>
          </div>

          <button @click="clearDeleteOutput">Clear</button>
        </div>

        <div v-if="deleteResult" role="alert">
          <pre>{{ deleteResult }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "./http-common";

export default {
  name: "App",
  data() {
    return {
      getResult: null,
      postResult: null,
      putResult: null,
      deleteResult: null,
    };
  },
  methods: {
    fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },

    async getAllData() {
      try {
        const res = await http.get("/posts");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.getResult = this.fortmatResponse(result);
      } catch (err) {
        this.getResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async getDataById() {
      const id = this.$refs.get_id.value;

      if (id) {
        try {
          const res = await http.get(`/posts/${id}`);

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          // const result = {
          //   data: res.data,
          //   status: res.status,
          //   statusText: res.statusText,
          //   headers: res.headers,
          //   config: res.config,
          // };

          this.getResult = this.fortmatResponse(result);
        } catch (err) {
          this.getResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async getDataByTitle() {
      const title = this.$refs.get_title.value;

      if (title) {
        try {
          const res = await http.get("/posts", {
            params: {
              title: title,
            },
          });

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.getResult = this.fortmatResponse(result);
        } catch (err) {
          this.getResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async postData() {
      const postData = {
        title: this.$refs.post_title.value,
        body: this.$refs.post_body.value,
      };

      try {
        const res = await http.post("/posts", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.postResult = this.fortmatResponse(result);
      } catch (err) {
        this.postResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async putData() {
      const { put_id, put_title, put_body, put_published } = this.$refs;
      const id = put_id.value;

      if (id) {
        const putData = {
          title: put_title.value,
          description: put_body.value,
          published: put_published.checked,
        };

        try {
          const res = await http.put(`/posts/${id}`, putData, {
            headers: {
              "x-access-token": "token-value",
            },
          });

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.putResult = this.fortmatResponse(result);
        } catch (err) {
          this.putResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    async deleteAllData() {
      try {
        const res = await http.delete("/posts");

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        this.deleteResult = this.fortmatResponse(result);
      } catch (err) {
        this.deleteResult = this.fortmatResponse(err.response?.data) || err;
      }
    },

    async deleteDataById() {
      const id = this.$refs.delete_id.value;

      if (id) {
        try {
          const res = await http.delete(`/posts/${id}`);

          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          this.deleteResult = this.fortmatResponse(result);
        } catch (err) {
          this.deleteResult = this.fortmatResponse(err.response?.data) || err;
        }
      }
    },

    clearGetOutput() {
      this.getResult = null;
    },

    clearPostOutput() {
      this.postResult = null;
    },

    clearPutOutput() {
      this.putResult = null;
    },

    clearDeleteOutput() {
      this.deleteResult = null;
    },
  },
};
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
}
</style>
