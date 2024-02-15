
<template>
  <div class="container">
    <div class="primeira bg-light p-4">
      <b-button variant="success" class="mb-2" v-b-modal.modal-adicionar>
        Adicionar Marca
      </b-button>
      <div class="card">
        <h2 class="mb-2">Cadastro de marcas</h2>
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
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Marca" @ok="ExcluirMarca()" @cancelar="fecharModalExcluirMarca()">
      <p class="my-4">Deseja deletar o marca ?</p>
    </b-modal>
    <b-modal id="modal-adicionar" ref="modalAdicionarMarca" title="Adicionar Marca" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarMarca()">
      <div class="mb-3">
        <label for="nome">Nome:</label>
        <input id="nome" type="text" v-model="nomeMarca" class="form-control">
      </div>
    </b-modal>
    <b-modal id="modal-editar" ref="modalEditar" title="Editar Marca" ok-title="Salvar" @ok="editarMarca()" @cancelar="fecharModalEditarMarca()">
      <div class="mb-3">
        <label for="nomeMarcaEdit">Nome:</label>
        <input id="nomeMarcaEdit" type="text" v-model="nomeMarcaEdit" class="form-control">
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
        { key: 'nome', label: 'Nome' },
        { key: 'acao', label: 'Ações' }
      ],
      items: {},
      nomeMarca: '',
      nomeMarcaEdit:'',
      idMarcaEdit: null,
      idMarcaDelete: '',
    }
  },
  mounted() {
    this.carregarMarcas();
  },
  methods: {
    carregarMarcas() {
      axios.get('http://localhost:3000/routes/marcas/listar')
          .then(response => {
            this.items = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar marcas:', error);
          });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/marcas/cadastrar',{
        nome: this.nomeMarca
      })
          .then(response => {
            this.items = response.data.data;
            this.carregarMarcas()
            this.nomeMarca = ''
            this.mostrarFormulario = false;
          })
          .catch(error => {
            console.error('Erro ao carregar marcas:', error);
          });
    },
    ExcluirMarca() {
      axios.delete(`http://localhost:3000/routes/marcas/excluir/${this.idMarcaDelete}`)
          .then(response => {
            this.items = response.data.data;
            this.carregarMarcas()
          })
          .catch(error => {
            console.error('Erro ao carregar marcas:', error);
          });
    },
    editarMarca() {
      axios.put(`http://localhost:3000/routes/marcas/alterar/${this.idMarcaEdit}`,{
        nome: this.nomeMarcaEdit
      })
          .then(() => {
            this.idMarcaEdit ='';
            this.nomeMarcaEdit = '';
            this.mostrarFormularioEditar = false;
            this.carregarMarcas()
          })
          .catch(error => {
            console.error('Erro ao carregar marcas:', error);
          });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idMarcaDelete = item.id
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idMarcaEdit = item.id;
      this.nomeMarcaEdit = item.nome;
    },
    fecharModalEditarMarca() {
      this.$refs.modalEditar.hide()
      this.idMarcaEdit ='';
      this.nomeMarcaEdit = '';
    },
    fecharModalExcluirMarca() {
      this.$refs.modalExcluir.hide()
      this.idMarcaDelete = null
    },
    fecharModalAdicionarMarca() {
      this.$refs.modalExcluir.hide()
      this.nomeMarca = '';
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
