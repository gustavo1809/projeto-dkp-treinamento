
<template>
  <div class="container">
    <div class="primeira bg-light p-4">
      <b-button variant="success" class="mb-2" v-b-modal.modal-adicionar-dependente>
        Adicionar Dependente
      </b-button>
      <div class="card">
        <h2 class="mb-2">Cadastro de dependentes</h2>
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
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Dependente" @ok="ExcluirDependente()" @cancelar="fecharModalExcluirDependente()">
      <p class="my-4">Deseja deletar o dependente ?</p>
    </b-modal>
    <b-modal id="modal-adicionar-dependente" ref="modalAdicionarDependente" title="Adicionar Dependente" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarDependente()">
      <div class="mb-3">
        <label for="idFuncionario">Id Funcionario:</label>
        <select v-model="idFuncionario" class="form-control">
          <option v-for="funcionario in funcionarios" :key="funcionario.id" :value="funcionario.id">{{ funcionario.nome }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="nomeDependente">Nome:</label>
        <input id="nomeDependente" type="text" v-model="nomeDependente" class="form-control">
      </div>
    </b-modal>
    <b-modal id="modal-editar-dependente" ref="modalEditar" title="Editar Dependente" ok-title="Salvar" @ok="editarDependente()" @cancelar="fecharModalEditarDependente()">
      <div class="mb-3">
        <label for="nomeDependenteEdit">Nome:</label>
        <input id="nomeDependenteEdit" type="text" v-model="nomeDependenteEdit" class="form-control">
      </div>
      <div class="mb-3">
        <label for="idFuncionarioEdit">Id Funcionario:</label>
        <select v-model="idFuncionarioEdit" class="form-control">
          <option v-for="funcionario in funcionarios" :key="funcionario.id" :value="funcionario.id">{{ funcionario.nome }}</option>
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
        { key: 'Dependente', label: 'Dependente' },
        { key: 'Funcionário', label: 'Funcionário' },
        { key: 'acao', label: 'Ações' }
      ],
      items: [],
      funcionarios:[],
      nomeDependente: '',
      idDependente: '',
      idFuncionario: '',
      idDependenteDelete: null,
      nomeDependenteEdit:'',
      idFuncionarioEdit: null,
    }
  },
  mounted() {
    this.carregarDependentes();
  },
  methods: {
    carregarDependentes() {
      axios.get('http://localhost:3000/routes/dependentes/listar')
          .then(response => {
            console.log('RESPONSE', response)
            this.items = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar Dependente:', error);
          });
      axios.get('http://localhost:3000/routes/funcionarios/listar')
          .then(response => {
            this.funcionarios = response.data.data;
          })
          .catch(error => {
            console.error('Erro ao carregar funcionários:', error);
          });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/dependentes/cadastrar',{
        nome: this.nomeDependente,
        id_funcionario: this.idFuncionario,
      })
          .then(response => {
            this.items = response.data.data;
            this.carregarDependentes()
            this.nomeDependente = ''
          })
          .catch(error => {
            console.error('Erro ao carregar dependentes:', error);
          });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idDependenteDelete = item.id
    },
    fecharModalExcluirFuncionario() {
      this.$refs.modalExcluir.hide()
      this.idDependenteDelete = null
    },
    ExcluirDependente() {
      axios.delete(`http://localhost:3000/routes/dependentes/excluir/${this.idDependenteDelete}`)
          .then(response => {
            this.items = response.data.data;
            this.carregarDependentes()
          })
          .catch(error => {
            console.error('Erro ao carregar dependentes:', error);
          });
    },
    editarDependente() {
      axios.put(`http://localhost:3000/routes/dependentes/alterar/${this.idDependenteEdit}`,{
        nome: this.nomeDependenteEdit,
        id_funcionario: this.idFuncionarioEdit,
      })
          .then(() => {
            this.idDependenteEdit ='';
            this.nomeDependenteEdit = '';
            this.carregarDependentes()
          })
          .catch(error => {
            console.error('Erro ao carregar dependentes:', error);
          });
    },
    fecharModalExcluirDependente() {
      this.$refs.modalExcluir.hide()
      this.idDependenteDelete = null
    },
    fecharModalAdicionarDependente() {
      this.$refs.modalExcluir.hide()
      this.nomeDependente = '';
      this.idFuncionario = '';
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idDependenteEdit = item.id;
      this.nomeDependenteEdit = item.Dependente;
      this.idFuncionarioEdit = item.idFuncionario;
    },
    fecharModalEditarDependente() {
      this.$refs.modalEditar.hide()
      this.idDependenteEdit ='';
      this.nomeDependenteEdit = '';
      this.idFuncionarioEdit = '';
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
