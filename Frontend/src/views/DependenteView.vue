
<template>
  <div class="container">
    <div class="primeira bg-light p-4">
      <b-button variant="success" class="mb-2" @click="mostrarFormulario = !mostrarFormulario">
        Adicionar Dependente
      </b-button>
      <div class="card">
        <h2 class="mb-2">Cadastro de dependentes</h2>
        <b-table striped hover :items="items" :fields="fields" class="mb-3 table table-bordered">
          <template v-slot:cell(acao)="data">
            <div class="d-flex justify-content-center">
              <b-button variant="primary" @click="editar(data.item)" >
                <b-icon icon="pencil-fill"></b-icon>
              </b-button>
              <b-button variant="danger" @click="confirmDelete(data.item)">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </div>
          </template>
        </b-table>
        <b-card v-if="mostrarFormulario">
          <h3 class="mb-3">Adicionar Dependente</h3>
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
          <div class="d-flex justify-content-end">
            <b-button variant="danger" size="sm" class="mr-2" @click="cancelarAdicao">Cancelar</b-button>
            <b-button class="bg-success" size="sm" @click="handleAdiciona">Salvar</b-button>
          </div>
        </b-card>
        <b-card v-if="mostrarFormularioEditar">
          <h3 class="mb-3">Editar Dependente</h3>
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
          <div class="d-flex justify-content-end">
            <b-button variant="danger" size="sm" class="mr-2" @click="cancelarEdicao">Cancelar</b-button>
            <b-button class="bg-success" size="sm" @click="editarDependente">Salvar</b-button>
          </div>
        </b-card>
      </div>
    </div>
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Dependente" @ok="ExcluirDependente()" @cancelar="fecharModalExcluirDependente()">
      <p class="my-4">Deseja deletar o dependente ?</p>
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
      mostrarFormulario: false,
      mostrarFormularioEditar: false,
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
            console.log('RESPONSE',response)
            this.items = response.data.data;
            this.carregarDependentes()
            this.nomeDependente = ''
            this.mostrarFormulario = false;
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
            console.log('RESPONSE',response)
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
          .then(response => {
            console.log('RESPONSE',response)
            this.idDependenteEdit ='';
            this.nomeDependenteEdit = '';
            this.mostrarFormularioEditar = false;
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
    cancelarAdicao() {
      this.nomeDependente = '';
      this.idFuncionario = '';
      this.mostrarFormulario = false;
    },
    cancelarEdicao() {
      this.idDependenteEdit ='';
      this.nomeDependenteEdit = '';
      this.idFuncionarioEdit = '';
      this.mostrarFormularioEditar = false;
    },
    editar(item) {
      console.log(item)
      this.idDependenteEdit = item.id;
      this.nomeDependenteEdit = item.Dependente;
      this.idFuncionarioEdit = item.idFuncionario;
      this.mostrarFormularioEditar = true;
    }
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
