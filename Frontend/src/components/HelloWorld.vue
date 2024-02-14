<template>
  <div class="primeira">
    <div class="card bg-light">
      <h2>Cadastro de dependentes </h2>
      <b-table :items="items" :fields="fields">
        <template v-slot:cell(acao)="data">
          <b-button class='bg-primary' @click="handleEdit(data.item)">Editar</b-button>
          <b-button class="bg-danger" @click="handleDelete(data.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>

    <b-card bg-variant="light" class="mt-5 p-2">
      <h3> Adicionar dependente</h3>
      <div>
        <label>
          <span> Nome: </span>
          <input type="email" name="email">
        </label>
      </div>

      <b-button class='bg-success mt-2' @click="handleAdiciona(data.item)">Salvar</b-button>
    </b-card>



  </div>
</template>

<script>

export default {
  name: 'SeuComponente',
  data() {
    return {
      fields: [  { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'acao', label: 'Ações' }],
      items: [
        { id: 1, nome: 'Dickerson' },
        { id: 2, nome: 'Larsen'},
        { id: 3, nome: 'Geneva' }
      ]
    }
  }
}
</script>

<style scoped>

.primeira, .segunda {
  margin-bottom: 20px;
}
</style>
