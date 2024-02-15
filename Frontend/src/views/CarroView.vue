
<template>
  <div class="container">
    <div class="primeira bg-light p-4">
      <b-button variant="success" class="mb-2" v-b-modal.modal-adicionar-carro>
        Adicionar Carro
      </b-button>
      <div class="card">
        <h2 class="mb-2">Cadastro de carros</h2>
        <b-table striped hover :items="items" :fields="fields" class="mb-3 table table-bordered">
          <template v-slot:cell(acao)="data">
            <div class="d-flex justify-content-center">
              <b-button variant="primary" @click="abrirModalEdicao(data.item)" >
                <b-icon icon="pencil-fill"></b-icon>
              </b-button>
              <b-button variant="danger" @click="confirmDelete(data.item)">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Carro" @ok="ExcluirCarro()" @cancelar="fecharModalExcluirCarro()">
      <p class="my-4">Deseja deletar o carro ?</p>
    </b-modal>
    <b-modal id="modal-adicionar-carro" ref="modalAdicionarCarro" title="Adicionar Carro" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarCarro()">
      <div class="mb-3">
        <label for="idMarca">Id Marca:</label>
        <select v-model="idMarca" class="form-control">
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="nomeCarro">Nome:</label>
        <input id="nomeCarro" type="text" v-model="nomeCarro" class="form-control">
      </div>
    </b-modal>
    <b-modal id="modal-editar-carro" ref="modalEditar" title="Editar Carro" ok-title="Salvar" @ok="editarCarro()" @cancelar="fecharModalEditarCarro()">
      <div class="mb-3">
        <label for="nomeCarroEdit">Nome:</label>
        <input id="nomeCarroEdit" type="text" v-model="nomeCarroEdit" class="form-control">
      </div>
      <div class="mb-3">
        <label for="idMarcaEdit">Id Marca:</label>
        <select v-model="idMarcaEdit" class="form-control">
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
        </select>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SeuComponente',
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'Carro', label: 'Carro' },
        { key: 'NomeMarca', label: 'Marca' },
        { key: 'acao', label: 'Ações' }
      ],
      items: [],
      marcas:[],
      nomeCarro: '',
      idCarro: '',
      idMarca: '',
      idCarroDelete: null,
      nomeCarroEdit:'',
      idMarcaEdit: null,
    }
  },
  mounted() {
    this.carregarCarros();
  },
  methods: {
    carregarCarros() {
      axios.get('http://localhost:3000/routes/carros/listar')
          .then(response => {
            this.items = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar Carro:', error);
          });
      axios.get('http://localhost:3000/routes/marcas/listar')
          .then(response => {
            this.marcas = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar marcas:', error);
          });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/carros/cadastrar',{
        nome: this.nomeCarro,
        id_marca: this.idMarca,
      })
          .then(response => {
            this.items = response.data.data;
            this.carregarCarros()
            this.nomeCarro = ''
          })
          .catch(error => {
            console.error('Erro ao carregar carros:', error);
          });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idCarroDelete = item.id
    },
    fecharModalExcluirMarca() {
      this.$refs.modalExcluir.hide()
      this.idCarroDelete = null
    },
    ExcluirCarro() {
      axios.delete(`http://localhost:3000/routes/carros/excluir/${this.idCarroDelete}`)
          .then(response => {
            this.items = response.data.data;
            this.carregarCarros()
          })
          .catch(error => {
            console.error('Erro ao carregar carros:', error);
          });
    },
    editarCarro() {
      axios.put(`http://localhost:3000/routes/carros/alterar/${this.idCarroEdit}`,{
        nome: this.nomeCarroEdit,
        id_marca: this.idMarcaEdit,
      })
          .then(() => {
            this.idCarroEdit ='';
            this.nomeCarroEdit = '';
            this.carregarCarros()
          })
          .catch(error => {
            console.error('Erro ao carregar carros:', error);
          });
    },
    fecharModalExcluirCarro() {
      this.$refs.modalExcluir.hide()
      this.idCarroDelete = null
    },
    fecharModalAdicionarCarro() {
      this.$refs.modalExcluir.hide()
      this.nomeCarro = '';
      this.idMarca = '';
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idCarroEdit = item.id;
      this.nomeCarroEdit = item.Carro;
      this.idMarcaEdit = item.idMarca;
    },
    fecharModalEditarCarro() {
      this.$refs.modalEditar.hide()
      this.idCarroEdit ='';
      this.nomeCarroEdit = '';
      this.idMarcaEdit = '';
    },
  }
}
</script>

<style scoped>
.primeira {
  margin-bottom: 20px;
  padding: 20px;
}
.card {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
