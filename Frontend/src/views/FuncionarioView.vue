
<template>
  <div class="container">
    <div class="primeira bg-light p-4">
      <b-button variant="success" class="mb-2" v-b-modal.modal-adicionar>
        Adicionar Funcionário
      </b-button>
      <div class="card">
        <h2 class="mb-2">Cadastro de funcionários</h2>
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
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Funcionario" @ok="ExcluirFuncionario()" @cancelar="fecharModalExcluirFuncionario()">
      <p class="my-4">Deseja deletar o funcionario ?</p>
    </b-modal>
    <b-modal id="modal-adicionar" ref="modalAdicionarFuncionario" title="Adicionar Funcionario" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarFuncionario()">
      <div class="mb-3">
        <label for="nome">Nome:</label>
        <input id="nome" type="text" v-model="nomeFuncionario" class="form-control">
      </div>
    </b-modal>
    <b-modal id="modal-editar" ref="modalEditar" title="Editar Funcionario" ok-title="Salvar" @ok="editarFuncionario()" @cancelar="fecharModalEditarFuncionario()">
      <div class="mb-3">
        <label for="nomeFuncionarioEdit">Nome:</label>
        <input id="nomeFuncionarioEdit" type="text" v-model="nomeFuncionarioEdit" class="form-control">
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
      nomeFuncionario: '',
      nomeFuncionarioEdit:'',
      idFuncionarioEdit: null,
      idFuncionarioDelete: '',
    }
  },
  mounted() {
    this.carregarFuncionarios();
  },
  methods: {
    carregarFuncionarios() {
      axios.get('http://localhost:3000/routes/funcionarios/listar')
          .then(response => {
            this.items = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar funcionários:', error);
          });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/funcionarios/cadastrar',{
        nome: this.nomeFuncionario
      })
          .then(response => {
            console.log('RESPONSE',response)
            this.items = response.data.data;
            this.carregarFuncionarios()
            this.nomeFuncionario = ''
            this.mostrarFormulario = false;
          })
          .catch(error => {
            console.error('Erro ao carregar funcionários:', error);
          });
    },
    ExcluirFuncionario() {
      axios.delete(`http://localhost:3000/routes/funcionarios/excluir/${this.idFuncionarioDelete}`)
          .then(response => {
            console.log('RESPONSE',response)
            this.items = response.data.data;
            this.carregarFuncionarios()
          })
          .catch(error => {
            console.error('Erro ao carregar funcionários:', error);
          });
    },
    editarFuncionario() {
      axios.put(`http://localhost:3000/routes/funcionarios/alterar/${this.idFuncionarioEdit}`,{
        nome: this.nomeFuncionarioEdit
      })
          .then(response => {
            console.log('RESPONSE',response)
            this.idFuncionarioEdit ='';
            this.nomeFuncionarioEdit = '';
            this.mostrarFormularioEditar = false;
            this.carregarFuncionarios()
          })
          .catch(error => {
            console.error('Erro ao carregar funcionários:', error);
          });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idFuncionarioDelete = item.id
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idFuncionarioEdit = item.id;
      this.nomeFuncionarioEdit = item.nome;
    },
    fecharModalEditarFuncionario() {
      this.$refs.modalEditar.hide()
      this.idFuncionarioEdit ='';
      this.nomeFuncionarioEdit = '';
    },
    fecharModalExcluirFuncionario() {
      this.$refs.modalExcluir.hide()
      this.idFuncionarioDelete = null
    },
    fecharModalAdicionarFuncionario() {
      this.$refs.modalExcluir.hide()
      this.nomeFuncionario = '';
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
